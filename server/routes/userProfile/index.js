const profileService = require(`../../libs/profileLibs/index`);

module.exports = function (app) {
  //add user profile info
  app.post(`/addProfile`, async (req, res) => {
    const profileInfo = await profileService.addUserProfile(req.body);

    await profileService
      .getUserProfileById(profileInfo.insertedId)
      .then((userInfo) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Succesfully added user info`,
          data: { userInfo },
        });
      })
      .catch(() => {
        res.status(403).json({
          status: `Failed`,
          message: `failed to add profile info`,
        });
      });
  });

  //update user profile info
  app.put(`/updateProfile`, async (req, res) => {
    const updateProfile = await profileService.updateUserProfile(req.body);

    await profileService
      .getUserProfileById(updateProfile.value._id)
      .then((userInfo) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Succesfully updated user info`,
          data: { userInfo },
        });
      })
      .catch(() => {
        res.status(403).json({
          status: `Failed`,
          message: `failed to update profile info`,
        });
      });
  });

  //get user profile info
  app.get(`/getUserProfile`, async (req, res) => {
    await profileService
      .getUserProfileByUserId(req.query.userId)
      .then((userInfo) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Succesfully got user info`,
          data: { userInfo },
        });
      })
      .catch(() => {
        res.status(403).json({
          status: `Failed`,
          message: `failed to get profile info`,
        });
      });
  });
};
