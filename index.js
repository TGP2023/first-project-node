import express from 'express'; //Essa é a variável
import { v4 } from 'uuid'; // criar uma bibliotec
const cors = require('cors');
app.use(cors());

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors())

/*- Query params => meusite.com/users?name=tiago&age=38 // FILTROS
- Route params => /users/2  // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
- Request Body => {name": "Rodolfo", "age":}

- GET         => Buscar informação no back-end 
- POST        => Criar informação no back-end
- PUT / PATH  => Alterar/Atualizar informação no back-end
-DELETE       => Deletar informação no back-end

-Middleware   => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/



/*app.get ("/users", (request, response) => { //Essa é a rota utilizando o tipo "get"
    const {name, age} = request.query // Destructuring assignment

    console.log(name, age)

    return response.json({name, age}) //name e age funciona assim porque as chaves e valores são os mesmos.


})

app.listen(port, () =>{//Essa é a porta (3000)
console.log(`Server started on port ${port}`)
}) */


//O código abaixo é referente a aula de "Query params"

/*app.get ("/users", (request, response) => {
    const {name, age} = request.query
    console.log(name, age)
    return response.json
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
}) */

/* Aula Route params

const express = require ('express')
const port = 3000
const app = express ()

app.get ('/users/:id', (request, response) => {

    const { id } = request.params
    console.log(request)
    
    return response.send('Hello Express')
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
}) */




/*Aula Body Params
const express = require ('express')

const port = 3000
const app = express()
app.use(express.json())


app.get ('/users', (request, response) => {

const { name, age } = request.body

      
    return response.json({name, age })
})



app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})*/


const users = [] // array

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })


    }

    request.userIndex = index

    next ()

}


app.get('/users', (request, response) => { //rota para mostrar usuários


    return response.json(users)

})

app.post('/users', (request, response) => { //rota para chegar informações
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age } // depois de instalar (uuid), ela gera um id universal único, olhando a documentação no site uuid

    users.push(user) // Este é um array, para adicionar a informação dos usuários 

    return response.status(201).json(user)
})


app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.index

    const updatedUser = { id, name, age }



    users[index] = updatedUser

    return response.json(updatedUser)

})

app.delete('/users/id:', checkUserId, (request, response) => { //rota para mostrar usuários
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()

})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})








