import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { recipientName } from "../app/sceneConfig";

export function Finale({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="scene dark-scene finale-scene">
      <div className="finale-orb" />
      <motion.div className="finale-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Sparkles className="final-sparkle" size={26} />
        <p className="eyebrow light-eyebrow">and one last thing…</p>
        <h1>Happy Birthday,<br/><em>{recipientName}</em></h1>
        <div className="final-heart">♥</div>
        <p className="final-message">I hope this year brings you a thousand little reasons to smile. Keep being you — the world is a lovelier place with your kind of light in it.</p>
        <p className="final-signoff">you deserve all the good things ♡</p>
        <button className="primary-button replay-button" onClick={onReplay}><RotateCcw size={16}/> experience it again</button>
      </motion.div>
    </section>
  );
}