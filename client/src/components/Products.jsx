import { useEffect, useRef, useState } from 'react';
import { Arrow, Use, glyphs } from './Icons.jsx';
import { products } from '../data/content.js';
import { playVideo, reduceMotion } from '../lib/motion.js';

// only one product video plays sound at a time
const SOUND_EVENT = 'vorcove:sound';

export default function Products() {
  return (
    <section className="products on-dark" id="products">
      <div className="wrap">
        <div className="prod-intro">
          <div>
            <span className="eyebrow rv">Our products</span>
            <h2 className="h2 rv d1">Revenue systems,<br />already at work.</h2>
          </div>
          <p className="lead rv d2">Products built on the same idea as every Vorcove project: take the work that slows a business down and turn it into revenue. Watch them in action.</p>
        </div>
        <div className="prod-switch rv d2">
          {products.map(p => <a key={p.id} href={`#${p.id}`}><i style={{ background: p.dot }} />{p.switchLabel}</a>)}
        </div>
      </div>

      {products.map(p => <Product key={p.id} p={p} />)}
    </section>
  );
}

function Product({ p }) {
  return (
    <article className={`prod ${p.id}`} id={p.id}>
      <div className="wrap">
        <div className="prod-head">
          <div>
            <div className="prod-badges rv">
              <span className="b1"><i />{p.status}</span>
              {p.badges.map(b => <span key={b}>{b}</span>)}
            </div>
            <h3 className="prod-name rv d1">{p.name}</h3>
            <p className="prod-tagline rv d1">{p.tagline}</p>
            <p className="lead rv d2">{p.text}</p>
            <div className="prod-actions rv d3">
              <a href="#contact" className="btn btn-mint">Book a demo <Arrow /></a>
              {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Try it live <Use id="arrow-ne" /></a>}
            </div>
          </div>
          <ol className="feats rv d2">
            {p.features.map(([title, text]) => <li key={title}><div><b>{title}</b><span>{text}</span></div></li>)}
          </ol>
        </div>
        <div className="stage">
          <VideoFrame p={p} />
        </div>
      </div>
    </article>
  );
}

// product walkthrough: plays while on screen, with play/pause, sound and full-screen controls
function VideoFrame({ p }) {
  const frame = useRef(null);
  const video = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = video.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!userPaused.current && !reduceMotion) playVideo(v); }
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(frame.current);

    const onOtherSound = e => {
      if (e.detail !== p.id) { v.muted = true; setMuted(true); }
    };
    window.addEventListener(SOUND_EVENT, onOtherSound);
    return () => { io.disconnect(); window.removeEventListener(SOUND_EVENT, onOtherSound); };
  }, [p.id]);

  const togglePlay = () => {
    const v = video.current;
    if (v.paused) { userPaused.current = false; playVideo(v); }
    else { userPaused.current = true; v.pause(); }
  };

  const toggleSound = () => {
    const v = video.current;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: p.id }));
      if (v.paused) { userPaused.current = false; playVideo(v); }
    }
  };

  const fullScreen = () => {
    const v = video.current;
    const req = v.requestFullscreen || v.webkitRequestFullscreen || v.webkitEnterFullscreen;
    if (req) req.call(v);
  };

  return (
    <div className="frame" data-zoom ref={frame}>
      <div className="frame-bar"><span className="dots"><i /><i /><i /></span><span className="url">{p.url}</span><span className="sp" /></div>
      <div className="screen">
        <video
          ref={video} muted playsInline loop preload="metadata" poster={p.poster}
          aria-label={`${p.name} product walkthrough video`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={e => { const v = e.currentTarget; setProgress(v.duration ? v.currentTime / v.duration * 100 : 0); }}
        >
          <source src={p.video} type="video/mp4" />
        </video>
        <div className="vctrl">
          <button type="button" aria-label={playing ? 'Pause video' : 'Play video'} onClick={togglePlay}>
            {playing ? glyphs.pause : glyphs.play}<span>{playing ? 'Pause' : 'Play'}</span>
          </button>
          <button type="button" aria-label={muted ? 'Turn sound on' : 'Turn sound off'} onClick={toggleSound}>
            {muted ? glyphs.soundOff : glyphs.soundOn}<span>{muted ? 'Sound off' : 'Sound on'}</span>
          </button>
          <button type="button" aria-label="Watch full screen" onClick={fullScreen}>
            {glyphs.full}<span>Full screen</span>
          </button>
        </div>
        <div className="vprog"><i style={{ width: `${progress}%` }} /></div>
      </div>
    </div>
  );
}
