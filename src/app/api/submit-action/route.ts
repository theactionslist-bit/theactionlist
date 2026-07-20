import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbwxeYCKmSg8MLQYhSbM7gfqvWSsauHGbAgqNWpxvgj0YEF-kpNm6Sfzcrkb6NRyyrgy/exec";

interface SubmitActionBody {
  fullName: string;
  email: string;
  helpsWith: string;
  howItWorks: string;
  anythingElse: string;
}

export async function POST(req: NextRequest) {
  const body: SubmitActionBody = await req.json();

  const { fullName, email, helpsWith, howItWorks, anythingElse } = body;

  if (!fullName || !email || !helpsWith || !howItWorks) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const payload = {
    authors: [fullName],
    email,
    area_of_inspiration: [helpsWith],
    more_info: howItWorks,
    additional_info: anythingElse || "",
    action: "",
    timestamp: new Date().toISOString(),
  };

  const response = await fetch(GOOGLE_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
