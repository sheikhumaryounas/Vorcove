import { useEffect, useRef } from 'react';
import { Arrow } from './Icons.jsx';
import { EMAIL, band } from '../data/content.js';
import { playVideo } from '../lib/motion.js';

export default function CtaBand() {
  const video = useRef(null);

  // the background video loads and plays only while the band is on screen
  useEffect(() => {
    const v = video.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
        playVideo(v);
      } else v.pause();
    }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="band on-dark" aria-label="Your business next">
      <video ref={video} muted loop playsInline preload="none" poster={band.poster}>
        <source src={band.video} type="video/mp4" />
      </video>
      <div className="wrap">
        <span className="eyebrow rv" style={{ justifyContent: 'center' }}>Your business next</span>
        <h2 className="rv d1">Every Vorcove project starts with one conversation.</h2>
        <p className="lead rv d2">A conversation about where your revenue could grow.</p>
        <div className="actions rv d3">
          <a href="#contact" className="btn btn-mint">Book a call <Arrow /></a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">{EMAIL}</a>
        </div>
      </div>
    </section>
  );
}
