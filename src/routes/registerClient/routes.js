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
  fastify.get('/get/:id',
    async(request,reply)=>{
      const id = request.params.id
      return service.findClientById(id).then(res=>{
        reply.code(200).send(res)
      })
    }
  )

  fastify.get('/get/uuid/:uuid',
    async (request, reply) => {
      const uuid = request.params.uuid
      return service.findClientByUuid(uuid).then(res=>{
        reply.code(res.code).send(res)
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