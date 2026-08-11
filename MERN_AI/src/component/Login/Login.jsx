/**import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "../../utils/axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    alert("Sign in successful!");
    navigate("/dashboard");
  };

  

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // Post user details to backend API
    try {
      const response = await axios.post("/api/user", {
        email: result.user.email,
        uid: result.user.uid,
        name: result.user.displayName,
      });

      console.log("Backend response:", response.data);

      // Save login information
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem("userRole", response.data.user.role);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.user)
      );

      alert("Google Sign In Successful!");
      navigate("/dashboard");

    } catch (err) {
      console.error("Backend post failed:", err);
      alert("Backend connection failed.");
    }

  } catch (error) {
    console.error("Google Auth Error:", error);
    alert(error.message);
  }
};




  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 999999,
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "35px",
          background: "black",
          color: "white",
          borderRadius: "20px",
          boxSizing: "border-box",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0 0 15px" }}>Login</h1>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "white",
              color: "black",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            border: "none",
            borderRadius: "8px",
            background: "#4285F4",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "../../utils/axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();


  // =========================
  // NORMAL LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();


    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }


    try {
      // Backend se user information fetch/create
      const response = await axios.post("/api/user", {
        email: email,
        name: email.split("@")[0],
      });


      console.log("Normal Login Response:", response.data);


      const user = response.data.user;


      if (!user) {
        alert("User information not found.");
        return;
      }


      if (!user._id) {
        console.error("MongoDB user ID missing:", user);
        alert("User ID not found.");
        return;
      }


      // =========================
      // SAVE USER INFORMATION
      // =========================


      localStorage.setItem(
        "isLoggedIn",
        "true"
      );


      localStorage.setItem(
        "userEmail",
        user.email
      );


      localStorage.setItem(
        "userRole",
        user.role
      );


      localStorage.setItem(
        "userInfo",
        JSON.stringify(user)
      );


      console.log(
        "USER INFO SAVED:",
        JSON.parse(
          localStorage.getItem("userInfo")
        )
      );


      alert("Sign in successful!");


      navigate("/dashboard");


    } catch (error) {
      console.error("Normal Login Error:", error);


      if (error.response) {
        console.error(
          "Backend Error:",
          error.response.data
        );
      }


      alert(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };


  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {
      // Firebase Google authentication
      const result = await signInWithPopup(
        auth,
        provider
      );


      console.log(
        "Google User:",
        result.user
      );


      // =========================
      // BACKEND API
      // =========================


      const response = await axios.post(
        "/api/user",
        {
          email: result.user.email,
          uid: result.user.uid,
          name: result.user.displayName,
        }
      );


      console.log(
        "Backend response:",
        response.data
      );


      const user = response.data.user;


      // =========================
      // CHECK USER
      // =========================


      if (!user) {
        alert(
          "User information not found."
        );
        return;
      }


      if (!user._id) {
        console.error(
          "MongoDB ID missing:",
          user
        );


        alert(
          "User ID not found in backend response."
        );


        return;
      }


      // =========================
      // SAVE LOGIN DATA
      // =========================


      localStorage.setItem(
        "isLoggedIn",
        "true"
      );


      localStorage.setItem(
        "userEmail",
        user.email
      );


      localStorage.setItem(
        "userRole",
        user.role
      );


      // VERY IMPORTANT
      // Complete user object save karo
      localStorage.setItem(
        "userInfo",
        JSON.stringify(user)
      );


      // =========================
      // VERIFY LOCAL STORAGE
      // =========================


      const savedUser = JSON.parse(
        localStorage.getItem("userInfo")
      );


      console.log(
        "USER INFO SAVED:",
        savedUser
      );


      console.log(
        "USER ID:",
        savedUser._id
      );


      console.log(
        "USER ROLE:",
        savedUser.role
      );


      alert(
        "Google Sign In Successful!"
      );


      navigate("/dashboard");


    } catch (error) {
      console.error(
        "Google Auth Error:",
        error
      );


      if (error.response) {
        console.error(
          "Backend Error:",
          error.response.data
        );
      }


      alert(
        error.response?.data?.message ||
        error.message ||
        "Google login failed."
      );
    }
  };


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter:
          "blur(10px)",
        zIndex: 999999,
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "35px",
          background: "black",
          color: "white",
          borderRadius: "20px",
          boxSizing: "border-box",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "0 0 15px",
          }}
        >
          Login
        </h1>


        {/* =========================
            NORMAL LOGIN
        ========================= */}


        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
            }}
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              boxSizing: "border-box",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
            }}
          />


          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "white",
              color: "black",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>


        {/* =========================
            GOOGLE LOGIN
        ========================= */}


        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            border: "none",
            borderRadius: "8px",
            background: "#4285F4",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};


export default Login;

