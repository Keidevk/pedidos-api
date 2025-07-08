import { RegisterClient } from "./services.js";

const registerRoutes = async (fastify) => {
  const service = new RegisterClient(fastify);

  fastify.post('/register',
    async (request,reply) => {
      const client =  request.body
      service.createClient(client)
      reply.code(201).send("realizado")
    }
  )
  fastify.get('/getclients',
    async (request,reply) => {
      const response = service.findClients()
      return response.then(res=>{
        reply.code(200).send(res)
      })
    }
  )

};

export default registerRoutes;