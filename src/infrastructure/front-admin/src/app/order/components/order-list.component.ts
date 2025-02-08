import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  currentPage: number = 1;
  ordersPerPage: number = 10;
  totalOrders: number = 0;
  totalPages: number = 1;

  constructor(
    private readonly orderService: OrderService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      if (Array.isArray(orders)) {
        this.totalOrders = orders.length;
        this.totalPages = Math.ceil(this.totalOrders / this.ordersPerPage);
        const startIndex = (this.currentPage - 1) * this.ordersPerPage;
        const endIndex = startIndex + this.ordersPerPage;

        this.orders = orders.slice(startIndex, endIndex);

        this.cdRef.detectChanges();
      } else {
        this.orders = [];
        this.totalOrders = 0;
        this.totalPages = 1;
      }
    }, error => {
      this.orders = [];
      this.totalOrders = 0;
      this.totalPages = 1;
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchOrders();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchOrders();
    }
  }

  deleteOrder(order: Order): void {
    // Implement delete logic here, for example:
  }

  updateOrder(order: Order): void {
    // Implement update logic here
  }
}
