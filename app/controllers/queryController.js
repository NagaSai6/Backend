import College from "../models/college.js";
import Student from "../models/student.js";

const queryController = () => {
  return {
    async getAllColleges(req, res) {
      let collegesData = await College.find({}).sort({ rank: 1 });
      res.status(200).json(collegesData);
    },
    async getDataForCharts(req, res) {
      let distinctStates = await College.distinct("state");
      let colleges = await College.find({});
      let totalColleges = colleges.length;
      let reqData = [];
      for (let i = 0; i < distinctStates.length; i++) {
        let stateData = {};
        let state = await College.find({ state: distinctStates[i] });
        let noOfCollegesInState = state.length;
        stateData.type = distinctStates[i];
        let percent = (noOfCollegesInState / totalColleges) * 100;
        stateData.value = parseInt(percent.toFixed());
        reqData.push(stateData);
      }

      res.status(200).json(reqData);
    },
    async getCourseDataForCharts(req, res) {
      let coursesOffered = await College.distinct("coursesOffered");
      let reqData = [];

      for (let i = 0; i < coursesOffered.length; i++) {
        let temp = {};
        temp.course = coursesOffered[i] + "(%)";
        let courseData = await College.find({
          coursesOffered: coursesOffered[i],
        });
        temp.count = courseData.length;

        reqData.push(temp);
      }
      res.status(200).json(reqData);
    },
    async getSimilarColleges(req, res) {
      let id = req.params.query;
      let college = await College.find({ _id: id });
      let coursesArray = college[0].coursesOffered;
      let similar = await College.find({
        coursesOffered: { $in: coursesArray },
        state: college[0].state,
        _id: { $ne: id },
      });
      if (similar.length > 0) {
        return res.status(200).json(similar);
      } else {
        return res.status(200).json({ similar }); // empty array
      }
    },
    async fetchStudents(req, res) {
      let students = await Student.find({ collegeId: req.params.query });
      return res.status(200).json(students);
    },
    async filterCollegeByState(req, res) {
      let query = req.params.query;
      let collegesInQueryState = await College.find({ state: query });
      res.status(200).json(collegesInQueryState);
    },
    async filterCollegeByCourse(req, res) {
      let query = req.params.query;
      let collegesInQueryCourse = await College.find({ coursesOffered: query }).sort({rank:1})
      res.status(200).json(collegesInQueryCourse);
    },
  };
};

export default queryController;
