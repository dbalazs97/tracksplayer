import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyCallbackComponent } from './core/components/spotify-callback-component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/playback' },
	{ path: 'playback', loadChildren: () => import('./playback/playback.module').then(m => m.PlaybackModule) },
	{ path: 'spotify-callback', component: SpotifyCallbackComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {
}
