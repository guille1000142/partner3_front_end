import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { GlobalLayout } from "./components/Layout";
import Dashboard from "./views/dashboard";
import Home from "./views/home";
import Donations from "./views/donations";
import Channel from "./views/donations/components/Channel";
// import Features from "./views/features";
// import Works from "./views/works";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/donations/:id" element={<Channel />} />
        {/* <Route path="/features" element={<Features />} />
        <Route path="/works" element={<Works />} /> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
