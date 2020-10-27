import { SpotifyArtist } from './spotify-artist.interface';
import { SpotifyImage } from './spotify-image.interface';

export interface SpotifyAlbum {
	id: string;
	name: string;
	artists: Array<SpotifyArtist>;
	images: Array<SpotifyImage>
}
