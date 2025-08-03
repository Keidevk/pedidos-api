import { Message } from "./services.js";

const messageRoutes = async (fastify) => {
    const service = new Message(fastify)
    fastify.post('/',
        async (request,reply) => {
            const {remitenteId,message} = request.body
            // const messageData = await service.createMessage(remitenteId,message)
            const response = await service.sendToVoiceflow(remitenteId,message)

            console.log(response)
            reply.code(200).send(response)
        }
    )

}

export default messageRoutes;
