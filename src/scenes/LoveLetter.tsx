import { motion } from "framer-motion";
import { birthdayLetter } from "../app/sceneConfig";

export function LoveLetter({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene dark-scene letter-scene">
      <div className="eyebrow light-eyebrow">a little note, from me to you</div>
      <motion.div className="envelope" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65 }}>
        <div className="envelope-back" />
        <motion.article className="letter-paper" initial={{ y: 45 }} animate={{ y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}>
          <div className="letter-top">♡ &nbsp; just for you &nbsp; ♡</div>
          <p className="letter-text">{birthdayLetter}</p>
          <div className="letter-signoff">with a little extra care, <b>— G</b></div>
        </motion.article>
        <div className="envelope-front" />
      </motion.div>
      <button className="primary-button letter-next" onClick={onNext}>there's more <span>♡</span></button>
    </section>
  );
}