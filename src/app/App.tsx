
import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, ChevronRight } from "lucide-react";
import { ProgressIndicator } from "../components/ProgressIndicator";
import { ParticleLayer } from "../components/ParticleLayer";
import { MusicToggle } from "../components/MusicToggle";
import { SceneTransition } from "../components/SceneTransition";
import { HeartIntro } from "../scenes/HeartIntro";
import { BirthdayTree } from "../scenes/BirthdayTree";
import { CakeReveal } from "../scenes/CakeReveal";
import { Reasons } from "../scenes/Reasons";
import { LoveLetter } from "../scenes/LoveLetter";
import { MemoryGallery } from "../scenes/MemoryGallery";
import { Finale } from "../scenes/Finale";

const totalScenes = 7;

export default function App() {
  const [scene, setScene] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const next = useCallback(
    () => setScene((s) => Math.min(totalScenes - 1, s + 1)),
    []
  );

  const replay = useCallback(() => setScene(0), []);

  // Clean up audio when the app unmounts.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Start or stop music directly from the user's button click.
  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/audio/birthday-music.mp3");
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    if (audio.paused) {
      void audio
        .play()
        .then(() => {
          setMusicEnabled(true);
        })
        .catch((error) => {
          console.error("Music playback failed:", error);
          setMusicEnabled(false);
        });
    } else {
      audio.pause();
      setMusicEnabled(false);
    }
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      if (e.key === "Home") replay();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, replay]);

  const scenes = [
    <HeartIntro onNext={next} />,
    <BirthdayTree onNext={next} />,
    <CakeReveal onNext={next} />,
    <Reasons onNext={next} />,
    <LoveLetter onNext={next} />,
    <MemoryGallery onNext={next} />,
    <Finale onReplay={replay} />,
  ];

  return (
    <div className={`app-root ${scene >= 2 ? "is-dark" : "is-light"}`}>
      <ParticleLayer />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <Heart size={15} fill="currentColor" />
          </span>
          <span>a little something</span>
        </div>

        <div className="topbar-actions">
          <MusicToggle
            enabled={musicEnabled}
            onToggle={toggleMusic}
          />

          {scene < totalScenes - 1 && (
            <button
              className="next-mini"
              onClick={next}
              aria-label="Next scene"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </header>

      <ProgressIndicator current={scene} total={totalScenes} />
      <SceneTransition sceneKey={scene}>
        {scenes[scene]}
      </SceneTransition>

      <footer className="footer-note">
        <span>made with a little extra heart</span>
        <span aria-hidden="true">♡</span>
      </footer>
    </div>
  );
}
