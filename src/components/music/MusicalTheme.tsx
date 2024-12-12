import React from 'react';
import { ArtistBio } from './profile/ArtistBio';
import { SocialLinks } from './profile/SocialLinks';
import { ReleaseCard } from './releases/ReleaseCard';
import { profile } from '@/data/music/profile';
import { releases } from '@/data/music/releases';

export function MusicalTheme() {
  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1DB954]/20 to-black pointer-events-none" />
        
        <div className="relative">
          {/* Hero Section */}
          <div className="min-h-[70vh] flex items-center justify-center px-4 py-32">
            <div className="text-center">
              <ArtistBio />
              <SocialLinks />
            </div>
          </div>

          {/* Releases Section */}
          <div className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-[#1DB954] mb-12">
              Dernières Sorties
            </h2>
            <div className="space-y-8">
              {releases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}