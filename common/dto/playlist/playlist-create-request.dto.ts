import { Playlist } from 'tracksplayer-common';

export interface PlaylistCreateRequestDto extends Omit<Playlist, 'tracks'> {
  tracks: string[];
}
