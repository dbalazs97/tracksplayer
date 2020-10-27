import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SpotifyCallbackComponent } from './components/spotify-callback-component';
import { BaseUrlInterceptor } from './services/base-url.interceptor';
import { SpotifyApiTokenInterceptor } from './services/spotify-api-token.interceptor';

@NgModule({
	declarations: [
		SpotifyCallbackComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BaseUrlInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: SpotifyApiTokenInterceptor,
			multi: true,
		},
	],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() core: CoreModule) {
		if (core) {
			throw new Error('You should import core module only in the root module');
		}
	}
}
