import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { OrderItem } from '../../shared/models/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/orders';

  constructor(private readonly http: HttpClient) {}


  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  getTotalOrderCost(orderId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${orderId}/total-cost`);
  }

  getEstimatedDeliveryDate(orderId: string): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}/${orderId}/estimated-delivery-date`);
  }

  getOrderDate(orderId: string): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}/${orderId}/order-date`);
  }

  getUndeliveredItems(orderId: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/${orderId}/undelivered-items`);
  }


  checkIfOrderFullyDelivered(orderId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${orderId}/fully-delivered`);
  }

}
