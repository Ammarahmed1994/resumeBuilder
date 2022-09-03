const userExperienceController = require(`../../controllers/userExperienceController/index`);

module.exports = function (app) {
  app.post(`/addExperience`, userExperienceController.addExperience);
  app.put(`/updateExperience`, userExperienceController.updateExperience);
  app.get(`/getUserExperience`, userExperienceController.getUserExperience);
};
