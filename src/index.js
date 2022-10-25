import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { GlobalLayout } from "./components/Layout";
import Dashboard from "./views/dashboard";
import Home from "./views/home";
import Donations from "./views/donations";
import Channel from "./views/donations/components/Channel";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<GlobalLayout />}>
        <Route index element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/donations" element={<Donations />} />
        <Route exact path="/donations/:id" element={<Channel />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  </HashRouter>
);

reportWebVitals();
