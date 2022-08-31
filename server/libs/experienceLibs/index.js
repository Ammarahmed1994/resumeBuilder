const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

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

// get user experience by Id
exports.getUserExperienceById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const userExperience = await db
            .collection("userExperience")
            .findOne({ userId: ObjectId(userId) });

          resolve(userExperience);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
