import { prisma } from './lib/prisma'

async function main() {
  // 1. Create User
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      passwordHash: 'dontol',
    },
  })

  // 2. Create Threat
  const threat = await prisma.threat.create({
    data: {
      name: 'Brute Force Attack',
      category: 'Authentication',
      severity: 4,
      description: 'Multiple failed login attempts',
    },
  })

  // 3. Create Ticket
  const ticket = await prisma.ticket.create({
    data: {
      alert: new Date('2026-01-06T22:11:08Z'),
      hit: 1,
      priority: 'High',
      verdict: 'Suspicious',
      srcIP: '192.168.1.10',
      type: 'Security Alert',
      geoLocation: 'ID',
      userID: user.userID,
      threatID: threat.threatID,

      // temporary placeholders (required by schema)
      dnsID: 'TEMP_DNS',
      dstID: 'TEMP_DST',
    },
  })

  // 4. Create Destination DNS
  const dns = await prisma.destinationDNS.create({
    data: {
      dns: 'malicious.example.com',
      ticketID: ticket.ticketID,
    },
  })

  // 5. Create Destination IP
  const dst = await prisma.destinationIP.create({
    data: {
      ip: '8.8.8.8',
      ticketID: ticket.ticketID,
    },
  })

  // 6. Update ticket with real dnsID & dstID
  await prisma.ticket.update({
    where: { ticketID: ticket.ticketID },
    data: {
      dnsID: dns.dnsID,
      dstID: dst.dstID,
    },
  })

  // 7. Fetch full ticket with relations
  const fullTicket = await prisma.ticket.findMany({
    include: {
      User: true,
      Threat: true,
      DestinationDNS: true,
      DestinationIP: true,
    },
  })

  console.dir(fullTicket, { depth: null })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
