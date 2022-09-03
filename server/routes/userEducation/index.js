const userEducationController = require(`../../controllers/userEducationController/`);

module.exports = function (app) {
  app.post(`/addEducation`, userEducationController.addUserEducation);
  app.put(`/updateEducation`, userEducationController.updateUserEducation);
  app.get(`/getUserEducation`, userEducationController.getUserEducation);
};
