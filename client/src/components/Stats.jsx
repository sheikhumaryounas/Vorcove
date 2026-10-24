import CountUp from './CountUp.jsx';
import { stats } from '../data/content.js';

const delay = i => (i ? ` d${i}` : '');

export default function Stats() {
  return (
    <section className="stats" aria-label="Vorcove in numbers">
      <div className="wrap">
        {stats.map((s, i) => (
          <div key={s.label} className={`stat rv${delay(i)}`}>
            <b><CountUp to={s.value} />{s.unit && <small>{s.unit}</small>}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
