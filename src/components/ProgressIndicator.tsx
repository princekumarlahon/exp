import { motion } from "framer-motion";

export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="progress" aria-label={`Scene ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span className="progress-track" key={i}>
          <motion.span className="progress-fill" animate={{ scaleX: i <= current ? 1 : 0 }} />
        </span>
      ))}
    </div>
  );
}