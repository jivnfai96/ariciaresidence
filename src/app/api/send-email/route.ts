import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`,
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY, // 如果有 public key
        template_params: data,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ ok: false, error: errorText }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Email API Error:", err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
