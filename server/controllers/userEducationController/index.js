const educationService = require(`../../services/educationServices/index`);

exports.addUserEducation = async (req, res) => {
  const educationInfo = await educationService.addUserEducation(req.body);

  await educationService
    .getUserEducationById(educationInfo.insertedId)
    .then((userEducation) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Succesfully added user education`,
        data: { userEducation },
      });
    })
    .catch(() => {
      res.status(403).json({
        status: `Failed`,
        message: `failed to add user education`,
      });
    });
};

exports.updateUserEducation = async (req, res) => {
  const updateEducation = await educationService.updateUserEducation(req.body);

  await educationService
    .getUserEducationById(updateEducation.value._id)
    .then((userEducation) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Succesfully updated user education`,
        data: { userEducation },
      });
    })
    .catch(() => {
      res.status(403).json({
        status: `Failed`,
        message: `failed to update user education`,
      });
    });
};

exports.getUserEducation = async (req, res) => {
  await educationService
    .getUserEducationByUserId(req.query.userId)
    .then((userEducation) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Succesfully got user education`,
        data: { userEducation },
      });
    })
    .catch(() => {
      res.status(403).json({
        status: `Failed`,
        message: `failed to get education info`,
      });
    });
};
