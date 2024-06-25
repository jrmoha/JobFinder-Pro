import userModel from "../../../database/models/user.model.js";
import { APIError } from "../../utils/APIError.js";
import StatusCodes from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { async_ } from "../../middleware/async.handler.js";
import applicationModel from "../../../database/models/application.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { customAlphabet } from "nanoid";

class UserController {
  /**
   * @description Register a new user
   */
  register = async_(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password,
      DOB,
      mobileNumber,
      recoveryEmail,
    } = req.body;

    if (email === recoveryEmail) {
      throw new APIError(
        "Recovery email cannot be same as email",
        StatusCodes.CONFLICT
      );
    }
    const user_exists = await userModel.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (user_exists) {
      let message = "Email, mobile number already exists";

      if (user_exists.email === email) message = "Email already exists";

      if (user_exists.mobileNumber === mobileNumber)
        message = "Mobile number already exists";

      throw new APIError(message, StatusCodes.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );

    const user_ = await userModel.create({
      firstName,
      lastName,
      username: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      DOB: new Date(DOB),
      mobileNumber,
      recoveryEmail,
    });

    const token = jwt.sign(
      {
        id: user_._id,
        email: user_.email,
        username: user_.username,
        role: user_.role,
      },
      process.env.JWT_SIGNATURE,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return user_
      ? res.status(StatusCodes.CREATED).json({
          success: true,
          token,
        })
      : next(new APIError("User not created", StatusCodes.BAD_REQUEST));
  });
  /**
   * @description Login a user
   */
  login = async_(async (req, res, next) => {
    // const { email, mobileNumber, recoveryEmail, password } = req.body;

    // let query = {};

    // if (email) {
    //   query.email = email;
    // } else if (mobileNumber) {
    //   query.mobileNumber = mobileNumber;
    // } else if (recoveryEmail) {
    //   query.recoveryEmail = recoveryEmail;
    // }

    // //to be removed with joi validation
    // Object.keys(query).length === 0 &&
    //   next(
    //     new APIError(
    //       "Please provide either email, mobile number or recovery email",
    //       StatusCodes.BAD_REQUEST
    //     )
    //   );

    // const user = await userModel.findOne(query);

    const { query, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ email: query }, { mobileNumber: query }],
    });

    if (!user) {
      throw new APIError("User doesn't exist", StatusCodes.NOT_FOUND);
    }

    const password_correct = await bcrypt.compare(password, user.password);

    if (!password_correct) {
      throw new APIError("Incorrect password", StatusCodes.UNAUTHORIZED);
    }

    user.status = "online";
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SIGNATURE,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      token,
    });
  });
  /**
   * @description Update a user
   */
  update = async_(async (req, res, next) => {
    const { email, mobileNumber, recoveryEmail, DOB, firstName, lastName } =
      req.body;

    const id = req.user.id;

    const user = await userModel.findById(id);

    if (email === recoveryEmail) {
      throw new APIError(
        "Recovery email cannot be same as email",
        StatusCodes.CONFLICT
      );
    }

    if (email) {
      const email_exists = await userModel
        .findOne({
          email,
        })
        .select("_id");

      if (email_exists && email_exists._id.toString() !== id.toString())
        throw new APIError("Email already exists", StatusCodes.CONFLICT);

      user.email = email;
    }

    if (mobileNumber) {
      const mobile_exists = await userModel
        .findOne({ mobileNumber })
        .select("_id");

      if (mobile_exists && mobile_exists._id.toString() !== id.toString())
        throw new APIError(
          "Mobile number already exists",
          StatusCodes.CONFLICT
        );

      user.mobileNumber = mobileNumber;
    }

    if (recoveryEmail) {
      // const recoveryEmail_exists = await userModel.findOne({
      //   $or: [{ email: recoveryEmail }, { recoveryEmail }],
      // });
      // if (
      //   recoveryEmail_exists &&
      //   recoveryEmail_exists._id.toString() !== id.toString()
      // ) {
      //   throw new APIError(
      //     "Recovery email already exists",
      //     StatusCodes.CONFLICT
      //   );
      // }

      // if (user.email === recoveryEmail) {
      //   throw new APIError(
      //     "Recovery email cannot be same as email",
      //     StatusCodes.CONFLICT
      //   );
      // }

      user.recoveryEmail = recoveryEmail;
    }

    if (DOB) {
      user.DOB = new Date(DOB);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = `${user.firstName} ${user.lastName}`;

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SIGNATURE,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      token,
    });
  });
  /**
   * @description Delete a user
   */
  deleteAccount = async_(async (req, res, next) => {
    const id = req.user.id;
    const user = await userModel.findByIdAndDelete(id, { new: false });

    const applications = await applicationModel.find({ userId: id });

    const public_ids = applications.map(
      (application) => application.userResume.public_id
    );

    public_ids.length
      ? await cloudinary.api.delete_resources(public_ids)
      : null;

    await applicationModel.deleteMany({ userId: id });

    return user
      ? res.status(StatusCodes.ACCEPTED).json({ success: true })
      : next(new APIError("Couldn't delete user"), StatusCodes.NOT_FOUND);
  });
  /**
   * @description Get owner's data
   */
  get = async_(async (req, res, next) => {
    const id = req.user.id;
    const user = await userModel
      .findById(id)
      .select("-password -updatedAt -__v");

    return user
      ? res.status(StatusCodes.ACCEPTED).json({ success: true, user })
      : next(new APIError("Couldn't get user"), StatusCodes.NOT_FOUND);
  });
  /**
   * @description Get user profile
   */
  profile = async_(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel
      .findById(id)
      .select("-password -updatedAt -__v");

    return user
      ? res.status(StatusCodes.ACCEPTED).json({ success: true, user })
      : next(new APIError("Couldn't get user"), StatusCodes.NOT_FOUND);
  });
  /**
   * @description Change password
   */
  change_password = async_(async (req, res, next) => {
    const { old_password, password } = req.body;
    const id = req.user.id;

    const user = await userModel.findById(id).select("password");
    const password_correct = await bcrypt.compare(old_password, user.password);

    console.log(password_correct);
    if (!password_correct)
      throw new APIError("Incorrect old password", StatusCodes.UNAUTHORIZED);

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );

    user.password = hashedPassword;
    await user.save();

    return res.status(StatusCodes.OK).json({ success: true });
  });
  /**
   * @description Change password after requesting OTP
   */
  forgot_password = async_(async (req, res, next) => {
    const { email, otp, password } = req.body;

    const user = await userModel.findOne({ email }).select("OTP");

    if (!user) throw new APIError("User not found", StatusCodes.NOT_FOUND);

    if (user.OTP != otp)
      throw new APIError("Incorrect OTP", StatusCodes.UNAUTHORIZED);

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );

    user.password = hashedPassword;
    user.OTP = null;
    await user.save();

    return res.status(StatusCodes.OK).json({ success: true });
  });
  /**
   * @description Get all users associated with a recovery email
   */
  get_associated_recovery_email = async_(async (req, res, next) => {
    const { recoveryEmail } = req.query;

    const users = await userModel
      .find({ recoveryEmail })
      .select("-password -updatedAt -__v");

    return users.length
      ? res.status(StatusCodes.OK).json({ success: true, users })
      : next(new APIError("No users found", StatusCodes.NOT_FOUND));
  });
  /**
   * @description Request password reset
   */
  request_password_reset = async_(async (req, res, next) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email }).select("-password");
    if (!user) throw new APIError("User not found", StatusCodes.NOT_FOUND);

    const otp = customAlphabet("0123456789", 6)();
    user.OTP = otp;
    await user.save();

    return res.status(StatusCodes.OK).json({ success: true, otp }); //assume that otp is sent to email or mobile number
  });
}

export default new UserController();
