const hospital = require("../models/hospital");
const Hospital = require("../models/hospital");
const { response } = require("express");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name img");

  try {
    res.json({
      ok: true,
      msg: "Get Hospital",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: "Algo salio mal",
    });
  }
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;

  const hospital = new Hospital({ user: uid, ...req.body });
  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDB,
      msg: "Create Hospital",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en la peticion",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById({ _id: id });

    if (!hospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Invalid Id",
      });
    }
    const dataHospital = {
      ...req.body,
      user: uid,
    };

    const UpdateHospital = await Hospital.findByIdAndUpdate(id, dataHospital, {
      new: true,
    });

    res.json({
      ok: true,
      hospital: UpdateHospital,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteHospital = async (req, res = response) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const HospitalDB = await Hospital.findById({ _id: id });

    if (!HospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Invalid id",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Delete Hospital",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
