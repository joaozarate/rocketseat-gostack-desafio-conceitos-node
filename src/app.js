const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


function logRequests(request, response, next) {
  const { method, url } = request;
  const loglabel = `[${method.toUpperCase()}] ${url}`;
  console.time(loglabel);
  next();
  console.timeEnd(loglabel);
}

app.use(logRequests);

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json(
      {
        message: 'Invalid project ID.',
        error: 'The server cannot or will not process the request due to an apparent client error.'
      }
    );
  }

  return next();
}

app.use('/projects/:id/*', validateProjectId);


const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {



});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
