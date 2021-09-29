import express from "express";
import query from "../controllers/queryController.js";
const router = express.Router();

router.get("/", query().getAllColleges);
router.get("/getCollegesByStates", query().getDataForCharts);
router.get("/filter-college-by-state/:query", query().filterCollegeByState);
router.get("/get-courses-by-colleges", query().getCourseDataForCharts);
router.get("/find-similar-colleges/:query", query().getSimilarColleges);
router.get("/fetch-students-data/:query",query().fetchStudents)

export default router;
