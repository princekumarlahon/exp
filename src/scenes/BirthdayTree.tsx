import { motion, useReducedMotion } from "framer-motion";
import { recipientName } from "../app/sceneConfig";

const branches = [
  "M180 350 Q150 290 95 250 Q75 235 48 230",
  "M180 350 Q215 285 265 250 Q292 235 318 232",
  "M180 310 Q145 245 132 190 Q124 165 102 145",
  "M180 300 Q205 235 210 180 Q214 150 232 125",
  "M180 270 Q170 210 174 160 Q176 135 164 115",
  "M105 257 L84 211 L58 190",
  "M270 250 L284 202 L306 179",
  "M133 192 L106 175 L98 153",
  "M210 181 L240 164 L249 139",
];

// Hearts emerge from different points along the branches, then pop and drift away.
const heartOrigins = [
  [48, 230], [68, 238], [91, 250], [110, 267], [58, 190], [84, 211],
  [102, 145], [112, 165], [132, 190], [145, 220], [164, 115], [174, 145],
  [181, 174], [210, 180], [232, 125], [240, 164], [249, 139], [264, 250],
  [285, 237], [306, 179], [280, 210], [246, 220], [198, 228], [153, 252],
  [124, 232], [96, 215], [218, 204], [175, 204], [230, 245], [142, 175],
  [194, 158], [263, 228], [78, 228], [115, 190], [225, 175], [288, 225],
];
const heartColors = ["#ed6c9c", "#f3b74e", "#d84e80", "#f58bb2", "#ef568e"];

export function BirthdayTree({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();

  return (
    <section className="scene cream-scene tree-scene">
      <div className="sun-rays" />
      <svg className="tree-art" viewBox="0 0 360 560" aria-label="A tree growing branches and hearts">
        <motion.path d="M180 555 Q172 450 180 350" fill="none" stroke="#704653" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3 }} />
        {branches.map((d, i) => (
          <motion.path key={d} d={d} fill="none" stroke="#704653" strokeWidth={i < 2 ? 5 : 3} strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.65, delay: 0.5 + i * 0.13 }} />
        ))}
        {heartOrigins.map(([x, y], i) => (
          <motion.text
            key={`bloom-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={14 + (i % 4) * 3}
            fill={heartColors[i % heartColors.length]}
            initial={{ opacity: 0, scale: 0, y: 8, rotate: -12 }}
            animate={reduce
              ? { opacity: 0.95, scale: 5, y: 0, rotate: 0 }
              : {
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.45, 1, 1.72],
                  y: [8, -2, -20 - (i % 3) * 5, -42 - (i % 4) * 4],
                  x: [0, (i % 2 ? 5 : -5), (i % 2 ? 12 : -12), (i % 2 ? 18 : -18)],
                  rotate: [i % 2 ? -14 : 14, 0, i % 2 ? 12 : -12, i % 2 ? 20 : -20],
                }}
            transition={reduce
              ? { delay: 1.1 + i * 0.025, duration: 0.2 }
              : { delay: 1.0 + i * 0.105, duration: 2.4 + (i % 4) * 0.18, repeat: Infinity, repeatDelay: 1.0 + (i % 5) * 0.34, ease: [0.2, 0.65, 0.25, 1] }}
            style={{ transformOrigin: `${x}px ${y}px`, filter: "drop-shadow(0 2px 3px #c43a7150)" }}
          >♥</motion.text>
        ))}
        {/* Tiny twinkles make the hearts feel as if they are bursting from the branches. */}
        {heartOrigins.filter((_, i) => i % 4 === 0).map(([x, y], i) => (
          <motion.text key={`twinkle-${i}`} x={x + 8} y={y - 5} textAnchor="middle" fontSize="11" fill="#f6c65d"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.2], y: [0, -10, -18] }}
            transition={{ delay: 1.5 + i * 0.22, duration: 1.1, repeat: Infinity, repeatDelay: 2.2 + (i % 3) * 0.5 }}
          >✦</motion.text>
        ))}
      </svg>
      <div className="tree-message">
        <p className="eyebrow">it's officially your day</p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}>{`Happy Birthday, ${recipientName}!`}</motion.h1>
        <p className="soft-copy">here's to a year that blooms</p>
      </div>
      <button className="primary-button tree-next" onClick={onNext}>keep going <span>♡</span></button>
    </section>
  );
}
