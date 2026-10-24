import { Arrow, Icon } from './Icons.jsx';
import { industries } from '../data/content.js';

export default function Industries({ active, onChange }) {
  return (
    <section className="industries" id="industries">
      <div className="wrap">
        <div className="svc-head" style={{ marginBottom: 0 }}>
          <div>
            <span className="eyebrow rv">Industries</span>
            <h2 className="h2 rv d1">Built for businesses<br />that make, move and sell.</h2>
          </div>
          <p className="lead rv d2" style={{ maxWidth: 420 }}>Small and mid-sized businesses that have a working setup and want more revenue from it.</p>
        </div>
        <div className="ind">
          <div className="ind-tabs rv" role="tablist" aria-label="Industries">
            {industries.map((ind, i) => (
              <button key={ind.title} className={`ind-tab${i === active ? ' active' : ''}`} type="button" role="tab" aria-selected={i === active} onClick={() => onChange(i)}>
                <span className="n">0{i + 1}</span>
                <span><h3>{ind.title}</h3><p>{ind.text}</p></span>
                <Icon name="arrowNE" />
              </button>
            ))}
          </div>
          <div className="ind-media rv d1">
            {industries.map((ind, i) => (
              <img key={ind.title} className={i === active ? 'active' : undefined} src={ind.img} alt={ind.alt} loading="lazy" />
            ))}
            <div className="ind-cap">
              <div><small>Industry 0{active + 1}</small><b>{industries[active].title}</b></div>
              <a href="#contact" className="btn btn-white" style={{ padding: '13px 22px' }}>Talk to us <Arrow /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
