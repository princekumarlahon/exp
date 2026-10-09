import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { reasons } from "../app/sceneConfig";

const colors = ["mint", "lilac", "gold", "rose"];

export function Reasons({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene dark-scene reasons-scene">
      <div className="eyebrow light-eyebrow">tiny things, big feelings</div>
      <h1 className="section-title">A few things I adore <span>♡</span></h1>
      <p className="section-subtitle">just a little reminder of how special you are</p>
      <div className="reasons-list">
        {reasons.map((reason, i) => (
          <motion.article className={`reason-card ${colors[i % colors.length]}`} key={reason} initial={{ opacity: 0, x: i % 2 ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i, duration: 0.5 }}>
            <span className="reason-label"><Heart size={13} fill="currentColor" /> reason no. {i + 1}</span>
            <p>{reason}</p><span className="card-sparkle">✦</span>
          </motion.article>
        ))}
      </div>
      <button className="primary-button" onClick={onNext}>one more thing… <span>♡</span></button>
    </section>
  );
}