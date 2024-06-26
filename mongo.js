require("dotenv").config();
const mongoose = require("mongoose");


const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
/*
mongoose.connect(url).then(() => {

  async function insertData() {
    await Phone.create([
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Arto Hellas",
        number: "040-123456",
        important: true,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Ada Lovelace",
        number: "39-44-5323523",
        important: true,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Dan Abramov",
        number: "12-43-234345",
        important: true,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        important: true,
      },
    ])
      .then((result) => {
        console.log("phone saved!");
      })
      .then((result) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

phone.save().then((result) => {
  console.log("phone saved!");
});


});
*/

function getData() {
  const phoneSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    number: String,
    important: Boolean,
  });
  
  const Phone = mongoose.model("Phone", phoneSchema);
  mongoose.connect(url).then(() => {
    let phones = [];
    Phone.find({}).then((result) => {
      console.log("Init:");
      result.forEach((phone) => {
        console.log("Tag:" + phone);
        phones.push(phone)
      });
      //mongoose.connection.close();
      return phones;
    });
  })

}

//insertData()

module.exports = { getData };