const express = require("express");
const app = express();
var fs = require("fs");
var morgan = require("morgan");
var path = require("path");
const cors = require('cors')

let phones = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
    important:true
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
    important:true
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
    important:true
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    important:true
  },
];

app.use(cors())

app.use(express.json());

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

app.get("/api/phones", (request, response) => {
  response.json(phones);
});

app.get("/api/info", (request, response) => {
  let numOfElements = phones.length;
  let result = `<h1>Current date: ${new Date().toLocaleString()} <br/>Number of elements:${numOfElements}</h1>`;
  response.send(result);
});

//request a single phone

app.get("/api/phones/:id", (request, response) => {
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

const generateId = () => {
  //const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  const maxId = phones.length > 0 ? getRandomArbitrary(1, 10000) : 0;
  return maxId;
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

app.post("/api/phones", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else if (body.name) {
    for (i = 0; i < phones.length; i++) {
      if (phones[i].name === body.name) {
        return response.status(400).json({
          error: "name must be unique",
        });
      }
    }
  }

  const phone = {
    name: body.name,
    number: body.number,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

phones = phones.concat(phone);

  response.json(phone);
});

//delete a phone

app.delete("/api/phones/:id", (request, response) => {
  const id = Number(request.params.id);
  phones = phones.filter((phone) => phone.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/phones`);
});
