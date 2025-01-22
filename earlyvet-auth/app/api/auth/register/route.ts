import type { NextRequest } from "next/server";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: RegisterData = await request.json();

    const response = await fetch(`http://auth:5001/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: result.message || "Failed to register" },
        { status: response.status }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
