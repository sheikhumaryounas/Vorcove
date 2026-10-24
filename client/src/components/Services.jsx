import { Fragment } from 'react';
import { Arrow } from './Icons.jsx';
import { Mark } from './Logo.jsx';
import { services } from '../data/content.js';

const cardDelay = [0, 1, 2, 1, 2];

export default function Services() {
  return (
    <>
      <section className="services on-dark" id="services">
        <div className="wrap">
          <div className="svc-head">
            <div>
              <span className="eyebrow rv">What we do</span>
              <h2 className="h2 rv d1">Five systems.<br />One goal: more revenue.</h2>
            </div>
            <p className="lead rv d2">Each one plugs into what you already run, so your team keeps working the way they know.</p>
          </div>
          <div className="svc-grid">
            {services.map((s, i) => (
              <a key={s.title} href="#contact" className={`svc rv${i === 0 ? ' big' : ''}${cardDelay[i] ? ` d${cardDelay[i]}` : ''}`}>
                <img src={s.img} alt="" loading="lazy" />
                <span className="num">0{i + 1}</span>
                <span className="go"><Arrow /></span>
                <div className="svc-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.tags && <div className="tags">{s.tags.map(t => <span key={t}>{t}</span>)}</div>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
}

function Marquee() {
  // the list is rendered twice so the scroll loops without a gap
  const run = (
    <span>
      {services.map((s, i) => (
        <Fragment key={s.title}>
          {i % 2 ? <em className="o" style={{ fontStyle: 'normal' }}>{s.title}</em> : s.title} <Mark />{' '}
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{run}{run}</div>
    </div>
  );
}
