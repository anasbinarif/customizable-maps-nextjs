import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { runMiddleware } from "@/lib/cors";

export async function GET(req, { params }) {
  const { id } = params;

  // console.log(id);
  try {
    await runMiddleware(req, NextResponse.next());
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const map = await prisma.map.findUnique({
      where: {
        id: parseInt(id),
        user: {
          email: session.email,
        },
      },
      include: {
        locations: true,
        images: true,
      },
    });
    // console.log(map);

    if (!map)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    return NextResponse.json({ map: map }, { status: 200 });
  } catch (e) {
    console.error("Error saving map:", e);
    return NextResponse.json({ error: "Error saving map" }, { status: 500 });
  }
}
