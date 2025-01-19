import {
  Livestock,
  CreateLivestockData,
  UpdateLivestockData,
  LivestockResponse,
  LivestockDetails,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_LIVESTOCK_SERVICE;

export async function getLivestock(): Promise<Livestock[]> {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  console.log("user", user);
  return apiFetch("");
}

export async function getLivestockByOwner(): Promise<Livestock[]> {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");
  console.log("user", user);
  return apiFetch(`/owner/${user._id}`);
}

export async function getLivestockById(id: string): Promise<LivestockDetails> {
  return apiFetch(`${id}`);
}

export async function createLivestock(
  data: CreateLivestockData
): Promise<LivestockResponse> {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("users", user);
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
): Promise<Livestock> {
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

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/${endpoint}`, {
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
