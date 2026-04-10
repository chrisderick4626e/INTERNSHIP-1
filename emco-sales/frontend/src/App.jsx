import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  return (
    <>
      {/* Animated gradient top line */}
      <div className="accent-line" />
      <Header />
      <Home />
      <Footer />
    </>
  );
}
