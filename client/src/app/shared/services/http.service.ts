import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private rootUrl = 'http://localhost:3000/api';
  private prefix = '/';

  constructor(private http: HttpClient) {
    /*
    if (!localStorage.getItem('apiEndpoint')) {
      this.loadPreferences();
    }

     */
    if (window.location.hostname.indexOf('staging') >= 0 || window.location.hostname.indexOf('localhost') >= 0) {
    }
  }
 /* async loadPreferences() {
    const preferences = await fetch('/assets/preferences.json').then((response) => response.json());
    localStorage.setItem('urlSocket', 'http://localhost:3000/api');
    localStorage.setItem('apiEndpoint', 'http://localhost:3000/api');
    localStorage.setItem('timeRangeMs', preferences.timeRangeMs);
    localStorage.setItem('timebarStartDeltaMs', preferences.timebarStartDeltaMs);
    this.rootUrl = localStorage.getItem('apiEndpoint');
  }


  */
  client() {
    return this.http;
  }

  url(path: string, usePrefix = true) {
    if (path.indexOf('http') == 0) return path;

    else {
      return this.rootUrl + (usePrefix ? this.prefix : '') + path;
    }
  }

  async get<T>(
    path: string,
    rawpath = false,
    usePrefix = true,
    additionalHeaders: { [h: string]: string } = {}
  ): Promise<T> {
    return await this.makeRequest(async () => {
      return await this.http
        .get<T>(rawpath ? path : this.url(path, usePrefix),{...additionalHeaders, withCredentials:true})
        .toPromise();
    });
  }

  async delete(path: string, usePrefix = true) {
    return this.makeRequest(async () => {
      return this.http.delete(this.url(path, usePrefix), {withCredentials:true}).toPromise();
    });
  }

  formPost<T>(path: string, params: { [p: string]: string } = {}, usePrefix = true) {
    const body = new URLSearchParams();
    for (const p in params) body.set(p, params[p]);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(this.url(path, usePrefix), body.toString(), options).toPromise() as Promise<T>;
  }

  async post<T>(path: string, body: any, additionalHeaders: { [h: string]: string } = {}, usePrefix = true): Promise<any> {
    return this.makeRequest(async () => {
      return this.http
        .post(this.url(path, usePrefix), body, {
          ...this.headerOptions(additionalHeaders), withCredentials:true
        })
        .toPromise();
    });
  }

  async put(path: string, body: any, additionalHeaders: { [h: string]: string } = {}) {
    return this.makeRequest(async () => {
      return this.http.put(this.url(path), body, {
        ...this.headerOptions(additionalHeaders), withCredentials:true
      }).toPromise();
    });
  }

  async putWithOptions(path: string, body: any, options = {}) {
    return this.makeRequest(async () => {
      return this.http.put(this.url(path), body, { ...this.headerOptions(), ...options }).toPromise();
    });
  }


  private async makeRequest(r: () => Promise<any>) {
    try {
      const rawResult = await r();

      const result = rawResult;
      if (rawResult.status < 200 || rawResult.status >= 400) {
        console.log(result);
        throw new Error();
      } else {
        return result;
      }
    } catch (e: any) {
      let error;
      if (e instanceof Promise) {
        try {
          error = await e;
        } catch (er) {
          error = er;
        }
      } else error = e;
      if (e.error) error = e.error;
      console.error({ error: true, ...error });
      throw new Error(error);
    }
  }

  private headerOptions(customHeaders: { [h: string]: string } = {}) {
    const headers = { ...customHeaders };
    if (headers['token']) {
      headers['Authorization'] = 'Bearer ' + headers['token'];
    }
    if (!headers['Authorization']) headers['Authorization'] = 'Bearer ';

    return {
      headers: new HttpHeaders(headers),
      observe: 'response'
    } as any;
  }
}

