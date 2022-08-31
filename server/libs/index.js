const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

exports.checkIfUserExists = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const user = await db.collection("users").findOne({ username });

          resolve(user);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

//get user list
exports.getUserList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const users = await db
            .collection("users")
            .find({ deleted_at: { $eq: null } })
            .toArray();
          resolve(users);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

// User signup
exports.signUp = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");
        const newUser = db.collection("users").insertOne({
          username: user.username,
          password: user.password,
          token: user.token,
        });
        resolve(newUser);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//update User
exports.updatedUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");

        const updatedUser = db.collection("users").findOneAndUpdate(
          { _id: ObjectId(user._id) },
          {
            $set: {
              username: user.username,
              password: user.password,
            },
          }
        );
        resolve(updatedUser);
      });
    } catch (err) {
      reject(err);
    }
  });
};

// get user by Id
exports.getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const user = await db
            .collection("users")
            .findOne({ _id: ObjectId(id) });

          resolve(user);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

//add user profile
exports.addUserProfile = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");
        const newUser = db.collection("userProfile").insertOne({
          userId: ObjectId(user.userId),
          name: user.name,
          email: user.email,
        });
        resolve(newUser);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//update User Profile
exports.updateUserProfile = (userProfile) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");

        const updatedUserProfile = db
          .collection("userProfile")
          .findOneAndUpdate(
            { _id: ObjectId(userProfile._id) },
            {
              $set: {
                name: userProfile.name,
                email: userProfile.email,
              },
            }
          );
        resolve(updatedUserProfile);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//add user education
exports.addUserEducation = (userEducation) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");
        const newUser = db.collection("userEducation").insertOne({
          userId: ObjectId(userEducation.userId),
          university: userEducation.university,
          startDate: userEducation.startDate,
          endDate: userEducation.endDate,
        });
        resolve(newUser);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//update User education
exports.updateUserEducation = (userEducation) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");

        const updatedUserEducation = db
          .collection("userEducation")
          .findOneAndUpdate(
            { _id: ObjectId(userEducation._id) },
            {
              $set: {
                university: userEducation.university,
                startDate: userEducation.startDate,
                endDate: userEducation.endDate,
              },
            }
          );
        resolve(updatedUserEducation);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//add user experience
exports.addUserExperience = (userExperience) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");
        const newUserExperience = db.collection("userExperience").insertOne({
          userId: ObjectId(userExperience.userId),
          company: userExperience.company,
          employmentType: userExperience.employmentType,
        });
        resolve(newUserExperience);
      });
    } catch (err) {
      reject(err);
    }
  });
};

//update User experience
exports.updateUserExperience = (userExperience) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
        if (err) throw err;

        const db = client.db("resumeBuilder");

        const updatedUserExperience = db
          .collection("userExperience")
          .findOneAndUpdate(
            { _id: ObjectId(userExperience._id) },
            {
              $set: {
                company: userExperience.company,
                employmentType: userExperience.employmentType,
              },
            }
          );
        resolve(updatedUserExperience);
      });
    } catch (err) {
      reject(err);
    }
  });
};
