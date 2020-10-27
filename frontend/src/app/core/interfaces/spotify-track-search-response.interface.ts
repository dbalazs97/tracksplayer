import { SpotifyTrack } from '../../playback/interfaces/spotify-track.interface';
import { SpotifyListResponse } from './spotify-list-response.interface';

export interface SpotifyTrackSearchResponse {
	tracks: SpotifyListResponse<SpotifyTrack>;
}
