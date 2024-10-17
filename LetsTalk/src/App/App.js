import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import RegisterScreen from "../RegisterScreen/RegisterScreen.js";
import Login from "../Login/Login.js";
import ChatScreen from "../ChatScreen/ChatScreen.js";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setCurrentUser={setCurrentUser} setToken={setToken} token={token} />} />
        <Route path="/Register" element={<RegisterScreen />} />
        <Route path="/Chat" 
        element={
          currentUser ? (
            <ChatScreen currentUser={currentUser} setCurrentUser={setCurrentUser} />
          ) : (
            <Navigate to="/" />
          )
        } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
