import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from '../interfaces/product';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ ToastModule, ReactiveFormsModule, CommonModule, ButtonModule ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  providers: [MessageService]
})
export class EditProductComponent {
  productForm: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService, 
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.productForm.patchValue(product);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product data. Please try again later.'
        });
        this.router.navigate(['products']);
      }
    );
  }

  
  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.productForm.value,
        id: this.productId 
      };

      this.productService.editProduct(this.productId, updatedProduct).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product updated successfully!',
          });
          setTimeout(() => {
            this.router.navigate(['products']);
          }, 1500);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update product. Please try again later.'
          });
        }
      );
    }
  }
}
