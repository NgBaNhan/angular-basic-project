import { BlogService } from '../../service/BlogService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BlogItem, ProductItem } from '../shared/types/productItem';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  product = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  constructor(private BlogService: BlogService, private route: Router) {
  }
  get name() {
    return this.product.get('name');
  }
  get price() {
    return this.product.get('price');
  }
  handleAddCart() {
    if (this.name?.hasError('required') || this.price?.hasError('required')) {
      alert('Please fill in all required fields.');
      return;
    }
    const newBlog: BlogItem = {
      id: Math.random(),
      title: String(this.name?.value),
      body: String(this.price?.value),
      author: 'John Doe',
    }
    this.BlogService.postBlog(newBlog).subscribe(({ data }: any) => {
      if (data.id) {
        this.route.navigate(['/']);
        console.log('Blog post created successfully:', data);
      }
    });
  }
}

