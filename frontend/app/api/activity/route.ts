import { NextResponse } from "next/server";
import { createActivityInBackend, getActivityFromBackend } from "@/lib/backendApi";

export async function GET() {
  try {
    const logs = await getActivityFromBackend();
    return NextResponse.json({ data: logs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch activity logs." } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { action?: string; info?: string };

    if (typeof payload.action !== "string") {
      return NextResponse.json(
        { error: { message: "action must be a string" } },
        { status: 400 }
      );
    }

    const activity = await createActivityInBackend({
      action: payload.action,
      info: typeof payload.info === "string" ? payload.info : undefined,
    });
    return NextResponse.json({ data: activity }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to create activity log." } },
      { status: 500 }
    );
  }
}
