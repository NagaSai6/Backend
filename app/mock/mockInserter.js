// // //*************************************** ************************************************
// // ************************* This file is soley for generation of mockdata*******************
// // *************  mockData has been extracted from  siksha top 100 indian colleges - 2020****

import mockData from "./mockData.js";
import College from "../models/college.js";
import Student from "../models/student.js";
import faker from "faker";
faker.locale = "en_IND";

// following function i.e mockInsertions have methods , those methods are called in
// sequential manner  to geneate data in college and students collections

const mockInsertions = () => {
  return {
    // this method inserts data into college collection with no data regarding coursesoffered
    insertData() {
      try {
        College.insertMany(mockData);
      } catch (error) {
        console.log(error);
      }
    },
    // this method inserts data of courses offered my colleges with rank above 60 and below 90
    async sixityToNinety() {
      await College.updateMany(
        { rank: { $gt: 60, $lte: 90 } },
        {
          $set: {
            coursesOffered: ["Computer Science", "Electronics", "Mechanical","Civil"],
          },
        }
      );
    },
    async ninetyToEnd() {
      await College.updateMany(
        { rank: { $gt: 90 } },
        { $set: { coursesOffered: ["Bio Tech", "AI", "Aerospace","Civil"] } }
      );
    },
    // this method inserts data of courses offered my colleges with rank less than or equal to 30
    async top30() {
      await College.updateMany(
        { rank: { $lte: 30 } },
        {
          $set: {
            coursesOffered: [
              "Computer Science",
              "Electronics",
              "Chemical",
              "Data Science",
            ],
          },
        }
      );
    },
    // this method inserts data of courses offered my colleges with rank greater than 30 and
    // less than equal  to 60
    async thirtyToSixty() {
      await College.updateMany(
        { rank: { $gt: 30, $lte: 60 } },
        {
          $set: {
            coursesOffered: ["Computer Science", "Electronics", "IT", "Civil"],
          },
        }
      );
    },
    // this method inserts data of 100 students belongs to each college in  college collection
    // faker node module has been used to generate localized indian names
    async insertStudents() {
      let colleges = await College.find({});
      // colleges is an array so we can iterate, for every iteration we have to insert 100 students
      for (let i = 0; i < colleges.length; i++) {
        let students = [];
        for (let j = 0; j < 100; j++) {
          let studentData = {
            collegeId: colleges[i]._id,
            name: faker.name.findName(),
          };
          students.push(studentData);
        }
        try {
          Student.insertMany(students);
        } catch (error) {
          console.log(error);
        }
      }
    },
  };
};


export default mockInsertions;