/*import "./App.css";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./component/Dashboard/Dashboard";
import History from "./component/History/History";
import Admin from "./component/Admin/Admin";
import Login from "./component/Login/Login";
import Layout from "./component/Layout/Layout";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;*/

import "./App.css";

import { Routes, Route } from "react-router-dom";

import Dashboard from "./component/Dashboard/Dashboard";
import History from "./component/History/History";
import Admin from "./component/Admin/Admin";
import Login from "./component/Login/Login";
import Layout from "./component/Layout/Layout";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* History */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Route>

    </Routes>
  );
}

export default App;

