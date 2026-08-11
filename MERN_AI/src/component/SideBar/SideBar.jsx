/**import styles from './SideBar.module.css'
import ArticleIcon from '@mui/icons-material/Article'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";


function SideBar() {

    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);

    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    };

  return (
    <div className={styles.sideBar}>

      <div className={styles.sideBarIcon}>
        <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />

        <div className={styles.sideBarTopContent}>
          Resume Screening
        </div>
      </div>

      <Link to="/dashboard" className={[styles.sideBarOptions,location.pathname === '/dashboard'?styles.selectedOption:null].join(' ')}>
        <DashboardIcon />
        <div>Dashboard</div>
      </Link>

      <Link to="/history" className={[styles.sideBarOptions,location.pathname === '/history'?styles.selectedOption:null].join(' ')}>
        <ManageSearchIcon />
        <div>History</div>
      </Link>

      <Link to="/admin" className={[styles.sideBarOptions,location.pathname === '/admin'?styles.selectedOption:null].join(' ')}>
        <AdminPanelSettingsIcon />
        <div>Admin</div>
      </Link>

      <div className={styles.sideBarOptions}
        onClick={handleLogout}
      >
        <LogoutIcon />
        <div>Logout</div>
      </div>

    </div>
  )
}

export default SideBar**/

import styles from "./SideBar.module.css";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation, useNavigate } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Login.jsx me "userInfo" save ho raha hai
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // Admin check
  const isAdmin =
    user?.role === "admin" ||
    user?.email?.toLowerCase() === "admin@gmail.com";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className={styles.sideBar}>
      <div className={styles.sideBarIcon}>
        <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />
        <div className={styles.sideBarTopContent}>
          Resume Screening
        </div>
      </div>

      <Link
        to="/dashboard"
        className={[
          styles.sideBarOptions,
          location.pathname === "/dashboard"
            ? styles.selectedOption
            : "",
        ].join(" ")}
      >
        <DashboardIcon />
        <div>Dashboard</div>
      </Link>

      <Link
        to="/history"
        className={[
          styles.sideBarOptions,
          location.pathname === "/history"
            ? styles.selectedOption
            : "",
        ].join(" ")}
      >
        <ManageSearchIcon />
        <div>History</div>
      </Link>

      {isAdmin && (
        <Link
          to="/admin"
          className={[
            styles.sideBarOptions,
            location.pathname === "/admin"
              ? styles.selectedOption
              : "",
          ].join(" ")}
        >
          <AdminPanelSettingsIcon />
          <div>Admin</div>
        </Link>
      )}

      <div
        className={styles.sideBarOptions}
        onClick={handleLogout}
      >
        <LogoutIcon />
        <div>Logout</div>
      </div>
    </div>
  );
}

export default SideBar;