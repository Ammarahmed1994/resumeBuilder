const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//check if user exists
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
