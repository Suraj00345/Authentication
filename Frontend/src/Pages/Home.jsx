import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  // Stores username
  const [loggedInUser, setLoggedInUser] = useState("");

  // Stores list of products (must be an array)
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  /**
   * Check if user is authenticated on page load.
   * If no token → redirect to login.
   */
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoggedInUser(user);
  }, [navigate]);

  /**
   * Logs the user out and redirects to login page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handleSuccess("User Logged out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  /**
   * Fetch the list of products from backend.
   */
  const fetchProducts = async () => {
    try {
      const url = "https://authentication-fawn-iota.vercel.app/products";
      const token = localStorage.getItem("token");
      // console.log(token);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token, // Correct format
        },
      });

      const result = await response.json();
      // console.log(result);

      setProduct(result);
    } catch (error) {
      handleError(error.message || "Failed to fetch products");
    }
  };

  /**
   * Fetch products only once on page load.
   */
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Welcome, <span className="text-blue-600">{loggedInUser}</span>
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
        font-medium transition-all"
        >
          Logout
        </button>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>

        {product.length === 0 ? (
          <p className="text-gray-600 text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2 font-medium">₹ {item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
