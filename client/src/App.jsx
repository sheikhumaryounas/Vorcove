import { useEffect, useState } from 'react';
import { Sprite } from './components/Icons.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Industries from './components/Industries.jsx';
import Products from './components/Products.jsx';
import Process from './components/Process.jsx';
import Engagement from './components/Engagement.jsx';
import Why from './components/Why.jsx';
import Faq from './components/Faq.jsx';
import CtaBand from './components/CtaBand.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { startReveal, startScrollEffects, startSmoothScroll } from './lib/motion.js';

export default function App() {
  // the industry shown in the Industries section; the header menu can change it too
  const [industry, setIndustry] = useState(0);

  useEffect(() => {
    const stops = [startSmoothScroll(), startReveal(), startScrollEffects()];
    return () => stops.forEach(stop => stop());
  }, []);

  return (
    <>
      <Sprite />
      <Header onIndustry={setIndustry} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Industries active={industry} onChange={setIndustry} />
        <Products />
        <Process />
        <Engagement />
        <Why />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
