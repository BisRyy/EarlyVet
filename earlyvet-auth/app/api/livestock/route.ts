import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    const response = await fetch(
      `http://${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/`,
      {
        headers: {
          Authorization: authorization || "",
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { message: "Failed to fetch livestock" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Livestock fetch error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const headersList = headers();
    const authorization = headersList.get("Authorization");
    console.log(authorization);

    const response = await fetch(
      `http://${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization || "",
        },
        body: JSON.stringify(data),
      }
    );

    

    if (!response.ok) {
      return Response.json(
        { message: "Failed to create livestock" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error("Livestock creation error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
