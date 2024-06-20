const mongoose = require("mongoose");

var config = require("./config.json");
console.log(config);

const url = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.sw7wgdz.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  number: String,
  important: Boolean,
});

const Phone = mongoose.model("Phone", phoneSchema);

async function insertData(){
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
    }
  ]).then((result) => {
    console.log("phone saved!");
  }).then((result) => {
    getData()
  }).catch((err)=>{
    console.log(err)
  });
}


/*
phone.save().then((result) => {
  console.log("phone saved!");
});
*/

function getData(){
  Phone.find({}).then((result) => {
    console.log("Init:");
    result.forEach((phone) => {
      console.log("Tag:" + phone);
    });
    mongoose.connection.close();
  });
}


//insertData()
