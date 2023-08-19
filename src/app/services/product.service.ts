import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );
  readonly apiUrl = '/api';

  getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/product-count`, {
      headers: this.httpHeaders,
    });
  }

  getProducts(
    page?: number,
    size?: number,
    sortColumn?: string,
    sortDirection?: number,
  ): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      headers: this.httpHeaders,
      params: {
        page: page ?? '',
        size: size ?? '',
        sortColumn: sortColumn ?? '',
        sortDirection: sortDirection ?? '',
      },
    });
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${productId}`, {
      headers: this.httpHeaders,
    });
  }

  createProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(`${this.apiUrl}/products`, product, {
      headers: this.httpHeaders,
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products`, product, {
      headers: this.httpHeaders,
    });
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/product/${productId}`, {
      headers: this.httpHeaders,
    });
  }
}
