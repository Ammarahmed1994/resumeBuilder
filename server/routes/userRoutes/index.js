const userController = require(`../../controllers/userController/index`);

module.exports = function (app) {
  app.post(`/signup`, userController.signUP);
  app.post(`/login`, userController.login);
  app.get(`/list`, userController.usersList);
  app.put(`/update`, userController.userUpdate);
  app.get(`/userDetails`, userController.userDetails);
};
