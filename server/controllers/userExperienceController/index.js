const experienceService = require(`../../services/experienceServices/index`);

exports.addExperience = async (req, res) => {
  const experienceInfo = await experienceService.addUserExperience(req.body);

  await experienceService
    .getUserExperienceById(experienceInfo.insertedId)
    .then((userExperience) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Succesfully added user Experience`,
        data: { userExperience },
      });
    })
    .catch(() => {
      res.status(403).json({
        status: `Failed`,
        message: `failed to add user Experience`,
      });
    });
};

exports.updateExperience = async (req, res) => {
  const updateExperience = await experienceService.updateUserExperience(
    req.body
  );

  await experienceService
    .getUserExperienceById(updateExperience.value._id)
    .then((userExperience) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Succesfully updated user Experience`,
        data: { userExperience },
      });
    })
    .catch(() => {
      res.status(403).json({
        status: `Failed`,
        message: `failed to update user Experience`,
      });
    });
};

exports.getUserExperience = async (req, res) => {
  await experienceService
    .getUserExperienceByUserId(req.query.userId)
    .then((userExperience) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Succesfully got user experience`,
        data: { userExperience },
      });
    })
    .catch(() => {
      res.status(403).json({
        status: `Failed`,
        message: `failed to get experience info`,
      });
    });
};
