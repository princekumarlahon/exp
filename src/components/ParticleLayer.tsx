import { motion, useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 7) * 0.38,
  duration: 6 + (i % 5),
  size: 4 + (i % 5) * 2,
  symbol: i % 3 === 0 ? "♡" : i % 3 === 1 ? "✦" : "·",
}));

export function ParticleLayer() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="particle-layer" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="particle"
          style={{ left: p.left, fontSize: p.size }}
          initial={{ y: "110vh", opacity: 0, rotate: -20 }}
          animate={{ y: "-15vh", opacity: [0, 0.72, 0.5, 0], rotate: 30 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >{p.symbol}</motion.span>
      ))}
    </div>
  );
}