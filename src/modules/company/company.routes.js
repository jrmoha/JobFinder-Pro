import { Router } from "express";
import { authenticate } from "../../middleware/authentication.middleware.js";
import CC from "./company.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import {
  createCompanySchema,
  deleteCompanySchema,
  getCompanySchema,
  searchCompanySchema,
  updateCompanySchema,
} from "./company.validate.js";

const router = Router();

router.post(
  "/add",
  authenticate(["Company_HR"]),
  validate(createCompanySchema),
  CC.add
);
router.patch(
  "/update/:id",
  authenticate(["Company_HR"]),
  validate(updateCompanySchema),
  CC.update
);
router.delete(
  "/delete/:id",
  authenticate(["Company_HR"]),
  validate(deleteCompanySchema),
  CC.delete
);

router.get(
  "/search",
  authenticate(["Company_HR", "User"]),
  validate(searchCompanySchema),
  CC.search
);

router.get("/applications", authenticate(["Company_HR"]), CC.applications_);
router.get(
  "/:id",
  authenticate(["Company_HR"]),
  validate(getCompanySchema),
  CC.get
);
router.get(
  "/applications/today",
  authenticate(["Company_HR"]),
  CC.todays_applications
);

export default router;
