import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BaseUrlInterceptor implements HttpInterceptor {
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			url: /^https?:\/\//i.test(req.url) ? req.url : `${ environment.baseUrl }/api/v1${ req.url }`,
		});
		return next.handle(req);
	}
}
