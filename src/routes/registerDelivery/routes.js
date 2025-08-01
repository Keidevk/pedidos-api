import registerDelivery from "./services.js"

const registerdelivery = async (fastify) => {
    const services = new registerDelivery(fastify)

    fastify.post('/register',
        async (request,reply)=>{
            const body = request.body
            return await services.createDelivery(body).then(res=>{
                reply.code(res.code).send(res.message)
            })
        })
    fastify.get('/:userid',
        async (request,reply)=>{
            const userId = request.params.userid
            return await services.getDeliveryByUserId(parseInt(userId)).then(res=>{
                reply.code(res.code).send(res.message ? res.message : res)
            })
        }
    )
    fastify.get('/actives',
        async (request, reply) => {
            return await services.getDeliverysActive().then(res=>{
                reply.code(res.code).send(res)
            })
        }
    )
    fastify.put('/assignment/:userId/:orderId',
        async (request, reply) => {
            const {userId,orderId} = request.params
            return await services.assignmentOrderToDeliveryPerson(parseInt(userId),orderId)
        }
    )
}
export default registerdelivery