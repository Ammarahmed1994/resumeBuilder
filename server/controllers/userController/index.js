const userService = require(`../../services/userServices/index`);
const helperService = require(`../../common/helper.service`);
let bcrypt = require("bcryptjs");

exports.signUP = async (req, res) => {
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
};

exports.login = async (req, res) => {
  let user = await userService.checkIfUserExists(req.body.username);

  if (!user)
    return res.status(403).json({
      status: `FAILED`,
      message: `This user does not exist, please signup first`,
    });

  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid)
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
};

exports.usersList = async (req, res) => {
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
};

exports.userUpdate = async (req, res) => {
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
};

exports.userDetails = async (req, res) => {
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
};
