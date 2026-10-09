import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";

type Point = { x: number; y: number };

export function HeartIntro({ onNext }: { onNext: () => void }) {
  const reduce = useReducedMotion();
  const [pulled, setPulled] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [point, setPoint] = useState<Point>({ x: 0, y: 0 });
  const start = useRef<Point>({ x: 0, y: 0 });
  const finished = useRef(false);

  function pointerDown(e: PointerEvent<HTMLButtonElement>) {
    if (launched) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setPulled(true);
  }

  function pointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (!pulled || launched) return;
    // Pull the arrow down to load the bow. Clamping keeps it usable on small phones.
    setPoint({
      x: Math.max(-28, Math.min(28, (e.clientX - start.current.x) * 0.22)),
      y: Math.max(0, Math.min(58, (e.clientY - start.current.y) * 0.48)),
    });
  }

  function shoot() {
    if (launched || finished.current) return;
    finished.current = true;
    setPulled(false);
    setLaunched(true);
    window.setTimeout(onNext, reduce ? 250 : 1450);
  }

  function pointerUp() {
    if (!pulled || launched) return;
    shoot();
  }

  return (
    <section className="scene cream-scene heart-intro">
      <div className="eyebrow">a little something, for you</div>

      <motion.div
        className="hero-heart-wrap"
        animate={launched
          ? { y: -115, scale: 1.6, opacity: 0, rotate: -8 }
          : { y: [0, -9, 0], scale: [1, 1.025, 1] }}
        transition={launched
          ? { duration: reduce ? 0.2 : 0.72, ease: "easeIn" }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glow" />
        <motion.div className="hero-heart" aria-label="Pink heart" animate={launched ? { scale: 1.12 } : { scale: 1 }}>
          ♥
        </motion.div>
        {!launched && <motion.div className="heart-target-sparkles" aria-hidden="true" animate={{ opacity: [0.45, 1, 0.45], scale: [0.92, 1.08, 0.92] }} transition={{ duration: 2.2, repeat: Infinity }}>✦　♡　✦</motion.div>}
      </motion.div>

      <div className={`archery-area ${launched ? "is-launched" : ""}`}>
        <svg className="bow-art" viewBox="0 0 240 190" aria-hidden="true">
          <defs>
            <linearGradient id="bowWood" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#9a654c" />
              <stop offset="1" stopColor="#54352f" />
            </linearGradient>
          </defs>
          {/* Curved wooden bow */}
          <path d="M166 22 C112 42 108 144 166 166" fill="none" stroke="url(#bowWood)" strokeWidth="8" strokeLinecap="round" />
          <path d={`M166 22 Q${164 + point.x} ${94 + point.y} 166 166`} fill="none" stroke="#e7c9b8" strokeWidth="1.8" />
          <path d="M159 25 Q111 94 159 162" fill="none" stroke="#c48b68" strokeWidth="1.6" opacity=".7" />
          <circle cx="166" cy="22" r="4" fill="#55352d" />
          <circle cx="166" cy="166" r="4" fill="#55352d" />
        </svg>

        <motion.button
          type="button"
          className={`launch-arrow ${pulled ? "is-pulled" : ""} ${launched ? "is-shooting" : ""}`}
          style={{ x: point.x-30, y: point.y }}
          animate={launched ? { x: 4, y: -330, opacity: 0, scale: 0.82 } : {}}
          transition={launched ? { duration: reduce ? 0.2 : 0.72, ease: [0.2, 0.75, 0.25, 1] } : { type: "spring", stiffness: 300, damping: 22 }}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          onClick={() => { if (!pulled && !launched) shoot(); }}
          aria-label="Pull back and shoot the arrow at the heart"
          disabled={launched}
        >
          <svg viewBox="0 0 40 92" aria-hidden="true">
            <path d="M20 5 L20 76" stroke="#79513d" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M20 1 L11 19 L20 14 L29 19 Z" fill="#d6a66e" stroke="#79513d" strokeWidth="1" strokeLinejoin="round" />
            <path d="M20 70 L7 84 L20 80 L33 84 Z" fill="#ed4c87" />
            <path d="M20 70 L20 85" stroke="#fff0df" strokeWidth="2" />
            <circle cx="20" cy="40" r="2" fill="#f6c65d" />
          </svg>
        </motion.button>
        {!launched && <div className="aim-glow" aria-hidden="true" />}
      </div>

      <p className="instruction">{launched ? "a little magic is on its way…" : pulled ? "let go to shoot the heart" : "pull back & release to shoot"}</p>
      {!launched && <button className="shoot-button" onClick={shoot}>shoot the heart <span>♡</span></button>}
      <button className="text-link skip-link" onClick={onNext}><ArrowUpRight size={15} /> skip intro</button>
    </section>
  );
}
