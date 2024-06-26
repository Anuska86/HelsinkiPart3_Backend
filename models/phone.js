require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
let phoneData= {};

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
    phoneData = getData();
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phoneSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  number: String,
  important: Boolean,
});

const Phone = mongoose.model("Phone", phoneSchema);

function getData() {
  Phone.find({}).then((result) => {
    console.log("Init:");
    result.forEach((phone) => {
      console.log("Tag:" + phone);
    });
    //mongoose.connection.close();
  });
}

//const Phone = mongoose.model("Phone", phoneSchema);

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phone", phoneSchema);
