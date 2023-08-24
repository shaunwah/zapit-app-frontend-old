import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from '../interfaces/merchant';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private http = inject(HttpClient);
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );
  readonly apiUrl = '/api';

  getMerchants(
    like?: string | null,
    page?: number | null,
    size?: number | null,
    sortColumn?: string | null,
    sortDirection?: number | null,
  ): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(`${this.apiUrl}/merchants`, {
      headers: this.httpHeaders,
      params: {
        like: like ?? [],
        page: page ?? [],
        size: size ?? [],
        sortColumn: sortColumn ?? [],
        sortDirection: sortDirection ?? [],
      },
    });
  }

  getMerchantById(merchantId: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.apiUrl}/merchant/${merchantId}`, {
      headers: this.httpHeaders,
    });
  }

  createMerchant(merchant: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(`${this.apiUrl}/merchants`, merchant, {
      headers: this.httpHeaders,
    });
  }

  updateMerchant(merchant: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(`${this.apiUrl}/merchants`, merchant, {
      headers: this.httpHeaders,
    });
  }

  deleteMerchant(merchantId: number): Observable<Merchant> {
    return this.http.delete<Merchant>(`${this.apiUrl}/merchant/${merchantId}`, {
      headers: this.httpHeaders,
    });
  }
}
