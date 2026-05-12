function CeilingLights({ compact = false }) {
  return (
    <div className={`ceiling-lights${compact ? ' ceiling-lights-compact' : ''}`} aria-hidden="true">
      <span className="ceiling-hex ceiling-hex-one" />
      <span className="ceiling-hex ceiling-hex-two" />
      <span className="ceiling-hex ceiling-hex-three" />
      <span className="ceiling-hex ceiling-hex-four" />
      <span className="ceiling-bar ceiling-bar-one" />
      <span className="ceiling-bar ceiling-bar-two" />
    </div>
  );
}

export default CeilingLights;
