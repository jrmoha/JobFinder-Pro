import { Router } from "express";
import { authenticate } from "../../middleware/authentication.middleware.js";
import JC from "./job.controller.js";
import multer from "../../utils/multer.global.js";
import { validate } from "../../middleware/validation.middleware.js";
import * as JV from "./job.validate.js";

const router = Router();

router.post(
  "/add",
  authenticate(["Company_HR"]),
  validate(JV.addJobSchema),
  JC.add
);
router.patch(
  "/update/:id",
  authenticate(["Company_HR"]),
  validate(JV.updateJobSchema),
  JC.update
);
router.delete(
  "/delete/:id",
  authenticate(["Company_HR"]),
  validate(JV.deleteJobSchema),
  JC.delete
);
router.get("/all", authenticate(["User", "Company_HR"]), JC.all);
router.get(
  "/search",
  authenticate(["User", "Company_HR"]),
  validate(JV.searchJobSchema),
  JC.search
);
router.get(
  "/search/filter",
  authenticate(["User", "Company_HR"]),
  validate(JV.searchFilterJobSchema),
  JC.filter
);
router.post(
  "/apply/:id",
  authenticate(["User"]),
  multer("resume", "document").single("resume"),
  validate(JV.applySchema),
  JC.apply
);

export default router;
