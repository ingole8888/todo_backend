const mongoose = require("mongoose");
const fs = require("fs");
const NodeGeocoder = require("node-geocoder");
const xlsx = require("xlsx");

require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://sunil:sunil@cluster0.g6orjd8.mongodb.net/blog?retryWrites=true&w=majority&appName=SUG-Staging-Database`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const fields = [
  "clubsandSocieties",
  "sports",
  "examBoards",
  "examDate",
  "openDaysforYear7",
  "examSubjects",
];
const addfields = ["fees"];

// Call required function
// staticSchools()
// dynamicSchools();

function dynamicSchools() {
  console.log("Dynamic schools function called");
  //Dynamic Schools Excel file

  const schoolWorkbook = xlsx.readFile("dynamic-schools-v3.xlsx");
  const schoolWorksheet = schoolWorkbook.Sheets[schoolWorkbook.SheetNames[0]];
  const schoolData = xlsx.utils.sheet_to_json(schoolWorksheet);

  console.log(schoolData);
 // return;

  schoolData.map((data, key) => {
    Object.keys(data).forEach((key) => {
      if (fields.includes(key)) {
        //console.log(1, key);
        const formattedData = data[key]
          .split(/[,|\r\n]/)
          .map((value) => value.trim())
          .filter((item) => item !== "")
          .join(", ");

        data[key] = formattedData;
      } else if (addfields.includes(key) && typeof data[key] !== "number") {
        // console.log(2, typeof(data[key]));

        const formattedData = data[key]
          .split(/[\r\n]/)
          .map((value) => value.trim())
          .filter((item) => item !== "")
          .join(", ");

        data[key] = formattedData;
      }
    });
  });

  console.log(schoolData);
  return;

  //Insert Independent School data into MongoDB
  DynamicSchoolModel.insertMany(schoolData)
    .then(() => console.log("Dynamic Schools Data inserted into MongoDB..."))
    .catch((err) =>
      console.error(
        "Could not insert Dynamic Schools data into MongoDB...",
        err
      )
    );
}