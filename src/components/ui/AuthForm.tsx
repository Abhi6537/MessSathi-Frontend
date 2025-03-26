import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/services/authService";
import { fetchUserProfile } from "@/services/authService";

const AuthForm = ({ mode, defaultUserType }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(mode === "register" && { name: "", phone: "", userType: defaultUserType || "tenant" }),
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      let userData;
  
      if (mode === "register") {
        console.log("Registering user with data:", formData); // Debugging log
        userData = await registerUser(formData); // ✅ Call `registerUser`
        console.log("User registered successfully:", userData);
        localStorage.setItem("token", userData.token);

      // ✅ Fetch user profile using the token
        userData = await fetchUserProfile();
        console.log("Fetched user profile after registration:", userData);

        const userType = userData.user_type?.toUpperCase();
        console.log("Normalized user type:", userType);

        // ✅ Redirect based on user role
        if (userType === "OWNER") {
          navigate("/owner-dashboard"); // Redirect owner to owner dashboard
        } else if (userType === "TENANT") {
          navigate("/tenant-dashboard"); // Redirect tenant to tenant dashboard
        } else {
          console.error("Unknown user type received:", userType);
          navigate("/login"); // Default fallback redirection
        }

        return; // ⬅ Prevent further execution
      } else {
        console.log("Logging in with data:", formData); // Debugging log
        userData = await loginUser(formData); // ✅ Call `loginUser`
        console.log("User data after login:", userData);
      }
  
      // Normalize user type
      const userType = userData.user_type?.toUpperCase();
      console.log("Normalized user type:", userType);
  
      // Redirect based on user role
      if (userType === "OWNER") {
        navigate("/owner-dashboard");
      } else if (userType === "TENANT") {
        navigate("/tenant-dashboard");
      } else {
        console.error("Unknown user type received:", userType);
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        {mode === "register" ? "Register" : "Login"}
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Optional"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700">User Type</label>
              <select
                name="userType"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              >
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : mode === "register" ? "Register" : "Login"}
        </button>
      </form>

      {mode === "login" && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
