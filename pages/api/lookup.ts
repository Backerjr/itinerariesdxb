import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body as { name?: string; email?: string };

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const booking = await prisma.bookings.findFirst({
      where: { name, email },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      ...booking,
      date: booking.date.toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
