import { Arrow, Icon, Use } from './Icons.jsx';
import { images } from '../data/content.js';

const checks = ['No rip-and-replace', 'Measured by revenue', 'You own everything', 'Direct access to builders'];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-media rv">
          <div className="img"><img src={images.about} alt="A business team working together around a meeting table" loading="lazy" /></div>
          <div className="chip">
            <i><Icon name="link" width="18" height="18" fill="none" stroke="var(--accent-d)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></i>
            Built on your existing tools
          </div>
          <div className="badge"><b>0</b><span>tools you have to replace. We build on top of what you already use.</span></div>
        </div>
        <div className="about-copy">
          <span className="eyebrow rv">The idea</span>
          <h2 className="h2 rv d1">The revenue is already inside your business.</h2>
          <p className="lead rv d2">Most businesses already have what they need to grow: customers, data, a team and tools. The revenue is stuck in slow processes, manual work and data nobody acts on.</p>
          <p className="lead rv d2">We find it and build the systems that unlock it, on top of your existing tools, processes and data, without replacing anything.</p>
          <ul className="checks rv d3">
            {checks.map(c => <li key={c}><i><Use id="tick" /></i>{c}</li>)}
          </ul>
          <a href="#process" className="btn btn-navy rv d3">See how we work <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
