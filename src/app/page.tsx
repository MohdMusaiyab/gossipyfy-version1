"use client";
import React, { useRef } from "react";
import Hero from "./components/General/Hero";
import Features from "./components/General/Features";
import About from "./components/General/About";
import PriceSection from "./components/General/PriceSection";

const Page = () => {
  const aboutSectionRef = useRef(null);
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Hero scrollToAbout={scrollToAbout} />
      <div ref={aboutSectionRef}>
        <About />
      </div>
      <Features />
      <PriceSection />
    </div>
  );
};

export default Page;
