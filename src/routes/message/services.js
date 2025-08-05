import { prisma } from "../../plugins/db.js";

export class Message {
    constructor(fastify) {}

    async createMessage(remitenteId, mensaje) {
        const newMessage = await prisma.message.create({
          data: {
            pedidoId:`chatbot_${remitenteId}`,
            remitenteId,
            mensaje,
            fechaEnvio: new Date(),
            leido:true,
          },
        });

        return {code:200,newMessage:newMessage};
    }
    async sendToVoiceflow( userId, mensaje ) {
        const response = await fetch(`https://general-runtime.voiceflow.com/state/user/${userId}/interact`, {
            method: 'POST',
            headers: {
              'Authorization': process.env.VOICEFLOW_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "request": {
                "type": "text",
                "payload": `${mensaje}`
              },
              "config": {
                "stop": null,
                "restart": false
              }
            }
            ),
        });
        console.log(userId + " " + mensaje +"\n")
        if (!response.ok) {
          return {code:500,response:response};
        }

        const data = await response.json();
        console.log('Data')
        console.log(data)
        console.log('Payload')
        console.log(data[0].payload.message)
        return {code:200,data:data[0].payload.message};
    }
}