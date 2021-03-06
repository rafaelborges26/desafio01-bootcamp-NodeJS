const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateId(request, response, next) {
  const { id } = request.params

  if(!isUuid(id)) {
    return response.status(400).json({error:"Id is not valid"})
  }

  return next()

}

app.get("/repositories", (request, response) => {
  const arrayContainer = repositories 
  return response.json(arrayContainer)

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const id = uuid()
  const likes = 0
  const repository = {id, title, url, techs, likes}
  repositories.push(repository)
  return response.json(repository)

});

app.put("/repositories/:id",validateId, (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const indexfound = repositories.findIndex((repositorie) => repositorie.id == id)

  if(indexfound < 0){
    return response.status(404).json({error:"Id not found"})
  }

  repositories[indexfound].title = title
  repositories[indexfound].url = url
  repositories[indexfound].techs = techs

   repository = repositories[indexfound]

  return response.json(repository)

});

app.delete("/repositories/:id",validateId, (request, response) => {
  const { id } = request.params
  const { title, techs } = request.body

  const indexfound = repositories.findIndex((repository) => repository.id == id)

  if(indexfound < 0){
    return response.status(400).json({error:"index not found"})
  }

  repositories.splice(indexfound, 1)

  return response.status(204).json()
  

});

app.post("/repositories/:id/like", (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params
  const repository = {id, title, url, techs}
  
  const indexfound = repositories.findIndex((repository) => repository.id == id)

  if(indexfound < 0){
    return response.status(400).json({error:"id not found"})
  }

  repository.likes = repository.likes + 1
  //repositories.push(repository)
  repositories[indexfound].likes = repositories[indexfound].likes + 1
  //repositories[indexfound].likes = likes

  return response.json(repositories[indexfound])  
});

module.exports = app;
