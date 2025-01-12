const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const DynamicSchoolModel = require("../models/dynamicSchools");

// Helper function to process the Excel file
function processExcelFile(filePath) {
  const schoolWorkbook = xlsx.readFile(filePath);
  const schoolWorksheet = schoolWorkbook.Sheets[schoolWorkbook.SheetNames[2]];
  const schoolData = xlsx.utils.sheet_to_json(schoolWorksheet);

  const fields = [
    "clubsandSocieties",
    "sports",
    "examBoards",
    "examDate",
    "openDaysforYear7",
    "examSubjects",
  ];
  const addfields = ["fees"];

  schoolData.forEach((data) => {
    Object.keys(data).forEach((key) => {
      if (fields.includes(key)) {
        const formattedData = data[key]
          .split(/[,|\r\n]/)
          .map((value) => value.trim())
          .filter((item) => item !== "")
          .join(", ");
        data[key] = formattedData;
      } else if (addfields.includes(key) && typeof data[key] !== "number") {
        const formattedData = data[key]
          .split(/[\r\n]/)
          .map((value) => value.trim())
          .filter((item) => item !== "")
          .join(", ");
        data[key] = formattedData;
      }
    });
  });

  return schoolData;
}

// Route handler for uploading and processing the Excel file
exports.uploadSchoolsData = (req, res) => {
  const filePath = path.join(__dirname, "../schools-dynamic-data.xlsx");

  // Check if the file exists at the given location
  fs.exists(filePath, (exists) => {
    if (!exists) {
      return res.status(404).json({ message: "File not found" });
    }

    const schoolData = processExcelFile(filePath);

    res.send({data:schoolData});

    // Insert into MongoDB
    // DynamicSchoolModel.insertMany(schoolData)
    //   .then(() => {
    //     res.status(200).json({ message: "Data inserted into MongoDB" });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({
    //       message: "Could not insert data into MongoDB",
    //       error: err,
    //     });
    //   });
  });
};
