import type { NextRequest } from "next/server";

interface LoginData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  console.log(`http://auth:5001/api/users/login`);
  try {
    const data: LoginData = await request.json();

    const response = await fetch(`http://auth:5001/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: result.message || "Failed to login" },
        { status: response.status }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
