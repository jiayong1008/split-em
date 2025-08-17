import { Link } from '@inertiajs/react';
import React from "react";
import ArrowLine from '@/svg/arrow-line';
import RoundLine from '@/svg/round-line';
import useCharAnimation from '@/hooks/useCharAnimation';


// img import 
const scroll_bg = "/images/placeholder.svg";
const users_img = "/images/placeholder.svg";
const hero_shape_1 = "/images/placeholder.svg";
const hero_shape_2 = "/images/placeholder.svg";
const hero_shape_3 = "/images/placeholder.svg";
const hero_shape_4 = "/images/placeholder.svg";
const hero_shape_5 = "/images/placeholder.svg";

// hero_content
const hero_content = {
  bg_img: "/images/placeholder.svg",
  scroll_btn: "Scroll Down",
  title: <><i><i className="child-1">The next</i> </i>{" "}
  <i><i className="child-1">generation</i> </i>{" "}
  <i><i className="child-1">payment</i> </i>{" "}
  <i><i className="child-1">ways.</i></i>
  </>,
  btn_text: "Get Started For Free",
  sub_title: <>Over<span>5Ok+ Client</span> all over the world</>,
  
}
const {
  bg_img, 
  scroll_btn,
  title,
  btn_text,
  sub_title, 
} = hero_content;


const HeroArea = () => {
  return (
    <section className="py-24 text-center" style={{ backgroundColor: '#0b1020', color: 'white' }}>
      <h1 className="text-3xl font-bold">Hero minimal OK</h1>
      <p className="opacity-80">We will re-enable sections step by step.</p>
    </section>
  );
};

export default HeroArea;