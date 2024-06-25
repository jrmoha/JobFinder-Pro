import applicationModel from "../../../database/models/application.model.js";
import companyModel from "../../../database/models/company.model.js";
import jobModel from "../../../database/models/job.model.js";
import { async_ } from "../../middleware/async.handler.js";
import { APIError } from "../../utils/APIError.js";
import StatusCodes from "http-status-codes";
import exceljs from "exceljs";
import fs from "fs";
import path from "path";

class CompanyController {
  /**
   * @description Add a new company
   */
  add = async_(async (req, res, next) => {
    const {
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
    } = req.body;
    const companyHR = req.user.id;

    const company_exists = await companyModel.findOne({
      $or: [{ companyName }, { companyEmail }],
    });

    if (company_exists) {
      let message = "Error creating company";

      if (company_exists.companyName === companyName)
        message = "Company name already exists";

      if (company_exists.companyEmail === companyEmail)
        message = "Company email already exists";

      throw new APIError(message, StatusCodes.CONFLICT);
    }
    const company = await companyModel.create({
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
      companyHR,
    });

    return company
      ? res.status(StatusCodes.CREATED).json({
          success: true,
          data: company,
        })
      : next(
          new APIError("Company not created", StatusCodes.INTERNAL_SERVER_ERROR)
        );
  });

  /**
   * @description Update a company
   */

  update = async_(async (req, res, next) => {
    const { id } = req.params;
    const {
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
    } = req.body;

    const companyHR = req.user.id;

    const company = await companyModel.findOne({ _id: id, companyHR });

    if (!company)
      throw new APIError("Company not found", StatusCodes.NOT_FOUND);

    if (companyName) {
      const name_exists = await companyModel.findOne({ companyName });
      if (name_exists)
        throw new APIError("Company name already exists", StatusCodes.CONFLICT);

      company.companyName = companyName;
    }

    if (companyEmail) {
      const email_exists = await companyModel.findOne({ companyEmail });
      if (email_exists)
        throw new APIError(
          "Company email already exists",
          StatusCodes.CONFLICT
        );

      company.companyEmail = companyEmail;
    }

    description && (company.description = description);
    industry && (company.industry = industry);
    address && (company.address = address);
    numberOfEmployees && (company.numberOfEmployees = numberOfEmployees);

    await company.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      data: company,
    });
  });

  /**
   * @description Delete a company
   */
  delete = async_(async (req, res, next) => {
    const { id } = req.params;
    const companyHR = req.user.id;

    const company = await companyModel.findOneAndDelete({
      _id: id,
      companyHR,
    });

    return company
      ? res.status(StatusCodes.OK).json({
          success: true,
        })
      : next(new APIError("Company not found", StatusCodes.NOT_FOUND));
  });
  /**
   * @description Get a company data by id
   */
  get = async_(async (req, res, next) => {
    const { id } = req.params;
    const companyHR = req.user.id;

    const company = await companyModel.findOne({ _id: id, companyHR });

    if (!company)
      throw new APIError("Company not found", StatusCodes.NOT_FOUND);

    const jobs = await jobModel.find({ addedBy: companyHR });

    const company_ = company.toObject();
    company_.jobs = jobs;

    return company
      ? res.status(StatusCodes.OK).json({
          success: true,
          company: company_,
        })
      : next(new APIError("Company not found", StatusCodes.NOT_FOUND));
  });

  /**
   * @description Get all companies using search query
   */
  search = async_(async (req, res, next) => {
    const { q } = req.query;

    const companies = await companyModel.find({
      companyName: { $regex: q, $options: "i" },
    });

    return companies.length
      ? res.status(StatusCodes.OK).json({
          success: true,
          companies,
        })
      : next(new APIError("Company not found", StatusCodes.NOT_FOUND));
  });
  /**
   * @description Get all applications for a company
   */
  applications_ = async_(async (req, res, next) => {
    const HR = req.user.id;

    const jobs = await jobModel.find({ addedBy: HR });

    const jobIds = jobs.map((job) => job._id);

    const applications = await applicationModel
      .find({
        jobId: { $in: jobIds },
      })
      .select("-__v -_id")
      .populate("jobId", "-_id -__v -addedBy")
      .populate(
        "userId",
        "-_id -__v -password -otp -recoveryEmail -updatedAt -role"
      )
      .sort({ createdAt: -1 });

    return applications.length
      ? res.status(StatusCodes.OK).json({
          success: true,
          applications,
        })
      : next(new APIError("No Applications", StatusCodes.NOT_FOUND));
  });
  /**
   * @description Get all applications for a company today in excel file
   */
  todays_applications = async_(async (req, res, next) => {
    const hr = req.user.id;
    const jobs = await jobModel.find({ addedBy: hr });

    const jobIds = jobs.map((job) => job._id);
    const applications = await applicationModel
      .find({
        jobId: { $in: jobIds },
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
      })
      .populate({
        path: "jobId",
        select:
          "jobTitle jobLocation workingTime seniorityLevel jobDescription techinicalSkills softSkills",
        populate: { path: "addedBy", select: "companyName" },
      })
      .populate({
        path: "userId",
        select: "username email mobileNumber",
      })
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Applications");

    const final_path = path.resolve(`media/applications`);

    if (!fs.existsSync(final_path))
      fs.mkdirSync(final_path, { recursive: false });

    worksheet.columns = [
      { header: "No.", key: "app_no", width: 10 },
      { header: "Job Title", key: "jobTitle", width: 30 },
      { header: "Job Location", key: "jobLocation", width: 30 },
      { header: "Working Time", key: "workingTime", width: 30 },
      { header: "Seniority Level", key: "seniorityLevel", width: 30 },
      { header: "Job Description", key: "jobDescription", width: 30 },
      { header: "Technical Skills", key: "techinicalSkills", width: 30 },
      { header: "Soft Skills", key: "softSkills", width: 30 },
      { header: "User Name", key: "username", width: 30 },
      { header: "User Email", key: "email", width: 30 },
      { header: "User Mobile Number", key: "mobileNumber", width: 30 },
      { header: "User Technical Skills", key: "userTechSkills", width: 30 },
      { header: "User Soft Skills", key: "userSoftSkills", width: 30 },
    ];

    for (let i = 0; i < applications.length; i++) {
      const app_ = {
        ...applications[i].toObject(),
        ...applications[i].jobId.toObject(),
        ...applications[i].userId.toObject(),
      };

      delete app_.jobId;
      delete app_.userId;

      app_.app_no = i + 1;
      worksheet.addRow(app_);
    }
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
    const file_name = new Date().toDateString();
    const file_path = `${final_path}/${file_name}.xlsx`;

    const _ = await workbook.xlsx.writeFile(file_path);

    return res.status(StatusCodes.CREATED).sendFile(file_path);
  });
}

export default new CompanyController();
