import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { Arrow, Icon, Use } from './Icons.jsx';
import { EMAIL, images, industries, products, services } from '../data/content.js';
import { getLenis } from '../lib/motion.js';

const MegaItem = ({ href, icon, title, text, onClick }) => (
  <a href={href} className="mega-item" onClick={onClick}>
    <span className="mi"><Icon name={icon} /></span>
    <span><b>{title} <Arrow /></b><span>{text}</span></span>
  </a>
);

const MegaFeature = ({ href, img, tag, title, cta, onClick }) => (
  <a href={href} className="mega-feature" onClick={onClick}>
    <img src={img} alt="" loading="lazy" />
    <div><small>{tag}</small><b>{title}</b><span>{cta} <Arrow /></span></div>
  </a>
);

const MegaIntro = ({ tag, title, text, href, link, onClick }) => (
  <div className="mega-intro">
    <small>{tag}</small>
    <b>{title}</b>
    <p>{text}</p>
    <a href={href} className="mega-link" onClick={onClick}>{link} <Arrow /></a>
  </div>
);

const MenuButton = ({ children }) => (
  <button type="button" aria-haspopup="true">{children} <Use id="chev" className="chev" /></button>
);

export default function Header({ onIndustry }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  // after a menu link is clicked the panel stays shut until the pointer leaves the nav
  const [menusOff, setMenusOff] = useState(false);
  const closeMenus = () => {
    setMenusOff(true);
    document.activeElement?.blur();
  };

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // side effects run straight away so smooth scrolling is back on before a drawer link scrolls
  const setDrawer = next => {
    setOpen(next);
    document.body.classList.toggle('drawer-open', next);
    document.body.style.overflow = next ? 'hidden' : '';
    const lenis = getLenis();
    if (lenis) next ? lenis.stop() : lenis.start();
  };
  const close = () => setDrawer(false);

  return (
    <>
      <header className={`site-head${solid ? ' solid' : ''}${menusOff ? ' menus-off' : ''}`}>
        <div className="util">
          <div className="wrap">
            <div className="util-l">
              <span className="live"><span className="dot" />Replies within 24 hours</span>
              <span>Software &amp; AI for growing businesses</span>
            </div>
            <div className="util-r">
              <a href="#products" className="util-prod"><span className="new">New</span><span><b>Leadsmith</b> &amp; <b>EventSmith</b></span><Arrow className="go" /></a>
              <a href={`mailto:${EMAIL}`} className="mail"><Icon name="mail" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />{EMAIL}</a>
            </div>
          </div>
        </div>
        <div className="bar">
          <div className="wrap">
            <Logo />

            <ul className="nav" aria-label="Main" onMouseLeave={() => setMenusOff(false)} onFocus={() => setMenusOff(false)}>
              <li className="has-mega">
                <MenuButton>Services</MenuButton>
                <div className="mega">
                  <div className="mega-panel">
                    <MegaIntro tag="Services" title="Five systems. One goal: more revenue." text="Each one plugs into what you already run, so your team keeps working the way they know." href="#services" link="All services" onClick={closeMenus} />
                    <div className="mega-grid">
                      {services.map(s => <MegaItem key={s.title} href="#services" icon={s.icon} title={s.title} text={s.short} onClick={closeMenus} />)}
                      <MegaItem href="#process" icon="search" title="Business review" text="Where every project starts: find where revenue is lost or capped." onClick={closeMenus} />
                    </div>
                    <MegaFeature href="#leadsmith" img={images.menuLeadsmith} tag="Product · In pilot" title="Leadsmith for metal fabrication shops" cta="See the product" onClick={closeMenus} />
                  </div>
                </div>
              </li>
              <li className="has-mega">
                <MenuButton>Industries</MenuButton>
                <div className="mega">
                  <div className="mega-panel">
                    <MegaIntro tag="Industries" title="Built for businesses that make, move and sell." text="Small and mid-sized businesses that have a working setup and want more revenue from it." href="#industries" link="Explore industries" onClick={closeMenus} />
                    <div className="mega-grid">
                      {industries.map((ind, i) => <MegaItem key={ind.title} href="#industries" icon={ind.icon} title={ind.title} text={ind.short} onClick={() => { onIndustry(i); closeMenus(); }} />)}
                    </div>
                    <MegaFeature href="#contact" img={images.menuIndustries} tag="Business review" title="Not sure where you fit? Start with a review." cta="Book a call" onClick={closeMenus} />
                  </div>
                </div>
              </li>
              <li className="has-mega">
                <MenuButton>Products</MenuButton>
                <div className="mega">
                  <div className="mega-panel two">
                    <MegaIntro tag="Products" title="Revenue systems, already at work." text="Built on the same idea as every Vorcove project. Watch each one in action." href="#products" link="See both products" onClick={closeMenus} />
                    <div className="mega-prods">
                      {products.map(p => (
                        <a key={p.id} href={`#${p.id}`} className="mega-prod" onClick={closeMenus}>
                          <span className="pic"><img src={p.poster} alt="" loading="lazy" /></span>
                          <span className="txt"><small>{p.menuTag}</small><b>{p.name} <Arrow /></b><span>{p.menuText}</span></span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              <li><a href="#process">How we work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>

            <div className="head-cta">
              <a href={`mailto:${EMAIL}`} className="ghost-link">Contact</a>
              <a href="#contact" className="btn btn-mint">Book a call <Arrow /></a>
              <button className="menu-btn" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="drawer" onClick={() => setDrawer(!open)}>
                <span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className={`drawer${open ? ' open' : ''}`} id="drawer" aria-label="Mobile" inert={open ? undefined : ''}>
        <details><summary>Services <Use id="chev" /></summary><div>
          {services.map(s => <a key={s.title} href="#services" onClick={close}>{s.title}</a>)}
        </div></details>
        <details><summary>Industries <Use id="chev" /></summary><div>
          {industries.map((ind, i) => <a key={ind.title} href="#industries" onClick={() => { onIndustry(i); close(); }}>{ind.title}</a>)}
        </div></details>
        <details><summary>Products <Use id="chev" /></summary><div>
          {products.map(p => <a key={p.id} href={`#${p.id}`} onClick={close}>{p.name}</a>)}
        </div></details>
        <a className="plain" href="#process" onClick={close}>How we work</a>
        <a className="plain" href="#about" onClick={close}>About</a>
        <a className="plain" href="#faq" onClick={close}>FAQ</a>
        <a href="#contact" className="btn btn-mint" onClick={close}>Book a call <Arrow /></a>
      </nav>
    </>
  );
}
