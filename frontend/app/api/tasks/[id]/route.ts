import { NextResponse } from "next/server";
import { updateTaskInBackend } from "@/lib/backendApi";
import type { TaskUpdates } from "@/types/api";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const payload = (await request.json()) as TaskUpdates;
    const updates: TaskUpdates = {};

    if (typeof payload.title === "string") {
      updates.title = payload.title;
    }

    if (typeof payload.completed === "boolean") {
      updates.completed = payload.completed;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: { message: "Provide a title or completed value" } },
        { status: 400 }
      );
    }

    const task = await updateTaskInBackend(params.id, updates);
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to update task." } },
      { status: 500 }
    );
  }
}
