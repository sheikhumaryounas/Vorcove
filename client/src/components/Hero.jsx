import { useEffect, useRef, useState } from 'react';
import { Arrow } from './Icons.jsx';
import { slides } from '../data/content.js';
import { playVideo, reduceMotion } from '../lib/motion.js';

const SLIDE_MS = 7000;

const Line = ({ parts }) => (
  <span className="ln"><span>{parts.map((p, i) => (typeof p === 'string' ? p : <em key={i}>{p.em}</em>))}</span></span>
);

export default function Hero() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(reduceMotion);
  // bumped on every change so the progress bar animation restarts
  const [cycle, setCycle] = useState(0);
  const videos = useRef([]);

  const go = i => {
    setCur((i + slides.length) % slides.length);
    setCycle(c => c + 1);
  };

  // play the active slide's video, pause the rest (later videos load only when first shown)
  useEffect(() => {
    videos.current.forEach((v, k) => {
      if (!v) return;
      if (k === cur) {
        if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
        paused ? v.pause() : playVideo(v);
      } else v.pause();
    });
  }, [cur, paused]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(cur + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [cur, paused, cycle]);

  const togglePause = () => {
    setPaused(p => !p);
    setCycle(c => c + 1);
  };

  return (
    <section className={`hero${paused ? ' paused' : ''}`} id="top" aria-roledescription="carousel" aria-label="Highlights">
      {slides.map((s, i) => {
        const Heading = i === 0 ? 'h1' : 'h2';
        return (
          <div key={s.tag} className={`slide${i === cur ? ' active' : ''}`} aria-hidden={i !== cur}>
            <video ref={el => (videos.current[i] = el)} muted loop playsInline preload={i === 0 ? 'auto' : 'none'} poster={s.poster}>
              <source src={s.video} type="video/mp4" />
            </video>
            <div className="wrap slide-inner">
              <div className="slide-copy">
                <span className="tag"><i />{s.tag}</span>
                <Heading>{s.lines.map((l, k) => <Line key={k} parts={l} />)}</Heading>
                <p>{s.text}</p>
                <div className="actions">
                  <a href={s.primary.href} className="btn btn-mint" tabIndex={i === cur ? 0 : -1}>{s.primary.label} <Arrow /></a>
                  <a href={s.secondary.href} className="btn btn-ghost" tabIndex={i === cur ? 0 : -1}>{s.secondary.label}</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-nav">
        <div className="wrap">
          {slides.map((s, i) => (
            <button key={s.tag} className={`hn${i === cur ? ' active' : ''}`} type="button" aria-label={`Slide ${i + 1}: ${s.nav}`} onClick={() => go(i)}>
              <span className="prog"><i key={i === cur ? cycle : 'idle'} /></span>
              <small>0{i + 1}</small><b>{s.nav}</b>
            </button>
          ))}
          <div className="hero-ctrl">
            <button type="button" aria-label="Previous slide" onClick={() => go(cur - 1)}><Arrow style={{ transform: 'rotate(180deg)' }} /></button>
            <button type="button" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={togglePause}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {paused
                  ? <path d="M5 3l8 5-8 5z" fill="currentColor" />
                  : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
              </svg>
            </button>
            <button type="button" aria-label="Next slide" onClick={() => go(cur + 1)}><Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
