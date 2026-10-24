// Harbor Beacon mark: a disc with a V-shaped cove cut in, and the beacon dot in the cut
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
      <path className="mc" d="M24 27.5L13.4 7.04A20 20 0 1 0 34.6 7.04Z" />
      <circle className="mv" cx="24" cy="14.5" r="4.4" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Vorcove home">
      <Mark />
      <span>vorcove</span>
    </a>
  );
}
