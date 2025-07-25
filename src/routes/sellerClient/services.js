// services/StatsService.js
import { prisma } from "../../plugins/db.js";

export default class StatsService {
  constructor(fastify) {}

  async getWeeklyStats(shopId, startDate, endDate) {
    console.log(shopId, startDate, endDate);
    return await prisma.$queryRaw`
  SELECT 
    EXTRACT(DOW FROM "fecha") AS day_of_week,
    SUM("total") AS total
  FROM "Pedido"
  WHERE "tiendaId" = ${shopId}
  AND "fecha" BETWEEN ${start} AND ${end}
  GROUP BY day_of_week
  ORDER BY day_of_week ASC;`; // return await prisma.$queryRawUnsafe(`
    //   SELECT
    //     EXTRACT(DOW FROM "fecha") AS day_of_week,
    //     SUM("total") AS total
    //   FROM "Pedido"
    //   WHERE "tiendaId" = ${shopId}
    //   AND "fecha" BETWEEN ${startDate} AND ${endDate}
    //   GROUP BY day_of_week
    //   ORDER BY day_of_week ASC;
    // `);
  }

  async getMonthlyStats(shopId, startDate, endDate) {
    return await this.fastify.prisma.$queryRawUnsafe(`
      SELECT 
        EXTRACT(DAY FROM "fechaPedido") AS day_of_month,
        SUM("total") AS total
      FROM "order"
      WHERE "tiendaId" = ${shopId}
      AND "fechaPedido" BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
      GROUP BY day_of_month
      ORDER BY day_of_month ASC;
    `);
  }

  async getYearlyStats(shopId, year) {
    return await this.fastify.prisma.$queryRawUnsafe(`
      SELECT 
        EXTRACT(MONTH FROM "fechaPedido") AS month,
        SUM("total") AS total
      FROM "order"
      WHERE "tiendaId" = ${shopId}
      AND EXTRACT(YEAR FROM "fechaPedido") = ${year}
      GROUP BY month
      ORDER BY month ASC;
    `);
  }
}

// export default StatsService;
