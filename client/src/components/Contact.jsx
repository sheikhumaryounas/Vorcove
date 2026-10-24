import { useRef, useState } from 'react';
import { Arrow, Icon } from './Icons.jsx';
import { EMAIL } from '../data/content.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const empty = { business: '', email: '', message: '', website: '' };
const messages = {
  business: 'Please enter your business name.',
  email: 'Please enter a valid email address.',
  message: 'Please tell us a little about your goals.'
};

const validate = v => {
  const e = {};
  if (!v.business.trim()) e.business = messages.business;
  if (!EMAIL_RE.test(v.email.trim())) e.email = messages.email;
  if (!v.message.trim()) e.message = messages.message;
  return e;
};

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const refs = { business: useRef(null), email: useRef(null), message: useRef(null) };

  const change = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
    if (status === 'sent' || status === 'failed') setStatus('idle');
  };

  const submit = async e => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(messages).find(k => found[k]);
    if (first) { refs[first].current.focus(); return; }

    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 400 && data.errors) { setErrors(data.errors); setStatus('idle'); return; }
      if (!res.ok) throw new Error();
      setValues(empty);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const field = (name, label, input) => (
    <div className={`field${errors[name] ? ' err' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {input}
      <span className="msg" id={`f-${name}-msg`}>{errors[name] || messages[name]}</span>
    </div>
  );
  const common = name => ({
    id: `f-${name}`, name, ref: refs[name], value: values[name], onChange: change, required: true,
    'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `f-${name}-msg` : undefined
  });

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div>
          <span className="eyebrow rv">Contact</span>
          <h2 className="h2 rv d1">Find the revenue hiding in your current setup.</h2>
          <p className="lead rv d2">Tell us about your business and we'll get back within 24 hours with where we think you could grow.</p>
          <div className="cinfo">
            <a className="ci rv" href={`mailto:${EMAIL}`}><i><Icon name="mail" /></i><span><small>Email us</small><b>{EMAIL}</b></span></a>
            <div className="ci rv d1"><i><Icon name="clock" /></i><span><small>Response time</small><b>Within 24 hours</b></span></div>
            <div className="ci rv d2"><i><Icon name="search" /></i><span><small>What happens next</small><b>We start with a business review</b></span></div>
          </div>
        </div>

        <form className="rv d1" noValidate onSubmit={submit}>
          <h3>Tell us about your business</h3>
          <p>Three quick questions. No commitment.</p>
          {field('business', 'Business name', <input {...common('business')} placeholder="Your business name" maxLength={120} autoComplete="organization" />)}
          {field('email', 'Email', <input {...common('email')} type="email" placeholder="you@company.com" maxLength={160} autoComplete="email" />)}
          {field('message', 'How do you want to grow your revenue?', <textarea {...common('message')} maxLength={3000} placeholder="e.g. we lose customers after the first order, our team spends hours on manual work, we have data but don't use it…" />)}
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-website">Website</label>
            <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={change} />
          </div>
          <button className="btn btn-accent" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : <>Send <Arrow /></>}
          </button>
          <div role="status" aria-live="polite">
            {status === 'sent' && (
              <p className="ok show">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>
                Thanks. We'll get back to you within 24 hours.
              </p>
            )}
            {status === 'failed' && (
              <p className="form-error">Your message didn't send. Please try again, or email us at {EMAIL}.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
