const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

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

// get user education by Id
exports.getUserEducationById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const userEducation = await db
            .collection("userEducation")
            .findOne({ _id: ObjectId(id) });

          resolve(userEducation);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

// get user education by user Id
exports.getUserEducationByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      MongoClient.connect(
        process.env.MONGODB_URI,
        async function (err, client) {
          if (err) throw err;

          const db = client.db("resumeBuilder");
          const userEducation = await db
            .collection("userEducation")
            .findOne({ userId: ObjectId(userId) });

          resolve(userEducation);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
