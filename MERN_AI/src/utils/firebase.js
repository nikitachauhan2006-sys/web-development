import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUJlyGQQvhE9myNgckVFq5lfIYv_OnKtQ",
  authDomain: "mernai-76bb4.firebaseapp.com",
  projectId: "mernai-76bb4",
  storageBucket: "mernai-76bb4.firebasestorage.app",
  messagingSenderId: "330613671609",
  appId: "1:330613671609:web:86effbf5b71f278d3d7d68",
  measurementId: "G-SS5B6V88D4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider };