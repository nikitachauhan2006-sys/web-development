import React, { useState, useEffect } from "react";
import Styles from "./History.module.css";
import { Skeleton } from "@mui/material";
import axios from "../../utils/axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo =
    JSON.parse(localStorage.getItem("userInfo")) || {};

  const isAdmin = userInfo.role === "admin";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        let response;

        if (isAdmin) {
          // Admin → sabhi users ki history
          response = await axios.get("/api/resume/get/admin");
        } else {
          // Normal user → sirf apni history
          if (!userInfo._id) {
            console.error("User ID not found");
            setHistory([]);
            return;
          }

          response = await axios.get(
            `/api/resume/get/${userInfo._id}`
          );
        }

        console.log("History API Response:", response.data);

        setHistory(response.data.resumes || []);
      } catch (error) {
        console.error("History fetch error:", error);

        if (error.response) {
          console.error(
            "Backend error:",
            error.response.data
          );
        }

        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isAdmin, userInfo._id]);

  return (
    <div className={Styles.History}>
      <div className={Styles.HistoryCardBlock}>

        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={266}
              height={200}
              sx={{ borderRadius: "20px" }}
            />
          ))
        ) : history.length > 0 ? (
          history.map((item, index) => (
            <div
              className={Styles.HistoryCard}
              key={item._id || index}
            >

              <div className={Styles.CardPercentage}>
                {item.score}%
              </div>

              <h2>
                {item.job_desc}
              </h2>

              <p>
                <strong>Resume Name:</strong>{" "}
                {item.resume_name}
              </p>

              {item.feedback && (
                <p>{item.feedback}</p>
              )}

              <p>
                <strong>Date:</strong>{" "}
                {item.createdAt
                  ? new Date(
                      item.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* Admin ko user information */}
              {isAdmin && item.user && (
                <p>
                  <strong>User:</strong>{" "}
                  {item.user.name || "Unknown"}{" "}
                  ({item.user.email || "No email"})
                </p>
              )}

            </div>
          ))
        ) : (
          <p>No resume history found.</p>
        )}

      </div>
    </div>
  );
};

export default History;

