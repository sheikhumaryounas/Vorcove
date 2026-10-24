import { useState } from 'react';
import { EMAIL, faqs, images } from '../data/content.js';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-side">
          <span className="eyebrow rv">FAQ</span>
          <h2 className="h2 rv d1">Questions, answered.</h2>
          <p className="lead rv d2">Everything you need to know before we start.</p>
          <div className="help rv d2">
            <img src={images.help} alt="" loading="lazy" />
            <div>
              <b>Still have a question?</b>
              <p>Ask us directly. You'll hear back within 24 hours.</p>
              <a href={`mailto:${EMAIL}`} className="btn btn-mint" style={{ padding: '12px 20px', fontSize: 14.5 }}>{EMAIL}</a>
            </div>
          </div>
        </div>
        <div className="rv d1">
          {faqs.map(([q, a], i) => (
            <div key={q} className={`qa${open === i ? ' open' : ''}`}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                {q}<span className="pm" />
              </button>
              <div className="ans"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
