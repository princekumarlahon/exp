import { Music2, VolumeX } from "lucide-react";

export function MusicToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button className="icon-button" onClick={onToggle} aria-label={enabled ? "Mute music" : "Enable music"} title="Music">
      {enabled ? <Music2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}