import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SpotifyApiTokenInterceptor implements HttpInterceptor {
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.startsWith('https://api.spotify.com/v1/')) {
			req = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${ localStorage.getItem('spotify_access_token') }`),
			});
		}
		return next.handle(req);
	}
}
