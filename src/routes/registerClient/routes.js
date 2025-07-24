import { RegisterClient } from "./services.js";

const registerRoutes = async (fastify) => {
  const service = new RegisterClient(fastify);

  fastify.post('/register',
    async (request,reply) => {
      const client =  request.body
      return service.createClient(client).then(data=>{
        reply.code(data.code).send(data.message)
        console.log(data.code)
      })      
    }
  );

  fastify.get('/getclients',
    async (request,reply) => {
      const response = service.findClients()
      return response.then(res=>{
        reply.code(200).send(res)
      })
    }
  )
  fastify.delete('/delete/:id',
    async (request,reply) => {
    const id =parseInt(request.params.id)
    return service.deleteClient(id).then((res)=>{
      reply.code(200).send({message:"Clientes eliminados"})
    })
    

  })

};

export default registerRoutes;