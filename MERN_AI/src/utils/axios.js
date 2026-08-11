/**import axios from'axios';

const instance= axios.create ({
    baseURL: "https://resume-ai-backend-xn0l.onrender.com",
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
})

export default instance;**/


import axios from "axios";

const instance = axios.create({
  baseURL: "https://resume-ai-backend-xn0l.onrender.com",
  /**timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },**/
});

export default instance;
