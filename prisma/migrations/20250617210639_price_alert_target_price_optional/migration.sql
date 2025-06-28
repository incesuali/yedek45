-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PriceAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "targetPrice" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PriceAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PriceAlert" ("createdAt", "departureDate", "destination", "id", "origin", "targetPrice", "userId") SELECT "createdAt", "departureDate", "destination", "id", "origin", "targetPrice", "userId" FROM "PriceAlert";
DROP TABLE "PriceAlert";
ALTER TABLE "new_PriceAlert" RENAME TO "PriceAlert";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
