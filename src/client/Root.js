import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import { AuthProvider } from "../components/AuthContext"


const Root = () => (
  <BrowserRouter>
    <AuthProvider>

    <App />
    </AuthProvider>

  </BrowserRouter>
);

export default Root;
