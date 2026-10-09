
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, } from "lucide-react";
import { useState } from "react";


const memories = [
  {
    type: "image",
    src: "/images/memories/photo1.jpeg",
    caption: "a moment worth keeping ♡",
  },
  {
    type: "image",
    src: "/images/memories/photo2.jpeg",
    caption: "a moment worth keeping ♡",
  },
  {
    type: "image",
    src: "/images/memories/photo3.jpeg",
    caption: "a moment worth keeping ♡",
  },
  {
    type: "image",
    src: "/images/memories/photo4.jpeg",
    caption: "a moment worth keeping ♡",
  },
  {
    type: "image",
    src: "/images/memories/photo5.jpeg",
    caption: "a moment worth keeping ♡",
  },

  {
    type: "video",
    src: "/videos/video1.mp4",
    caption: "a little moment in motion ♡",
  },
];


export function MemoryGallery({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);
  const memory = memories[index];

  const previous = () =>
    setIndex((current) => (current - 1 + memories.length) % memories.length);

  const next = () =>
    setIndex((current) => (current + 1) % memories.length);

  return (
    <section className="scene dark-scene gallery-scene">
      <div className="eyebrow light-eyebrow">little moments, kept close</div>

      <h1 className="section-title">
        A tiny memory corner <span>♡</span>
      </h1>

      <p className="section-subtitle">
        little pieces of happiness, saved just for you
      </p>

      <motion.div
        className="memory-frame"
        initial={{ rotate: -2, scale: 0.94, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <div className="memory-garland">△ ▽ △ ▽ △ ▽ △</div>

        <div className="memory-placeholder">
          {memory.type === "image" ? (
            <img
              src={memory.src}
              alt={memory.caption}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 300,
                objectFit: "cover",
                borderRadius: 15,
              }}
            />
          ) : (
            
            
            <video
              key={memory.src}
              src={memory.src}
              controls
              playsInline
              muted={false}
              autoPlay={false}
              preload="metadata"
              onVolumeChange={(e) => {
                console.log("Muted:", e.currentTarget.muted);
                console.log("Volume:", e.currentTarget.volume);
              }}
              style={{
                display: "block",
                position: "relative",
                zIndex: 5,
                width: "100%",
                maxHeight: 400,
                borderRadius: 15,
                objectFit: "contain",
              }}
            />


          )}
        </div>

        <div className="frame-caption">{memory.caption}</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 12 }}>
          <button className="secondary-button" onClick={previous} aria-label="Previous memory">
            <ChevronLeft size={18} />
          </button>

          <span style={{ alignSelf: "center", fontSize: 12 }}>
            {index + 1} / {memories.length}
          </span>

          <button className="secondary-button" onClick={next} aria-label="Next memory">
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>

      <p className="media-hint">
        Every little memory deserves a place here. ♡
      </p>

      <button className="primary-button" onClick={onNext}>
        the final little surprise <Heart size={16} fill="currentColor" />
      </button>
    </section>
  );
}
