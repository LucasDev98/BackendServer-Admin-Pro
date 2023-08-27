const Medical = require("../models/medicals");
const { response } = require("express");

const getMedical = async (req, res = response) => {
  const medicals = await Medical.find()
    .populate("user", "name")
    .populate("hospital", "name");
  try {
    res.json({
      ok: true,
      medicals,
      msg: "Get Medical",
    });
  } catch (error) {}
};

const createMedical = async (req, res = response) => {
  const uid = req.uid;

  const medical = new Medical({
    user: uid,
    ...req.body,
  });

  try {
    const medicalDB = await medical.save(medical);
    res.json({
      ok: true,
      medical: medicalDB,
      msg: "Create Medical",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const updateMedical = async (req, res = response) => {
  const uid = req.uid;

  const id = req.params.id;

  try {
    const medicalDB = await Medical.findById({ _id: id });

    if (!medicalDB) {
      res.status(404).json({
        ok: false,
        msg: "Invalid id",
      });
    }

    const dataMedical = {
      ...req.body,
      user: uid,
    };

    const UpdateMedical = await Medical.findByIdAndUpdate(id, dataMedical, {
      new: true,
    });

    res.json({
      ok: true,
      medical: UpdateMedical,
      msg: "Update Medical",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMedical = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicalDB = await Medical.findById({ _id: id });

    if (!medicalDB) {
      res.status(404).json({
        ok: false,
        msg: "Invalid Id",
      });
    }

    await Medical.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Delete Medical",
    });
  } catch (error) {}
};

module.exports = {
  getMedical,
  createMedical,
  updateMedical,
  deleteMedical,
};
