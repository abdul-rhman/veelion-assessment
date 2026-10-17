import { NextResponse } from "next/server";
import { createTaskInBackend, getTasksFromBackend } from "@/lib/backendApi";

export async function GET() {
  try {
    const tasks = await getTasksFromBackend();
    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch tasks." } },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { title?: string };

    if (typeof payload.title !== "string") {
      return NextResponse.json(
        { error: { message: "title must be a string" } },
        { status: 400 }
      );
    }

    const task = await createTaskInBackend(payload.title);
    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to create task." } },
      { status: 500 }
    );
  }
}
