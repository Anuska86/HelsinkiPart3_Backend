const mongoose = require("mongoose");

var config = require('./config.json');
console.log(config);

const url = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.sw7wgdz.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
});

const Phone = mongoose.model("Phone", phoneSchema);


const phone = new Phone({
    name: "Arto Hellas",
    number: "040-123456",
    important:true
});

phone.save().then((result) => {
    console.log("phone saved!");
  });

Phone.find({}).then(result => {
    console.log('Init:')
    result.forEach(phone => {
      console.log('Tag:' +phone)
    })
    mongoose.connection.close()
  })