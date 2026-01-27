export function BackgroundAurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-orb aurora-orb--one" />
      <div className="aurora-orb aurora-orb--two" />
      <div className="aurora-orb aurora-orb--three" />
      <div className="grain" />
    </div>
  );
}
