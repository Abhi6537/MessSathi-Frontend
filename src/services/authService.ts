const API_URL = "http://127.0.0.1:80/api/auth"; // Base API URL

export const registerUser = async (userData) => {
    const formattedData = { ...userData, user_type: userData.userType }; // Convert `userType` to `user_type`
    delete formattedData.userType; // Remove old key
  
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");
  
    localStorage.setItem("token", data.token);
    return data;
  };
  

  export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");
  
    localStorage.setItem("token", data.token);
  
    // Fetch user profile after login
    const userResponse = await fetchUserProfile();
    localStorage.setItem("user_type", userResponse.user_type); // Store user role
  
    return userResponse; // Return full user data instead of just token
  };
  

export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Fix Authorization format
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }
  
    return response.json(); // Return user data
  };
  

export const logoutUser = () => {
  localStorage.removeItem("token");
};
