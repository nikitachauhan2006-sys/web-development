/**import React from 'react'
import styles from'./Admin.module.css';
import { Skeleton } from "@mui/material";

const Admin = () => {
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>

        
      <Skeleton 
        variant= "rectangular"
        width= {266}
        height={400}
        sx={{ borderRadius: "20px"}}
        />

        <div className={styles.AdminCard}>
          <h2>Frontend Developer</h2>
          <p style={{ color: "blue"}}>liam@gmail.com</p>
          <h3>Score : 50%</h3>
          <p>Your resume demonstrates strong frontend development skills with expertise in HTML, CSS, JavaScript, and React.js. The projects showcase responsive design and clean UI implementation. To improve your ATS score further, include TypeScript, API integration, state management (Redux), and performance optimization techniques. Adding deployment links and quantifiable project outcomes will make your resume more competitive.</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Full Stack Developer</h2>
          <p style={{ color: "blue"}}>willaim@gmail.com</p>
          <h3>Score : 40%</h3>
          <p>Your profile reflects a solid understanding of both frontend and backend development using React, Node.js, Express.js, and MongoDB. The resume effectively presents full-stack projects and database knowledge. To strengthen your application, include authentication systems, cloud deployment (AWS or Azure), Docker, CI/CD pipelines, and scalable architecture experience.</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Python Developer</h2>
          <p style={{ color: "blue"}}>michael@gmail.com</p>
          <h3>Score : 70%</h3>
          <p>The resume highlights good programming fundamentals in Python, object-oriented programming, SQL, and scripting. The projects demonstrate logical thinking and problem-solving abilities. To achieve a higher ATS score, consider adding Django or Flask applications, REST API development, automated testing, and data processing projects.</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Java Developer</h2>
          <p style={{ color: "blue"}}>james@gmail.com</p>
          <h3>Score : 80%</h3>
          <p>Your resume showcases a strong foundation in Java programming, object-oriented concepts, collections, and database connectivity. The project experience reflects practical coding skills. To improve your profile, include Spring Boot, Hibernate, Microservices, Maven, and JUnit testing, as these are commonly required in enterprise Java development.</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Data Analyst</h2>
          <p style={{ color: "blue"}}>andrew@gmail.com</p>
          <h3>Score : 69%</h3>
          <p>Your resume demonstrates analytical thinking and experience with SQL, Excel, Power BI, and Python. The projects effectively showcase data visualization and reporting skills. To strengthen your profile, add machine learning basics, advanced dashboard projects, statistical analysis, and measurable business insights generated from your work.</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>UI/UX Designer</h2>
          <p style={{ color: "blue"}}>nicholas@gmail.com</p>
          <h3>Score : 87%</h3>
          <p>Your portfolio highlights proficiency in Figma, wireframing, prototyping, and user-centered design principles. The resume demonstrates creativity and design consistency. To further enhance your application, include usability testing, accessibility standards (WCAG), design systems, and case studies explaining your complete design process.</p>
        </div>

        <div className={styles.AdminCard}>
          <h2>Machine Learning</h2>
          <p style={{ color: "blue"}}>daniel@gmail.com</p>
          <h3>Score : 95%</h3>
          <p>Your resume demonstrates a strong understanding of machine learning concepts, Python, TensorFlow, Scikit-learn, and model evaluation techniques. The listed projects showcase practical implementation of predictive models. To further improve your ATS score, include MLOps workflows, model deployment, cloud-based AI services, real-world datasets, and measurable project impact.</p>
        </div>

      </div>
    </div>
  )
}

export default Admin**/

import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { Skeleton } from "@mui/material";
import axios from "../../utils/axios";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchAllHistory = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/api/resume/get/admin");

        console.log("Admin API Response:", response.data);

        if (response.data && response.data.resumes) {
          setResumes(response.data.resumes);
        } else {
          setResumes([]);
        }
      } catch (error) {
        console.error("Admin History Error:", error);

        if (error.response) {
          console.log(error.response.data);
        }

        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHistory();
  }, []);

  return (
  <div className={styles.Admin}>
    <div className={styles.AdminBlock}>

      {loading ? (

        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={266}
            height={400}
            sx={{ borderRadius: "20px" }}
          />
        ))

      ) : resumes.length > 0 ? (

        resumes.map((item) => (
          <div className={styles.AdminCard} key={item._id}>

            <h2>{item.job_desc}</h2>

            <p style={{ color: "blue" }}>
              {item.user?.email || "No Email"}
            </p>

            <p>
              <strong>Name :</strong> {item.user?.name || "Unknown User"}
            </p>

            <p>
              <strong>Resume Name :</strong> {item.resume_name}
            </p>

            <h3>Score : {item.score}%</h3>

            <p>{item.feedback}</p>

            <p>
              <strong>Date :</strong>{" "}
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

          </div>
        ))

      ) : (

        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginTop: "40px",
          }}
        >
          No Resume History Found
        </div>

      )}

    </div>
  </div>
);

};

  export default Admin;