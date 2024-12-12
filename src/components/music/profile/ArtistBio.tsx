import React from 'react';
import { profile } from '@/data/music/profile';

export function ArtistBio() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-7xl font-extrabold text-white mb-6 tracking-tight">
        {profile.artistName}
      </h1>
      
      <p className="text-xl text-[#1DB954] mb-2">
        {profile.label}
      </p>
      
      <p className="text-xl text-gray-300 mb-4">
        {profile.bio}
      </p>
      
      <p className="text-lg text-gray-400">
        {profile.location}
      </p>
    </div>
  );
}