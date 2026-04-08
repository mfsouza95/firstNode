// import { createServer } from 'node:http';

// const server = createServer((request, response)=>{
//     response.write('OLA!!!')
    
//     return response.end();
// })

// server.listen(3333); Permite rodar varios servers simultaneamente, apenas escolhendo varias portas diferentes.

//CRUD:
//POST localhost:3333/videos -> criacao de video
//DELETE localhost:3333/videos/1 -> remover video (id=1)

import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';
import { title } from 'node:process';

//METODO HTTP -> GET -> Buscar informacoes
//POST - Cria as informacoes
//PUT -> Atualiza TODAS as informacoes
//DELETE -> Deleta as informacoes
//PATCH -> Atualiza parte das informacoes
//É possivel passar diferentes URLs(rotas) através deste metodo GET
//Existem MUITOS outros métodos HTTP, verificar documentação

//Route Parameter -> parametro de indentificação, usado para achar IDs especificos

const server = fastify();

const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body;

    await database.create({
        title,
        description,
        duration
    })
    return reply.status(201).send();
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search;

    const videos = await database.list(search)

    return videos;
})

server.put('/videos/:id', async (request, reply) => {
    const videoID = request.params.id;

    const {title, description, duration} = request.body;
    await database.update(videoID, {
        title,
        description,
        duration
    })
    return reply.status(204).send();
}) 

server.delete('/videos/:id', async (request, reply) => {
    const videoID = request.params.id;

    await database.delete(videoID);

    return reply.status(204).send();
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333, 
}); //Fastify designa portas atraves de objetos, entao é necessario chamar o listen como objeto e passar a porta por dentro ele