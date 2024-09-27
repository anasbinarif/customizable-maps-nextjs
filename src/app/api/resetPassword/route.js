import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  try {
    const { token, newPassword } = await req.json();
    // console.log(token);

    const [decodedToken, email] = Buffer.from(token, "base64")
      .toString()
      .split(":");

    // console.log(email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    if (
      user.resetToken !== decodedToken ||
      user.resetTokenExpires < new Date()
    ) {
      //   console.log(1);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    // console.log(2);

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error processing password reset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
