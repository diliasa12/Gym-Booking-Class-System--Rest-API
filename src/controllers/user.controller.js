import User from "../models/user.model.js";
import Class from "../models/class.model.js";
export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {}
};

export const getClasses = async (req, res) => {
  res.status(202).json({
    succes: true,
    class: req.user.joinedClasses,
  });
};

export const addClass = async (req, res) => {
  const { classId } = req.params;
  const joinClass = await Class.findById(classId);
  if (!joinClass)
    return res.status(404).json({
      message: "class not found",
    });
  const user = await User.findById(req.user.id);
  const doubleCheck = user.joinedClasses.some(
    (id) => id.toString() === classId.toString()
  );
  if (doubleCheck)
    return res.status(400).json({ message: "Class has been added" });
  const isFulled =
    joinClass.members.length >= joinClass.capacity ? true : false;
  if (isFulled) return res.status(400).json({ message: "class is fulled" });
  await User.updateOne(
    user,
    { $addToSet: { joinedClasses: joinClass._id } },
    { new: true }
  ).populate("joinedClasses");
  await Class.updateOne(joinClass, { $addToSet: { members: user._id } });
  res.status(201).json({
    succes: true,
    message: "Successfully add class",
  });
};

export const deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { email } = req.user;

    const user = await User.findOne({ email });
    const existingJoinedClass = user.joinedClasses.some(
      (id) => id.toString() === classId.toString()
    );
    if (!existingJoinedClass)
      return res.status(404).json({ message: "Class not found" });
    const classes = await Class.findById(classId);
    classes.members = classes.members.filter(
      (id) => id.toString() !== user._id.toString()
    );
    await classes.save();
    user.joinedClasses = user.joinedClasses.filter(
      (id) => id.toString() !== classId.toString()
    );

    await user.save();

    res.status(200).json({
      message: "Class removed from user successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
