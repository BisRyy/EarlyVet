import type {
  CreateLivestockData,
  UpdateLivestockData,
  LivestockResponse,
  LivestockDetails,
} from "./types";

async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`/api/livestock/${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.status !== 204) {
    return response.json();
  }
}

export async function getLivestock(): Promise<LivestockDetails[]> {
  return apiFetch("");
}

export async function getLivestockByOwner(): Promise<LivestockDetails[]> {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return apiFetch(`owner/${user._id}`);
}

export async function getLivestockById(id: string): Promise<LivestockDetails> {
  return apiFetch(`${id}`);
}

export async function createLivestock(
  data: CreateLivestockData
): Promise<LivestockResponse> {
  return apiFetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateLivestock(
  id: string,
  data: UpdateLivestockData
): Promise<LivestockDetails> {
  return apiFetch(`${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteLivestock(id: string): Promise<void> {
  await apiFetch(`${id}`, {
    method: "DELETE",
  });
}

export async function generatePrediction(id: string): Promise<any> {
  return apiFetch(`/predict/${id}`, {
    method: "POST",
  });
}

export async function getLivestockPredictions(id: string): Promise<any> {
  return apiFetch(`/predict/${id}`);
}
