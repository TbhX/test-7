import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SpotifyIcon } from '@/components/icons/SpotifyIcon';
import { profile } from '@/data/music/profile';

export function SocialLinks() {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <a
        href={profile.socialLinks.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 rounded-full bg-[#1DB954] text-black font-semibold hover:bg-[#1ed760] transition-colors text-lg group"
      >
        <SpotifyIcon className="w-6 h-6 mr-3" />
        Écouter sur Spotify
        <ExternalLink className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
      
      <a
        href={profile.socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 rounded-full bg-black border border-[#1DB954] text-[#1DB954] font-semibold hover:bg-[#1DB954]/10 transition-colors text-lg group"
      >
        <span>Instagram</span>
        <ExternalLink className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
}