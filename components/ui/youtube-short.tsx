'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

interface YouTubeShortProps {
  videoId: string;
  shouldPlay: boolean;
}

const YouTubeShort: React.FC<YouTubeShortProps> = ({ videoId, shouldPlay }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <div className="relative aspect-square overflow-hidden">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={shouldPlay}
        controls
        muted
        width="100%"
        height="100%"
        config={{
          playerVars: { modestbranding: 1, rel: 0 },
        }}
      />
    </div>
  );
};

export default YouTubeShort;
