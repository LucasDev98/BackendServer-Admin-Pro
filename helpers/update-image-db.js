const User = require("../models/user");
const Hospitals = require("../models/hospital");
const Medicals = require("../models/medicals");
const fs = require("fs");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (id, collection, fileName) => {
  let oldPath = "";
  console.log(collection);
  console.log(id);
  switch (collection) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("Error inesperado");
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);
      user.img = fileName;
      await user.save();
      return true;
      break;
    /*------------------------------------------------------------------------*/
    case "hospitals":
      const hospital = await Hospitals.findById(id);
      if (!hospital) {
        console.log("Error inesperado");
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);
      hospital.img = fileName;
      await hospital.save();
      return true;
      break;
    /*------------------------------------------------------------------------*/
    case "medicals":
      const medicals = await Medicals.findById(id);
      if (!medicals) {
        console.log("Error inesperado");
        return false;
      }

      oldPath = `./uploads/medicals/${medicals.img}`;
      deleteImage(oldPath);
      medicals.img = fileName;
      await medicals.save();
      return true;
      break;
    default:
      return false;
  }
};

module.exports = {
  updateImage,
};
