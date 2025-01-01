import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast'
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule,  CommonModule, Toast, ButtonModule ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
  providers: [MessageService]
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService, 
    private router: Router,
    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product created successfully!'
          });
          setTimeout(() => {
            this.router.navigate(['products']);
          }, 1500);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create product. Please try again later.'
          });
        }
      );
    }
  }
}
