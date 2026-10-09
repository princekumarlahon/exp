import { motion } from "framer-motion";

export function CakeReveal({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene dark-scene cake-scene">
      <div className="eyebrow light-eyebrow">make a wish…</div>
      <motion.div className="cake-illustration" initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="candle"><motion.span className="flame" animate={{ scale: [1, 1.12, 0.92, 1], opacity: [0.9, 1, 0.8, 0.9] }} transition={{ duration: 0.9, repeat: Infinity }} /></div>
        <div className="cake-icing"><i /><i /><i /></div>
        <div className="cake-layer layer-one" /><div className="cake-layer layer-two" /><div className="cake-layer layer-three" />
        <div className="cake-plate" />
      </motion.div>
      <motion.h1 className="cake-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>A little more magic<br/>for your new year.</motion.h1>
      <p className="soft-copy light-copy">close your eyes, make a wish, keep shining</p>
      <button className="primary-button" onClick={onNext}>my wish is made <span>✦</span></button>
    </section>
  );
}