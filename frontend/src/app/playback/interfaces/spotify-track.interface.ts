import { SpotifyAlbum } from './spotify-album.interface';
import { SpotifyArtist } from './spotify-artist.interface';

export interface SpotifyTrack {
	id: string;
	name: string;
	popularity: number;
	is_playable: boolean;
	duration_ms: number;
	artists: Array<SpotifyArtist>;
	album: SpotifyAlbum;
}
