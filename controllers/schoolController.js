const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const School = require("../models/schoolSchema");
const NodeGeocoder = require("node-geocoder");

exports.staticSchoolData = async (req, res) => {
  return "Remove return statement";
  try {
    const schoolWorkbook = xlsx.readFile("Static-Schools-Data-2024-v0.xlsx");
    const schoolWorksheet = schoolWorkbook.Sheets[schoolWorkbook.SheetNames[3]];
    const schoolData = xlsx.utils.sheet_to_json(schoolWorksheet);

    const batch = schoolData.slice(0, 1);
    console.log(batch[0].urn, batch[batch.length - 1].urn);
    // return res.send({schools:batch.length});

    console.log(schoolData.length);
    // return res.send({schools:schoolData.length});
    let result = { count: 0, fcount: 0, furns: [] };
    let counter = 0;

    const geoCodeOptions = {
      provider: "openstreetmap",
      fetch: async function (url, options) {
        options.headers = {
          ...options.headers,
          "User-Agent":
            "MyGeocodingApp/1.0 (http://myappwebsite.com; myemail@example.com)",
        };
        return fetch(url, options);
      },
      // provider: "google",
      // apiKey: "AIzaSyDP2YBEu2ocETIMOlI2pQdEp6pXXzVE9tM",
      formatter: null,
    };
    const geoCoder = NodeGeocoder(geoCodeOptions);

    for (let school of batch) {
      const address = `${school["street"] ?? ""},${school["address"] ?? ""},${
        school["locality"] ?? ""
      },${school["town"] ?? ""},${school["postcode"] ?? ""}`;

      let geocodeResPromise = await geoCoder.geocode(address ?? "");

      let flag = true;
      if (geocodeResPromise[0] == undefined) {
        geocodeResPromise = await geoCoder.geocode(school["postcode"] ?? "");

        if (geocodeResPromise[0] == undefined) {
          flag = false;
        }
      }

      const location = {
        type: "Point",
        coordinates: [
          geocodeResPromise[0].longitude ? geocodeResPromise[0].longitude : "",
          geocodeResPromise[0].latitude ? geocodeResPromise[0].latitude : "",
        ],
      };

      school.longitude = geocodeResPromise[0].longitude
        ? geocodeResPromise[0].longitude
        : "";
      school.latitude = geocodeResPromise[0].latitude
        ? geocodeResPromise[0].latitude
        : "";
      school.location = location;

      flag === false ? console.log(false + " - " + urn) : console.log(true);

      // let updated = await School.findOneAndUpdate(
      //   { urn: school.urn },
      //   {
      //     $set: {
      //       laCode: school.laCode,
      //       laName: school.laName,
      //       name: school.name,
      //       typeOfEstablishment: school.typeOfEstablishment,
      //       establishmentStatus: school.establishmentStatus,
      //       statutoryLowAge: school.statutoryLowAge,
      //       statutoryHighAge: school.statutoryHighAge,
      //       boarders: school.boarders,
      //       gender: school.gender,
      //       admissionsPolicy: school.admissionsPolicy,
      //       schoolCapacity: school.schoolCapacity,
      //       numberOfPupils: school.numberOfPupils,
      //       numberOfBoys: school.numberOfBoys,
      //       numberOfGirls: school.numberOfGirls,
      //       ofstedLastInsp: school.ofstedLastInsp,
      //       ofstedRating: school.ofstedRating,
      //       street: school.street,
      //       locality: school.locality,
      //       address: school.address,
      //       town: school.town,
      //       county: school.county,
      //       postcode: school.postcode,
      //       region: school.region,
      //       schoolWebsite: school.schoolWebsite,
      //       telephoneNum: school.telephoneNum,
      //       headTitle: school.headTitle,
      //       headFirstName: school.headFirstName,
      //       headLastName: school.headLastName,
      //       headPreferredJobTitle: school.headPreferredJobTitle,
      //       latitude: school.latitude,
      //       longitude: school.longitude,
      //       location: school.location,
      //       oldSlug: school.oldSlug,
      //       finalSlug: school.finalSlug,
      //     },
      //   }
      // );

      // if (!updated) {
      //   result.fcount++;
      //   result.furns.push(school.urn);
      // } else {
      //   result.count++;
      // }
      console.log(
        ++counter,
        school.urn
        //school
      );
      // break;
    }

    return res.send(result);
  } catch (err) {
    return res.send({ err: err.message });
  }
};

exports.findsStaticSchoolAndUpdateOrCreate = async (req, res) => {
   return "Remove return statement";
  try {
    const schoolWorkbook = xlsx.readFile("Static-Schools-Data-2024-v0.xlsx");
    const schoolWorksheet = schoolWorkbook.Sheets[schoolWorkbook.SheetNames[4]];
    const schoolData = xlsx.utils.sheet_to_json(schoolWorksheet);

    // const batch = schoolData.slice(1600, 1677);
    const batch = schoolData.slice(0, 2);
    console.log(batch[0].urn, batch[batch.length - 1].urn);
    // return res.send({schools:batch.length});

    console.log(schoolData.length);
    // return res.send({schools:schoolData.length});
    let result = { count: 0, fcount: 0, furns: [] };
    let counter = 0;

    const geoCodeOptions = {
      provider: "openstreetmap",
      fetch: async function (url, options) {
        options.headers = {
          ...options.headers,
          "User-Agent":
            "MyGeocodingApp/1.0 (http://myappwebsite.com; myemail@example.com)",
        };
        return fetch(url, options);
      },
      // provider: "google",
      // apiKey: "AIzaSyDP2YBEu2ocETIMOlI2pQdEp6pXXzVE9tM",
      formatter: null,
    };
    const geoCoder = NodeGeocoder(geoCodeOptions);

    for (let school of batch) {
      const address = `${school["street"] ?? ""},${school["address"] ?? ""},${
        school["locality"] ?? ""
      },${school["town"] ?? ""},${school["postcode"] ?? ""}`;

      let geocodeResPromise = await geoCoder.geocode(address ?? "");

      let flag = true;
      if (geocodeResPromise[0] == undefined) {
        geocodeResPromise = await geoCoder.geocode(school["postcode"] ?? "");

        if (geocodeResPromise[0] == undefined) {
          flag = false;
        }
      }

      let location = null;

      if (
        geocodeResPromise[0]?.longitude !== undefined &&
        geocodeResPromise[0]?.latitude !== undefined
      ) {
        location = {
          type: "Point",
          coordinates: [
            geocodeResPromise[0].longitude,
            geocodeResPromise[0].latitude,
          ],
        };
      }

      // school.longitude = geocodeResPromise[0].longitude
      //   ? geocodeResPromise[0].longitude
      //   : "";
      // school.latitude = geocodeResPromise[0].latitude
      //   ? geocodeResPromise[0].latitude
      //   : "";
      school.latitude = geocodeResPromise[0]?.latitude ?? "",
      school.longitude =  geocodeResPromise[0]?.longitude ?? "",
      school.location = location;


      console.log("Geocoded:", school.urn, school.longitude, school.latitude, school.location);
      console.log("t1",geocodeResPromise[0], school)

      const existingSchool = await School.findOne({ urn: school.urn });

      if (existingSchool) {
        console.log("Updating school:", school.urn);
        let updateData = {
          laCode: school.laCode,
          laName: school.laName,
          name: school.name,
          typeOfEstablishment: school.typeOfEstablishment,
          establishmentStatus: school.establishmentStatus,
          statutoryLowAge: school.statutoryLowAge,
          statutoryHighAge: school.statutoryHighAge,
          boarders: school.boarders,
          gender: school.gender,
          admissionsPolicy: school.admissionsPolicy,
          schoolCapacity: school.schoolCapacity,
          numberOfPupils: school.numberOfPupils,
          numberOfBoys: school.numberOfBoys,
          numberOfGirls: school.numberOfGirls,
          ofstedLastInsp: school.ofstedLastInsp,
          ofstedRating: school.ofstedRating,
          street: school.street,
          locality: school.locality,
          address: school.address,
          town: school.town,
          county: school.county,
          postcode: school.postcode,
          region: school.region,
          schoolWebsite: school.schoolWebsite,
          telephoneNum: school.telephoneNum,
          headTitle: school.headTitle,
          headFirstName: school.headFirstName,
          headLastName: school.headLastName,
          headPreferredJobTitle: school.headPreferredJobTitle,
          latitude: geocodeResPromise[0]?.latitude ?? "",
          longitude: geocodeResPromise[0]?.longitude ?? "",
          oldSlug: school.oldSlug,
          finalSlug: school.finalSlug,
        };
      
        // Add location only if valid
        if (location) {
          updateData.location = location;
        } else {
          updateData.location = null; 
        }
      
        let updated = await School.updateOne({ urn: school.urn }, { $set: updateData });
        if (!updated) {
          result.fcount++;
          result.furns.push(school.urn);
        } else {
          result.count++;
        }
      } else {
        console.log("Creating school:", school.urn);
        let newSchoolData = {
          ...school,
          latitude: geocodeResPromise[0]?.latitude ?? "",
          longitude: geocodeResPromise[0]?.longitude ?? "",
        };
      
        // Add location only if valid
        if (location) {
          newSchoolData.location = location;
        } else {
          newSchoolData.location = null; 
        }
      
        let newSchool = await School.create(newSchoolData);
        if (!newSchool) {
          result.fcount++;
          result.furns.push(school.urn);
        } else {
          result.count++;
        }
      }
      console.log(
        ++counter,
        school.urn
        // school
      );
      // break;
    }

    return res.send(result);
  } catch (err) {
    return res.send({ err: err.message });
  }
};
