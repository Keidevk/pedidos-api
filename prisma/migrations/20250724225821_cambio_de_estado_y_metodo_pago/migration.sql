/*
  Warnings:

  - The values [transferencia] on the enum `metodoPago` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "estado" ADD VALUE 'pendiente';

-- AlterEnum
BEGIN;
CREATE TYPE "metodoPago_new" AS ENUM ('efectivo', 'tarjeta', 'pagoMovil');
ALTER TABLE "Pedido" ALTER COLUMN "metodoPago" TYPE "metodoPago_new" USING ("metodoPago"::text::"metodoPago_new");
ALTER TYPE "metodoPago" RENAME TO "metodoPago_old";
ALTER TYPE "metodoPago_new" RENAME TO "metodoPago";
DROP TYPE "metodoPago_old";
COMMIT;
