import React, { useState } from "react";
import Styles from "./Dashboard.module.css";
import axios from "../../utils/axios";
import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadFileText, setUploadFileText] = useState("Upload Resume");
  const [jobDesc, setJobDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload PDF file only");
      e.target.value = "";
      return;
    }

    setResumeFile(file);
    setUploadFileText(file.name);

    console.log("Resume File :", file);
  };

  const handleUpload = async () => {
    if (!resumeFile || !jobDesc.trim()) {
      alert("Please fill Job Description and upload Resume");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      alert("User information not found. Please login again.");
      return;
    }

    console.log("USER INFO :", userInfo);
    console.log("USER ID :", userInfo._id);

    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("job_desc", jobDesc);
    formData.append("user", userInfo._id);

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "/api/resume/addResume",
        formData
      );

      console.log("Resume API Response :", response.data);

      setResult(response.data);

      const history =
        JSON.parse(localStorage.getItem("history")) || [];

      history.unshift({
        id: Date.now(),
        resumeName: resumeFile.name,
        jobRole: jobDesc,
        atsScore: response.data.atsScore,
        feedback: response.data.feedback,
        date: new Date().toLocaleDateString(),
      });

      localStorage.setItem(
        "history",
        JSON.stringify(history)
      );
    } catch (err) {
      console.error("Resume upload failed :", err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Resume upload failed");
    } finally {
      setLoading(false);
    }
  };  

    return (
    <div className={Styles.Dashboard}>

      

      <div className={Styles.DashboardLeft}>

        <div className={Styles.DashboardHeader}>

          <div className={Styles.DashboardHeaderTitle}>
            Smart Resume Screening
          </div>

          <div className={Styles.titleRow}>
            <div className={Styles.DashboardHeaderLargeTitle}>
              Smart Match Resume
            </div>

            <div className={Styles.codingTitle}>
              Coding
            </div>
          </div>

        </div>

        <div className={Styles.alertInfo}>

          <div className={Styles.alertTitle}>
            🔔 Important Instructions
          </div>

          <div className={Styles.dashboardInstructions}>
            <div>
              📄 Upload Resume in PDF format only.
            </div>

            <div>
              📝 Paste complete Job Description.
            </div>

            <div>
              🤖 Click Analyse to generate ATS Score.
            </div>
          </div>

        </div>

       

        <div className={Styles.DashboardUploadResume}>

          <div className={Styles.DashboardUploadResumeBlock}>
            {resumeFile
              ? resumeFile.name
              : "No Resume Selected"}
          </div>

          <div className={Styles.DashboardInputField}>

            <label
              htmlFor="resume"
              className={Styles.analyzeAIBtn}
            >
              {uploadFileText}
            </label>

            <input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />

          </div>

        </div>

       

        <div className={Styles.jobDesc}>

          <textarea
            className={Styles.textArea}
            placeholder="Paste Job Description..."
            value={jobDesc}
            onChange={(e) =>
              setJobDesc(e.target.value)
            }
          />

          <button
            className={Styles.AnalyzeBtn}
            onClick={handleUpload}
          >
            Analyse
          </button>

        </div>

      </div>

      

      <div className={Styles.DashboardRight}>

        

        <div className={Styles.DashboardRightTopCard}>

          <img
            className={Styles.profileImg}
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
          />

          <div className={Styles.profileName}>
            Liam Parker
          </div>

        </div>

        

        {loading && (
          <div className={Styles.resultBox}>

            <Skeleton
              variant="text"
              height={40}
            />

            <Skeleton
              variant="rectangular"
              height={120}
            />

            <Skeleton
              variant="text"
              height={30}
            />

            <Skeleton
              variant="text"
              height={30}
            />

          </div>
        )}

        

        {!loading && result && (

          <div className={Styles.resultBox}>

            <h2>ATS Result</h2>

            <div className={Styles.scoreCard}>

              <span className={Styles.scoreLabel}>
                ATS Score
              </span>

              <span className={Styles.scoreValue}>
                {result.atsScore}%
              </span>

            </div>

            <p className={Styles.resultStatus}>
              {result.feedback}
            </p>

            {result.matchedKeywords && (
              <>

                <h4>Matched Keywords</h4>

                <div className={Styles.tagContainer}>

                  {result.matchedKeywords.map(
                    (item, index) => (
                      <span
                        key={index}
                        className={Styles.matchTag}
                      >
                        {item}
                      </span>
                    )
                  )}

                </div>

              </>
            )}

            {result.missingKeywords && (
              <>

                <h4
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Missing Keywords
                </h4>

                <div className={Styles.tagContainer}>

                  {result.missingKeywords.map(
                    (item, index) => (
                      <span
                        key={index}
                        className={Styles.missingTag}
                      >
                        {item}
                      </span>
                    )
                  )}

                </div>

              </>
            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;