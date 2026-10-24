import { Icon } from './Icons.jsx';
import { engagement } from '../data/content.js';

export default function Engagement() {
  return (
    <section className="engage" id="engage">
      <div className="wrap">
        <div className="eng-head">
          <span className="eyebrow rv">How engagements work</span>
          <h2 className="h2 rv d1">Simple, scoped and transparent.</h2>
          <p className="lead rv d2">Each project is scoped after the revenue review: a one-time build fee, with an optional monthly plan for support and improvements.</p>
        </div>
        <div className="eng-grid">
          {engagement.map((e, i) => (
            <div key={e.title} className={`eng${e.featured ? ' feat' : ''} rv${i ? ` d${i}` : ''}`}>
              <div className="top"><small>Step {i + 1}</small><span className="ic"><Icon name={e.icon} /></span></div>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
              {e.optional && <span className="opt">Optional</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
