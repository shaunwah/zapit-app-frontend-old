import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxMapboxGLModule} from "ngx-mapbox-gl";
import {AppModule} from "../app.module";

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private http = inject(HttpClient);
  readonly apiUrl = 'https://api.mapbox.com';
  readonly apiKey = '';

  forwardGeocode(address: string, postCode: string) {
    const searchText = encodeURI(`${address} ${postCode}`);
    return this.http.get(`${this.apiUrl}/geocoding/v5/mapbox.places/${searchText}.json`, {
      params: {
        access_token: this.apiKey,
        country: 'SG',
        language: 'en',
        types: 'address,postcode'
      }
    })
  }

  constructor() { }
}
