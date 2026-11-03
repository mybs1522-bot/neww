import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const HeroReelPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted & playsinline for mobile battery-saver compliance
    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        })
        .catch(() => {
          // Low-power/battery saver or OS autoplay restriction encountered
          setIsPlaying(false);
          setIsAutoplayBlocked(true);
        });
    }
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      }).catch(err => {
        console.warn("Playback gesture required:", err);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    // If paused, also play on sound interaction
    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      }).catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto mb-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-800/80 bg-black overflow-hidden relative group">
      <div 
        className="w-full overflow-hidden bg-black relative cursor-pointer select-none" 
        style={{ paddingTop: '177.78%' }}
        onClick={() => togglePlay()}
      >
        {!hasError ? (
          <video
            ref={videoRef}
            src="/videos/hero-reel.mp4"
            poster="/videos/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onError={() => setHasError(true)}
            onPlay={() => { setIsPlaying(true); setIsAutoplayBlocked(false); }}
            onPause={() => setIsPlaying(false)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <iframe 
            src="https://iframe.mediadelivery.net/embed/489113/7f3a8bfe-d216-44df-b7e3-7a70f0e008df?autoplay=true&loop=true&muted=true&preload=true&responsive=true&playsinline=true" 
            loading="eager" 
            style={{ border: 0, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }} 
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" 
            allowFullScreen={true} 
          />
        )}

        {/* Center Tap to Play Button (Visible when paused or autoplay blocked by battery saver) */}
        {(!isPlaying || isAutoplayBlocked) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 transition-opacity">
            <div className="size-16 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center shadow-2xl transform active:scale-90 transition-transform">
              <Play className="size-7 ml-1 fill-zinc-950 text-zinc-950" />
            </div>
            <span className="mt-3 text-xs font-heading font-bold text-white bg-black/75 px-3 py-1 rounded-full border border-white/20 shadow-md">
              Tap to Play
            </span>
          </div>
        )}

        {/* Bottom Bar: Mute / Sound toggle & Playback status */}
        {!hasError && (
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
            <button
              type="button"
              onClick={togglePlay}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xs transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-white" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xs text-[11px] font-mono transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="size-3.5 text-zinc-300" />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="size-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-bold">Sound ON</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
