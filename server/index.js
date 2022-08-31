require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const crypto = require("crypto");

let fs = require("fs");
let jwt = require("jsonwebtoken");
// const path = require("path");

const ResumeBuilderService = require(`./libs/index`);
// const { ErrorHandler } = require(`./utils/ErrorHandler`);

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname)));

const hashPassword = (password) => {
  const hash = crypto.createHash("md5").update(password).digest("hex");
  return hash;
};

const generateToken = async (userName, password) => {
  let privateKey = await fs.readFileSync("config/privetkey.pem");
  let token = await jwt.sign(
    {
      userName: userName,
      password: password,
    },
    privateKey,
    { algorithm: "RS256" }
  );
  return token;
};

app.get("/", (req, res) => {
  res.end("Hello World!");
});

app.get(`/signup`, async (req, res) => {
  const isUserExists = await ResumeBuilderService.checkIfUserExists(
    req.body.username
  );

  if (isUserExists)
    res.status(403).json({
      status: `FAILED`,
      message: `This user already exists, Please try another username`,
    });

  let userData = { ...req.body };

  userData.password = await hashPassword(req.body.password);
  userData.token = await generateToken(req.body.username, req.body.password);

  await ResumeBuilderService.signUp(userData)
    .then(() => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully created user`,
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.get(`/login`, async (req, res) => {
  let user = await ResumeBuilderService.checkIfUserExists(req.body.username);

  if (!user)
    res.status(403).json({
      status: `FAILED`,
      message: `This user does not exist, please signup first`,
    });

  let enteredPassword = await hashPassword(req.body.password);

  if (enteredPassword !== user.password)
    res.status(403).json({
      status: `FAILED`,
      message: `Please enter a vaild password`,
    });

  user.token = await generateToken(req.body.username, req.body.password);

  await ResumeBuilderService.updatedUser(user);

  await ResumeBuilderService.getUserById(user._id)
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

app.get(`/list`, async (req, res) => {
  await ResumeBuilderService.getUserList()
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

app.post(`/create`, async (req, res) => {
  await ResumeBuilderService.createUser(req.body)
    .then(() => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully created user`,
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.put(`/update`, async (req, res) => {
  await ResumeBuilderService.updatedUser(req.body)
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
  await ResumeBuilderService.getUserById(req.body._id)
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
  await ResumeBuilderService.addUserProfile(req.body)
    .then(() => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully added user profile`,
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.put(`/updateProfile`, async (req, res) => {
  await ResumeBuilderService.updateUserProfile(req.body)
    .then((user) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully updated user profile`,
        data: { user },
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.post(`/addEducation`, async (req, res) => {
  await ResumeBuilderService.addUserEducation(req.body)
    .then(() => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully added user education`,
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.put(`/updateEducation`, async (req, res) => {
  await ResumeBuilderService.updateUserEducation(req.body)
    .then((user) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully updated user education`,
        data: { user },
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.post(`/addExperience`, async (req, res) => {
  await ResumeBuilderService.addUserExperience(req.body)
    .then(() => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully added user experience`,
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

app.put(`/updateExperience`, async (req, res) => {
  await ResumeBuilderService.updateUserExperience(req.body)
    .then((user) => {
      res.status(200).json({
        status: `SUCCESS`,
        message: `Successfully updated user experience`,
        data: { user },
      });
    })
    .catch((err) => {
      ErrorHandler.handleServerError(req, err, res);
    });
});

const PORT = process.env.PORT || 4000;

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname));
// });

app.listen(PORT, () => {
  console.log(`resume builder is running on port ${PORT}`);
});
