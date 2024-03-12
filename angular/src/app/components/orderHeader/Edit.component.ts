import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderHeader-edit',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post" (submit)="edit()">
            <div class="row">
              <div class="form-group col-md-6 col-lg-4">
                <label for="order_header_id">Id</label>
                <input readonly id="order_header_id" name="id" class="form-control form-control-sm" [(ngModel)]="orderHeader.id" type="number" required />
                <span *ngIf="errors.id" class="text-danger">{{errors.id}}</span>
              </div>
              <div class="form-group col-md-6 col-lg-4">
                <label for="order_header_customer_id">Customer</label>
                <select id="order_header_customer_id" name="customer_id" class="form-control form-control-sm" [(ngModel)]="orderHeader.customer_id" required>
                  <option *ngFor="let customer of customers" value="{{customer.id}}" [selected]="orderHeader.customer_id == customer.id">{{customer.name}}</option>
                </select>
                <span *ngIf="errors.customer_id" class="text-danger">{{errors.customer_id}}</span>
              </div>
              <div class="form-group col-md-6 col-lg-4">
                <label for="order_header_order_date">Order Date</label>
                <input id="order_header_order_date" name="order_date" class="form-control form-control-sm" [(ngModel)]="orderHeader.order_date" data-type="date" autocomplete="off" required />
                <span *ngIf="errors.order_date" class="text-danger">{{errors.order_date}}</span>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/orderHeader', $event)" routerLink="/orderHeader">Cancel</a>
                <button class="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class OrderHeaderEdit {
  
  orderHeader?: any = {}
  customers?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private OrderHeaderService: OrderHeaderService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderHeaderService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.orderHeader = data.orderHeader
      this.customers = data.customers
    })
  }

  edit() {
    this.OrderHeaderService.edit(this.route.snapshot.params['id'], this.orderHeader).subscribe(() => {
      this.util.goBack('/orderHeader')
    }, (e) => {
      if (e.error.errors) {
        this.errors = e.error.errors
      }
      else {
        alert(e.error.message)
      } 
    })
  }
}