import React from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import HomeSlider from "@/components/Banner/HomeSlider";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import Events from "@/components/Events";
import TravelInfo from "@/components/TravelInfo";
import Share from "@/components/Share";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import BackToTop from "@/components/layout/backToTop";
import ChatPopup from "@/components/layout/chatPopup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Banner />
      <Hero />
      <HomeSlider slideLinks={["/tour/tour01", "/tour/tour02", "/tour/tour03"]} />
      <Experiences />
      <Events />
      <TravelInfo />
      <Share />
      <Partners />
      <Footer />
      <BackToTop />
      <ChatPopup />
    </div>
  );
}
