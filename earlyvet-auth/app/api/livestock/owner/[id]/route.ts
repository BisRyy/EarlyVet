import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    const response = await fetch(
      `http://${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/owner/${params.id}`,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    const response = await fetch(
      `http://${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/owner/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization || "",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      return Response.json(
        { message: "Failed to update livestock" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error("Livestock update error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    const response = await fetch(
      `http://${process.env.LIVESTOCK_SERVICE_HOST}:${process.env.LIVESTOCK_SERVICE_PORT}/api/livestock/owner/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authorization || "",
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { message: "Failed to delete livestock" },
        { status: response.status }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Livestock deletion error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
