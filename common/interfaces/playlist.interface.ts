import { Track } from './track.interface';

export interface Playlist {
  name: string;
  length: number;
  artwork: string;
  tracks: Track[];
}
