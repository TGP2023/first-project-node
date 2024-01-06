import express from "express"; //Essa é a variável
import { v4 } from "uuid"; // criar uma bibliotec
import cors from "cors";

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const users = []; // array

const checkUserId = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "User not found" });
  }

  request.userIndex = index;

  next();
};

app.get("/users", (request, response) => {
  //rota para mostrar usuários

  return response.json(users);
});

app.post("/users", (request, response) => {
  //rota para chegar informações
  const { name, age } = request.body;

  const user = { id: v4(), name, age }; // depois de instalar (uuid), ela gera um id universal único, olhando a documentação no site uuid

  users.push(user); // Este é um array, para adicionar a informação dos usuários

  return response.status(201).json(user);
});

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.index;

  const updatedUser = { id, name, age };

  users[index] = updatedUser;

  return response.json(updatedUser);
});

app.delete("/users/id:", checkUserId, (request, response) => {
  //rota para mostrar usuários
  const index = request.userIndex;

  users.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
