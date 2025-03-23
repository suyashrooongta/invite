import React, { useRef, useEffect } from 'react';

function AudioPlayer({ audioSrc, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src={audioSrc} 
      loop={false} 
      preload="auto"
      onEnded={() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }}
    />
  );
}

export default AudioPlayer;
