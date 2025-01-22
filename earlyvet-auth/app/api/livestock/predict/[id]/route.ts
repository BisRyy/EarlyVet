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
      `http://${process.env.PREDICTION_SERVICE_HOST}:${process.env.PREDICTION_SERVICE_PORT}/predictions/${params.id}`,
      {
        headers: {
          Authorization: authorization || "",
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      return Response.json(
        { message: "Failed to fetch prediction" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Prediction fetch error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authorization = headersList.get("Authorization");

    const response = await fetch(
      `http://${process.env.PREDICTION_SERVICE_HOST}:${process.env.PREDICTION_SERVICE_PORT}/predict/${params.id}`,
      {
        headers: {
          Authorization: authorization || "",
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      return Response.json(
        { message: "Failed to request prediction" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Prediction request error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
