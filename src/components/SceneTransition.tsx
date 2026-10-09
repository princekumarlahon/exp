import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotionPreference } from "../hooks/useReducedMotion";

export function SceneTransition({ sceneKey, children }: { sceneKey: number; children: ReactNode }) {
  const reduce = useReducedMotionPreference();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={sceneKey}
        className="scene-shell"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 1.01 }}
        transition={{ duration: reduce ? 0.18 : 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}