const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

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

// get user profile by Id
exports.getUserProfileById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const userProfile = await db
            .collection("userProfile")
            .findOne({ userId: ObjectId(userId) });

          resolve(userProfile);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
