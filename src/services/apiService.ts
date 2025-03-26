const API_URL = "http://127.0.0.1:80/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch messes owned by the logged-in owner
export const fetchOwnerMesses = async () => {
  const response = await fetch(`${API_URL}/messes/owner`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch owner messes");
  }

  return response.json();
};

// Create a new mess listing
export const createMess = async (messData: any) => {
  const response = await fetch(`${API_URL}/messes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(messData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create mess");

  return data;
};

// Delete a mess listing
export const deleteMess = async (messId: number) => {
  const response = await fetch(`${API_URL}/messes/${messId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete mess");

  return data;
};
