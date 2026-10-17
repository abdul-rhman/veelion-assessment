import { NextResponse } from "next/server";
import { updateActivityInBackend } from "@/lib/backendApi";
import type { ActivityUpdates } from "@/types/api";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const payload = (await request.json()) as ActivityUpdates;
    const updates: ActivityUpdates = {};

    if (typeof payload.action === "string") {
      updates.action = payload.action;
    }

    if (typeof payload.info === "string") {
      updates.info = payload.info;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: { message: "Provide an action or info value" } },
        { status: 400 }
      );
    }

    const activity = await updateActivityInBackend(params.id, updates);
    return NextResponse.json({ data: activity }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to update activity log." } },
      { status: 500 }
    );
  }
}
