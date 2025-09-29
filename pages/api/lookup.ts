import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ message: "Please provide a name or email." });
  }

  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        OR: [
          name ? { name: { contains: name, mode: "insensitive" } } : {},
          email ? { email: { contains: email, mode: "insensitive" } } : {},
        ],
      },
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Lookup error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
