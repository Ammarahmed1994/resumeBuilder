const userProfileController = require(`../../controllers/userProfileController/index`);

module.exports = function (app) {
  app.post(`/addProfile`, userProfileController.addProfile);
  app.put(`/updateProfile`, userProfileController.updateProfile);
  app.get(`/getUserProfile`, userProfileController.getUserProfile);
};
