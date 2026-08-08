import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      service: "Nestick Official Site",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}