const experienceService = require(`../../libs/experienceLibs/index`);

module.exports = function (app) {
  app.post(`/addExperience`, async (req, res) => {
    const eexperienceInfo = await experienceService.addUserExperience(req.body);

    await experienceService
      .getUserExperienceById(eexperienceInfo.insertedId)
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
  });

  app.put(`/updateExperience`, async (req, res) => {
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
  });

  app.get(`/getUserExperience`, async (req, res) => {
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
  });
};
