import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../../shared/models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;
  isLoading = false;
  errorMessage: string | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.fetchOrderDetails(orderId);
    }
  }

  private fetchOrderDetails(orderId: string): void {
    this.isLoading = true;
    this.orderService.getOrderById(orderId).subscribe(
      (orderDetails) => {
        this.order = orderDetails;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch order details';
        this.isLoading = false;
      }
    );
  }
}
