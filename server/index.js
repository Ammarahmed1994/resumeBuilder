require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");

let fs = require("fs");
let jwt = require("jsonwebtoken");
// const path = require("path");

const userService = require(`./libs/userLibs/index`);
const profileService = require(`./libs/profileLibs/index`);
const educationService = require(`./libs/educationLibs/index`);
const experienceService = require(`./libs/experienceLibs/index`);
const helperService = require(`./common/helper.service`);
const ErrorHandler = require(`./utils/ErrorHandler`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.end("Hello World!");
});

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
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
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
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
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
      ErrorHandler.handleServerError(req, err, res);
    });
});

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

app.post(`/addEducation`, async (req, res) => {
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
});

app.put(`/updateEducation`, async (req, res) => {
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
});

app.get(`/getUserEducation`, async (req, res) => {
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
});

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

const PORT = process.env.PORT || 4000;

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname));
// });

app.listen(PORT, () => {
  console.log(`resume builder is running on port ${PORT}`);
});
