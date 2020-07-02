const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
/*
function logRequests(request, response, next) {
  const { method, url } = request;
  const loglabel = `[${method.toUpperCase()}] ${url}`;
  console.time(loglabel);
  next();
  console.timeEnd(loglabel);
}

app.use(logRequests);
*/
function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json(
      {
        message: 'Invalid repository ID.',
        error: 'The server cannot or will not process the request due to an apparent client error.'
      }
    );
  }

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  return next();
}

app.use('/repositories/:id*', validateRepositoryId);


app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  const repository = repositories[repoIndex];

  repositories[repoIndex] = {
    id,
    title: title ? title : repository.title,
    url: url ? url : repository.url,
    techs: techs ? techs : repository.techs,
    likes: repository.likes
  }

  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  repositories.splice(repoIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  var repository = repositories[repoIndex];
  repository.likes = Number(repository.likes) + 1;
  repositories[repoIndex] = repository;

  return response.json(repository);

});

module.exports = app;
