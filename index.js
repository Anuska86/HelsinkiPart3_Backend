const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

//request all the persons

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  let numOfElements = persons.length;
  let result = `<h1>${new Date().toLocaleString()} <br/>Number of elements:${numOfElements}</h1>`;
  response.send(result);
});

//request a person

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Error 404: That person doesn't exist";
    response.status(404).send(`<h1>${response.statusMessage}</h1>`);
  }
});

//add a person

const generateId = () => {
  //const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  const maxId = persons.length > 0 ? getRandomArbitrary(1,10000) : 0;
  return maxId;
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    }) ;
  } else if (body.name) {
    for(i=0;i<persons.length;i++){
      if(persons[i].name===body.name){
        return response.status(400).json({
        error: "name must be unique"
      }) ;
      }
    } 
  }



  const person = {
    name: body.name,
    number:body.number, 
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

//delete a person

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api/persons`);
});
