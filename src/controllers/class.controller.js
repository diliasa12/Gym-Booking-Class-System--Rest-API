import Class from "../models/class.model.js";
import User from "../models/user.model.js";

export const createClass = async (req, res) => {
  try {
    const existingClass = await Class.findOne({ title: req.body.title });
    if (existingClass)
      return res.status(400).json({
        message: "Class already exist",
      });
    const classes = await Class.create(req.body);
    res.status(201).json({
      success: true,
      message: "Class successfully add",
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classes = await Class.findById(id);
    if (!classes) return res.status(404).json({ message: "Class not found" });
    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllClass = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const existingClass = await Class.findOne({ title: req.body.title });
    if (existingClass)
      return res.status(400).json({ message: "Class already exist" });
    const classes = await Class.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(201).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classes = await Class.findById(id);
    if (!classes) return res.status(404).json({ message: "Class not found" });
    await User.updateMany(
      { joinedClasses: id },
      { $pull: { joinedClasses: id } }
    );
    await Class.deleteOne(classes);
    res.status(200).json({
      success: true,
      message: "Successfully delete class",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
