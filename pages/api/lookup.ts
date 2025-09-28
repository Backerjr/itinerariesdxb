import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { name, email } = req.query;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const guest = await prisma.guest.findFirst({
    where: {
      name: { equals: name, mode: "insensitive" },
      email: { equals: email, mode: "insensitive" },
    },
    include: { bookings: true },
  });

  if (!guest) {
    return res.status(404).json({ error: "Guest not found" });
  }

  res.json({ guest });
}
