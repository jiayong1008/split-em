'use client';
import React, { useEffect } from "react";
import {gsap} from "gsap";
// internal
import ScrollToTop from "@/hooks/scroll-to-top";
import { wowAnimation } from "@/utils/utils"; 
import { ScrollTrigger } from 'gsap/ScrollTrigger';


if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap").catch(() => {});
}

const Wrapper = ({ children }) => {
  useEffect(() => {
    // animation
    setTimeout(() => {
      wowAnimation();
    }, 100);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);


  return (
    <>
      {children}
      <ScrollToTop />
    </>
  );
};

export default Wrapper;
