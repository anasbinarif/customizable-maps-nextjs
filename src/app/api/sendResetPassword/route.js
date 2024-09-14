import nodemailer from "nodemailer";
import crypto from "crypto";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req, res) {
  try {
    const { email } = await req.json();
    // console.log(email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    // console.log(user);

    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 3600000;

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpires: new Date(expires),
      },
    });

    const combinedToken = Buffer.from(`${token}:${email}`).toString("base64");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });

    const resetURL = `${
      process.env.NEXT_PUBLIC_SITE_URL || "localhost:3000"
    }/user/reset-password?token=${combinedToken}`;

    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      html: `
            <p>You requested a password reset</p>
            <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
          `,
    });

    return NextResponse.json(
      { message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error processing request-reset:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
