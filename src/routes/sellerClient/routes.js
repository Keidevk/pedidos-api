// import { start } from "repl";
import { prisma } from "../../plugins/db.js";
// import { StatsService } from "./services.js";
//  "../sellerClient/services.js"; // ← ajusta la ruta si el archivo está en otro lugar

function getStartOfWeek(date){
  const day = date.getDay(); // 0 (domingo) a 6 (sábado)
  const diff = (day === 0 ? -6 : 1) - day; // ajusta para que lunes sea el primer día
  const start = new Date(date);
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0); // asegura que es a las 00:00:00
  return start;
}


const registerStats = async (fastify) => {
  // const service = new StatsService(fastify);

  fastify.get("/getStats", async (request, reply) => {
    const { shopId, period, date } = request.query;
    const refDate = date ? new Date(date) : new Date();
    const id = await prisma.shop.findFirst({where:{userId:parseInt(shopId)}})
    console.log(id)
      // console.log("SHOPID: " +shopId+ "\n"+   "START: " + start.toISOString() + "\n" + "END: " + end.toISOString())
    if(period === 'week'){
        
      const start = getStartOfWeek(refDate);
      const end = new Date();
      console.log("START:", start.toISOString(), "\nEND:", end.toISOString());

      return await prisma.$queryRaw`
        SELECT 
          EXTRACT(DOW FROM "fecha") AS day_of_week,
          SUM("total") AS total
        FROM "Pedido"
        WHERE "tiendaId" = ${id.id}
        AND "fecha" BETWEEN ${start} AND ${end}
        GROUP BY day_of_week
        ORDER BY day_of_week ASC;` 
    }else if (period === 'month') {
      const start = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
      const end = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0); // último día del mes
      end.setHours(23, 59, 59, 999); // asegurar que incluya todo el día

      console.log("START:", start.toISOString(), "\nEND:", end.toISOString());
      const id = await prisma.shop.findFirst({where:{userId:parseInt(shopId)}})

      return await prisma.$queryRaw`
        SELECT
          DATE("fecha") AS day,
          SUM("total") AS total
        FROM "Pedido"
        WHERE "tiendaId" = ${id.id}
        AND "fecha" BETWEEN ${start} AND ${end}
        GROUP BY day
        ORDER BY day ASC;
      `;
    }if (period === 'year') {
      const start = new Date(refDate.getFullYear(), 0, 1); // 1 de enero del año
      const end = new Date(refDate.getFullYear(), 11, 31); // 31 de diciembre del año
      end.setHours(23, 59, 59, 999); // incluir toda la última fecha

      console.log("START:", start.toISOString(), "\nEND:", end.toISOString());
      const id = await prisma.shop.findFirst({where:{userId:parseInt(shopId)}})
      
      return await prisma.$queryRaw`
        SELECT
          EXTRACT(MONTH FROM "fecha") AS month,
          SUM("total") AS total
        FROM "Pedido"
        WHERE "tiendaId" = ${id.id}
        AND "fecha" BETWEEN ${start} AND ${end}
        GROUP BY month
        ORDER BY month ASC;
      `;
}
  });
  fastify.get("/orders",async (request,reply)=>{
    const { shopId } = request.query;
    const id = await prisma.shop.findFirst({where:{userId:parseInt(shopId)}})
    
    return await prisma.pedido.count({
    where: {
      tiendaId: id.id,
    estado: {
      in: ['pendiente'],
    },
  },
});

  })
};

export default registerStats;
