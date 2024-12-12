import React from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import type { Release } from '@/types/music';

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="bg-black/50 border border-[#1DB954]/20 rounded-lg p-6 hover:border-[#1DB954]/40 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">{release.title}</h3>
          <p className="text-[#1DB954]">{release.type} • {release.label}</p>
          <p className="text-gray-400">{new Date(release.releaseDate).toLocaleDateString()}</p>
        </div>
        
        <a
          href={`https://open.spotify.com/album/${release.spotifyId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-black rounded-full hover:bg-[#1ed760] transition-colors group"
        >
          <SpotifyIcon className="w-5 h-5" />
          <span>Écouter</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      <div className="space-y-2">
        {release.tracks.map((track) => (
          <a
            key={track.id}
            href={`https://open.spotify.com/track/${track.spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group"
          >
            <Play className="w-4 h-4 text-[#1DB954]" />
            <span className="text-gray-200 group-hover:text-white">{track.title}</span>
            <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
          </a>
        ))}
      </div>
    </div>
  );
}