'use client';
import CtaArea from "./cta-area";
import FaqArea from "./faq-area";
import HeaderTwo from "@/Layouts/header-2";
import HeroArea from "./hero-area";
import PaymentArea from "./payment-area";
import PaymentMethodArea from "./payment-method-area";
import ServiceArea from "./service-area";
import OpenAccountArea from "./open-account-area";
import TestimonialArea from "./testimonial-area";
import FooterTwo from "@/Layouts/footer-2";

const HomeTwo = () => {
  return (
    <>
      <HeaderTwo />
      <div id="smooth-wrapper">
      <div id="smooth-content">
      <main className="fix">
        <HeroArea />
        <PaymentArea />
        <PaymentMethodArea />
        <ServiceArea />
        <OpenAccountArea />
        <TestimonialArea />
        <FaqArea />
        <CtaArea />
      </main>
      <FooterTwo />
      </div>
      </div>
    </>
  );
};

export default HomeTwo;
