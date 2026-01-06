-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Threat" (
    "threatID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Threat_pkey" PRIMARY KEY ("threatID")
);

-- CreateTable
CREATE TABLE "DestinationDNS" (
    "dnsID" TEXT NOT NULL,
    "dns" TEXT NOT NULL,
    "ticketID" TEXT NOT NULL,

    CONSTRAINT "DestinationDNS_pkey" PRIMARY KEY ("dnsID")
);

-- CreateTable
CREATE TABLE "DestinationIP" (
    "dstID" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "ticketID" TEXT NOT NULL,

    CONSTRAINT "DestinationIP_pkey" PRIMARY KEY ("dstID")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketID" TEXT NOT NULL,
    "alert" TIMESTAMP(3) NOT NULL,
    "hit" INTEGER NOT NULL,
    "open" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close" TIMESTAMP(3),
    "priority" TEXT NOT NULL,
    "verdict" TEXT,
    "srcIP" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "geoLocation" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "threatID" TEXT NOT NULL,
    "dnsID" TEXT NOT NULL,
    "dstID" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DestinationDNS" ADD CONSTRAINT "DestinationDNS_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "Ticket"("ticketID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinationIP" ADD CONSTRAINT "DestinationIP_ticketID_fkey" FOREIGN KEY ("ticketID") REFERENCES "Ticket"("ticketID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_threatID_fkey" FOREIGN KEY ("threatID") REFERENCES "Threat"("threatID") ON DELETE RESTRICT ON UPDATE CASCADE;
