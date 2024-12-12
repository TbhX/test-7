export interface Track {
  id: string;
  title: string;
  spotifyId: string;
  releaseDate: string;
  coverUrl?: string;
  spotifyUrl?: string;
  duration?: string;
  artist?: string;
  album?: string;
  position?: number;
}

export interface Album {
  id: string;
  title: string;
  type: 'Album' | 'EP' | 'Single';
  spotifyId: string;
  releaseDate: string;
  tracks: Track[];
  coverUrl?: string;
  spotifyUrl?: string;
}

export interface MusicProfile {
  artistName: string;
  bio: string;
  label: string;
  spotifyId: string;
  socialLinks: {
    spotify?: string;
    instagram?: string;
  };
}