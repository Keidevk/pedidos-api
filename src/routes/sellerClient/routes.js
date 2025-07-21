import StatsService from "../sellerClient/services.js"; // ← ajusta la ruta si el archivo está en otro lugar

const registerStats = async (fastify) => {
  const service = new StatsService(fastify);

  fastify.get("/getStats", async (request, reply) => {
    const { shopId, period, date } = request.query;
    const refDate = date ? new Date(date) : new Date();
    const id = parseInt(shopId);

    let stats = [];

    try {
      if (period === "week") {
        const start = new Date(refDate);
        start.setDate(start.getDate() - start.getDay());
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        stats = await service.getWeeklyStats(id, start, end);
      } else if (period === "month") {
        const start = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
        const end = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0);
        stats = await service.getMonthlyStats(id, start, end);
      } else if (period === "year") {
        stats = await service.getYearlyStats(id, refDate.getFullYear());
      }

      reply.code(200).send(stats);
    } catch (err) {
      console.error(err);
      reply.code(500).send("Error al obtener estadísticas");
    }
  });
};

export default registerStats;
