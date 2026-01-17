import React from "react";
import Home from "../components/Home";
import About from "../components/About";
import PortFolio from "../components/PortFolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Home />
      <About />
      <PortFolio />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
