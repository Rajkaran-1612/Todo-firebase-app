import React, { useState } from "react";
import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword"
import ProfilePic from "./ProfilePic";
import UpdateProfile from "./UpdateProfile";

function App() {

  const [userId, setUserId] = useState("");

  const getUserIdHandler =(id) => {
    console.log("User Id is: ", id)
    setUserId(id);
  }

  return (
    
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path='/' element= { <PrivateRoute><Dashboard getUserId={getUserIdHandler} /></PrivateRoute>}/>
                <Route path='/update-profile' element= { <PrivateRoute><UpdateProfile id={userId} setUserId={setUserId} /></PrivateRoute>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/profile-pic" element={<PrivateRoute><ProfilePic /></PrivateRoute>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  )
}

export default App;
