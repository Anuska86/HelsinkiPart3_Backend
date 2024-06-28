require("dotenv").config();
const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");
const Phone = require("./models/phone");
const mongoService = require("./mongo");
var mongoose = require('mongoose');

/*
let phones = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
    important: true,
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
    important: true,
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
    important: true,
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    important: true,
  },
];
*/
app.use(cors());

app.use(express.json());

app.use(express.static("dist"));

app.use(morgan("tiny"));

morgan.format("reqbody", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqbody"
  )
);

//request all the phones

app.get("/", async (request, response) => {
  let retrievedData =  await mongoService.getData();
  response.json(retrievedData);
});

app.get("/api/phones", (request, response) => {
  Phone.find({}).then((phones) => {
    response.json(phones);
  });
});

//resquest favourites numbers

app.get("/api/phones/favourites", (request, response) => {
  Phone.find({"important":true}).then((phones) => {
    response.json(phones);
  });
});

app.get("/api/info", (request, response) => {
  let numOfElements = phones.length;
  let result = `<h1>Current date: ${new Date().toLocaleString()} <br/>Number of elements:${numOfElements}</h1>`;
  response.send(result);
});

//request a single phone

app.get("/api/phones/", (request, response) => {
  Phone.find({}).then((phones) => {
    response.json(phones);
  });
});

app.get("/api/phones/:id", (resquest, response) => {
  const id = Number(request.params.id);
  const phone = phones.find((phone) => phone.id === id);

  if (phone) {
    response.json(phone);
  } else {
    response.statusMessage = "Error 404: That phone doesn't exist";
    response.status(404).send(`<h1>${response.statusMessage}</h1>`);
  }
});

//add a new phone

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

app.post("/api/phones", (request, response) => {
  const body = request.body;
  
  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } 
  /*
  else if (body.name) {
    for (i = 0; i < phones.length; i++) {
      if (phones[i].name === body.name) {
        return response.status(400).json({
          error: "name must be unique",
        });
      }
    }
  }
  */

  const phone = new Phone({
    name: body.name,
    number: body.phone,
    important: body.important,
    _id: new mongoose.Types.ObjectId(),
  });
  console.log(phone)
  phone.save().then((savedPhone) => {
    response.json(savedPhone);
  });
  return true;
});

//delete a phone

app.delete("/api/phones/:id", (request, response) => {
  const id = Number(request.params.id);
  phones = phones.filter((phone) => phone.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/phones`);
});
