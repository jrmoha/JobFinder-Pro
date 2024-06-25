import { async_ } from "../../middleware/async.handler.js";
import { APIError } from "../../utils/APIError.js";
import StatusCodes from "http-status-codes";
import fs from "fs";
import Job from "../../../database/models/job.model.js";
import applicationModel from "../../../database/models/application.model.js";
import companyModel from "../../../database/models/company.model.js";
import jobModel from "../../../database/models/job.model.js";
import cloudinary_ from "../../utils/cloudinary.js";

class JobController {
  /**
   * @description add new job
   */
  add = async_(async (req, res, next) => {
    const {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      techinicalSkills,
      softSkills,
    } = req.body;

    const userId = req.user.id;

    const job = await Job.create({
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      techinicalSkills,
      softSkills,
      addedBy: userId,
    });

    return job
      ? res.status(StatusCodes.CREATED).json({ success: true, job })
      : next(new APIError("Job not created", StatusCodes.BAD_REQUEST));
  });
  /**
   * @description update job
   */
  update = async_(async (req, res, next) => {
    const {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      techinicalSkills,
      softSkills,
    } = req.body;
    const userId = req.user.id;
    const jobId = req.params.id;

    const job = await Job.findOne({ _id: jobId, addedBy: userId });

    if (!job) {
      return next(new APIError("Job not found", StatusCodes.NOT_FOUND));
    }

    jobTitle && (job.jobTitle = jobTitle);
    jobLocation && (job.jobLocation = jobLocation);
    workingTime && (job.workingTime = workingTime);
    seniorityLevel && (job.seniorityLevel = seniorityLevel);
    jobDescription && (job.jobDescription = jobDescription);
    techinicalSkills?.length && (job.techinicalSkills = techinicalSkills);
    softSkills?.length && (job.softSkills = softSkills);

    const updatedJob = await job.save();

    return res.status(StatusCodes.OK).json({ success: true, job: updatedJob });
  });
  /**
   * @description delete job
   */
  delete = async_(async (req, res, next) => {
    const userId = req.user.id;
    const jobId = req.params.id;

    const job = await Job.findOneAndDelete({
      _id: jobId,
      addedBy: userId,
    });

    return job
      ? res.status(StatusCodes.OK).json({ success: true })
      : next(new APIError("Job not found", StatusCodes.NOT_FOUND));
  });
  /**
   * @description return all jobs
   */
  all = async_(async (req, res, next) => {
    const jobs = [];
    const cursor = Job.find().select("-__v").cursor();
    for await (const job of cursor) {
      const company = await companyModel
        .findOne({ companyHR: job.addedBy })
        .select("-__v -updatedAt");

      const job_ = job.toObject();
      job_.company = company;
      jobs.push(job_);
    }
    return res.status(StatusCodes.OK).json({ success: true, jobs });
  });
  /**
   * @description return jobs added by a specific company
   */
  search = async_(async (req, res, next) => {
    const { name } = req.query;
    const company = await companyModel.findOne({ companyName: name });

    if (!company)
      throw new APIError("Company Doesn't Exist", StatusCodes.NOT_FOUND);

    const jobs = await jobModel
      .find({ addedBy: company.companyHR })
      .select("-__v -addedBy");

    return res.status(StatusCodes.OK).json({ success: true, jobs });
  });
  /**
   * @description return jobs based on the filters
   */

  filter = async_(async (req, res, next) => {
    const {
      workingTime,
      jobLocation,
      seniorityLevel,
      jobTitle,
      techinicalSkills,
    } = req.body;

    const query = {};
    workingTime && (query.workingTime = workingTime);
    jobLocation && (query.jobLocation = jobLocation);
    seniorityLevel && (query.seniorityLevel = seniorityLevel);
    jobTitle && (query.jobTitle = jobTitle);

    const jobs = await jobModel
      .find({
        $and: [
          query,
          techinicalSkills?.length
            ? { techinicalSkills: { $in: techinicalSkills } }
            : {},
        ],
      })
      .select("-__v -addedBy");

    return jobs.length
      ? res.status(StatusCodes.OK).json({ success: true, jobs })
      : next(new APIError("Jobs not found", StatusCodes.NOT_FOUND));
  });
  /**
   * @description apply for a role in a company
   */
  apply = async_(async (req, res, next) => {
    const { userTechSkills, userSoftSkills } = req.body;
    const userId = req.user.id;
    const jobId = req.params.id;
    const resume = req.file;

    const job = await Job.findById(jobId);
    if (!job) {
      return next(new APIError("Job not found", StatusCodes.NOT_FOUND));
    }

    const { public_id, url, secure_url } = await cloudinary_.uploader.upload(
      resume.path,
      {
        resource_type: "raw",
        folder: process.env.CLOUDINARY_FOLDER,
      }
    );

    fs.unlinkSync(resume.path);

    const application = await applicationModel.create({
      jobId,
      userId,
      userTechSkills,
      userSoftSkills,
      userResume: { public_id, url, secure_url },
    });

    return application
      ? res.status(StatusCodes.CREATED).json({ success: true, application })
      : next(new APIError("Application not created", StatusCodes.BAD_REQUEST));
  });
}

export default new JobController();
