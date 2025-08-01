import { env } from "process"

const AuthKeys = async (fastify) => {
    fastify.get('/googleapi',
        async (request,reply) => {
            reply.code(200).send({code:200,message:process.env.GOOGLEAPI})
        }
    )
}
export default AuthKeys