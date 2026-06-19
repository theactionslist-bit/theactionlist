import { NextRequest, NextResponse } from "next/server";

const BEEHIIV_API_URL =
  "https://api.beehiiv.com/v2/publications/pub_53861671-499f-4797-9e5c-24c190d47bfc/subscriptions";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const response = await fetch(BEEHIIV_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      reactivate_existing: false,
      send_welcome_email: true,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Beehiiv error:", text);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: response.status }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
