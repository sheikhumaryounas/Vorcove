import { useEffect, useRef, useState } from 'react';
import { images, steps } from '../data/content.js';

export default function Process() {
  const dots = useRef([]);
  const [last, setLast] = useState(-1);
  const [fill, setFill] = useState(0);

  // the progress line fills as each step's dot passes 60% of the screen height
  useEffect(() => {
    const paint = () => {
      const mid = window.innerHeight * 0.6;
      const tops = dots.current.map(d => d.getBoundingClientRect().top);
      let on = -1;
      tops.forEach((t, i) => { if (t < mid) on = i; });
      setLast(on);
      setFill(on >= 0 ? Math.max(0, tops[on] - tops[0]) : 0);
    };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    return () => { window.removeEventListener('scroll', paint); window.removeEventListener('resize', paint); };
  }, []);

  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="proc-media rv">
          <div className="img">
            <img src={images.process} alt="A team reviewing charts and documents together" loading="lazy" />
            <div className="cap"><small>Every project starts here</small><b>One conversation about where your revenue could grow.</b></div>
          </div>
        </div>
        <div>
          <span className="eyebrow rv">How we work</span>
          <h2 className="h2 rv d1">Four steps, measured in revenue.</h2>
          <div className="steps">
            <span className="fill" style={{ height: fill }} />
            {steps.map((s, i) => (
              <div key={s.title} className={`step${i <= last ? ' on' : ''}`}>
                <span className="dot" ref={el => (dots.current[i] = el)}>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="get"><b>You get</b> {s.get}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
