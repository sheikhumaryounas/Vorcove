import { Icon } from './Icons.jsx';
import { images, reasons } from '../data/content.js';

export default function Why() {
  return (
    <section className="why on-dark" id="why">
      <div className="why-bg"><img src={images.why} alt="" loading="lazy" /></div>
      <div className="wrap">
        <div className="why-top">
          <div>
            <span className="eyebrow rv">Why Vorcove</span>
            <h2 className="h2 rv d1">Built around your business,<br />not ours.</h2>
          </div>
          <p className="lead rv d2">We're measured by one thing: whether your business makes more money.</p>
        </div>
        <div className="why-grid rv">
          {reasons.map((r, i) => (
            <div key={r.title} className="why-item">
              <span className="n">0{i + 1}</span>
              <span className="ic"><Icon name={r.icon} /></span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
