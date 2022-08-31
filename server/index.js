require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./routes/userRoutes/index")(app);
require("./routes/userProfile/index")(app);
require("./routes/userEducation/index")(app);
require("./routes/userExperience/index")(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`resume builder is running on port ${PORT}`);
});
