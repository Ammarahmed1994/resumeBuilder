const userService = require(`../../libs/userLibs/index`);
const helperService = require(`../../common/helper.service`);

module.exports = function (app) {
  app.post(`/signup`, async (req, res) => {
    const isUserExists = await userService.checkIfUserExists(req.body.username);

    if (isUserExists)
      res.status(403).json({
        status: `FAILED`,
        message: `This user already exists, Please try another username`,
      });

    let userData = { ...req.body };

    userData.password = await helperService.hashPassword(req.body.password);
    userData.token = await helperService.generateToken(
      req.body.username,
      req.body.password
    );

    await userService
      .signUp(userData)
      .then(() => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Successfully created user`,
        });
      })
      .catch((err) => {
        res.status(403).json({
          status: `Failed`,
          message: `failed to get sign up`,
        });
      });
  });

  app.post(`/login`, async (req, res) => {
    let user = await userService.checkIfUserExists(req.body.username);

    if (!user)
      return res.status(403).json({
        status: `FAILED`,
        message: `This user does not exist, please signup first`,
      });

    let enteredPassword = await helperService.hashPassword(req.body.password);

    if (enteredPassword !== user.password)
      return res.status(403).json({
        status: `FAILED`,
        message: `Please enter a vaild password`,
      });

    user.token = await helperService.generateToken(
      req.body.username,
      req.body.password
    );

    await userService.updatedUser(user);

    await userService
      .getUserById(user._id)
      .then((user) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Succesfully logged in`,
          data: { user },
        });
      })
      .catch(() => {
        res.status(403).json({
          status: `Failed`,
          message: `failed to get login`,
        });
      });
  });

  app.get(`/list`, async (req, res) => {
    await userService
      .getUserList()
      .then((users) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Got users list.`,
          data: { users },
        });
      })
      .catch(() => {
        res.status(403).json({
          status: `Failed`,
          message: `error getting users list.`,
          data: { users },
        });
      });
  });

  app.put(`/update`, async (req, res) => {
    await userService
      .updatedUser(req.body)
      .then((user) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Successfully updated User`,
          data: { user },
        });
      })
      .catch(() => {
        res.status(403).json({
          status: `Failed`,
          message: `error updating user`,
          data: { users },
        });
      });
  });

  app.get(`/userDetails`, async (req, res) => {
    await userService
      .getUserById(req.body._id)
      .then((user) => {
        res.status(200).json({
          status: `SUCCESS`,
          message: `Got User details by Id.`,
          data: { user },
        });
      })
      .catch((err) => {
        res.status(403).json({
          status: `Failed`,
          message: `failed to Get User details by Id.`,
          data: { users },
        });
      });
  });
};
