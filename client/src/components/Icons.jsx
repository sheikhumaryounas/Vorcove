// shared symbols, rendered once and reused with <use href="#...">
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="arrow" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="arrow-ne" viewBox="0 0 16 16"><path d="M4 12L12 4M5 4h7v7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="chev" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="tick" viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></symbol>
    </svg>
  );
}

export const Use = ({ id, ...rest }) => <svg aria-hidden="true" {...rest}><use href={`#${id}`} /></svg>;
export const Arrow = props => <Use id="arrow" {...props} />;

// line icons (24px grid); stroke and size come from the surrounding CSS
const paths = {
  automation: <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />,
  data: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  ai: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />,
  cart: <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6" />,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  searchPlus: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4M8 11h6M11 8v6" /></>,
  factory: <path d="M3 21V9l6-4v4l6-4v4l6-4v16z" />,
  box: <path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  link: <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />,
  dollar: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  arrowNE: <path d="M7 17L17 7M8 7h9v9" />
};

export const Icon = ({ name, ...rest }) => <svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>{paths[name]}</svg>;

// small glyphs for the video controls
export const glyphs = {
  play: <svg viewBox="0 0 16 16"><path d="M5 3l8 5-8 5z" fill="currentColor" /></svg>,
  pause: <svg viewBox="0 0 16 16"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  soundOff: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h3l4-3v10L5 10H2zM11 6l4 4M15 6l-4 4" /></svg>,
  soundOn: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h3l4-3v10L5 10H2zM11.5 5.5a3.5 3.5 0 0 1 0 5M13.5 3.5a6.5 6.5 0 0 1 0 9" /></svg>,
  full: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" /></svg>
};
