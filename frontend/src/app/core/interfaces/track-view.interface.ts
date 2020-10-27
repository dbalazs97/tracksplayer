import { Track } from 'tracksplayer-common';
import { Provider } from '../../playback/services/provider/provider.class';

export interface TrackView {
	track: Track,
	provider: Provider,
}
