import { useEffect, useRef, useState } from 'react';
import { reduceMotion } from '../lib/motion.js';

// counts from 0 to `to` the first time the number scrolls into view
export default function CountUp({ to }) {
  const [n, setN] = useState(reduceMotion ? to : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = t => {
        const p = Math.min((t - t0) / 1400, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);

  return <span ref={ref}>{n}</span>;
}
