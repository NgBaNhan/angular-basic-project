import { FormsModule } from '@angular/forms';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subscription, take } from 'rxjs';
import { BlogService } from '../../service/BlogService';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { setBlogList } from '../store/BlogStore/blog.action';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ProductItemComponent, NgIf, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  //text
  title = {
    name: 'nhan',
    old: 22,
  };
  // properties
  isDisable = false;
  // attribute
  contentImage = 'Nine dev welcome';
  //event
  handleClickMe(): void {
    this.isDisable = !this.isDisable;
  };
  updateField(event: any): void { console.log(event.target.value); }
  isHover = false;
  handleMouseEnter(): void {
    this.isHover = !this.isHover;
  }
  //two-way binding
  bindingMessage = '';
  message = 'Hello';
  isChecked = false;
  selectedCity = '';
  //List render
  products: ProductItem[] = [
    { id: 1, name: 'Yuta', price: 400000, image: 'assets/images/yuta.jpg' },
    { id: 2, name: 'SambaOG', price: 500000, image: 'assets/images/yuta.jpg' },
    { id: 3, name: 'Jisoo', price: 600000, image: 'assets/images/yuta.jpg' },
  ];
  handleDelete(id: number): void {
    // const productIndex = this.products.findIndex(product => product.id === id);
    // if (productIndex !== -1) {
    //   this.products.splice(productIndex, 1);
    // }
    // this.products = this.products.filter(product => product.id !== id);

    // this.blogService.deleteBlog(id).subscribe(({data}:any) => {
    //   if (data == 1) {
    //     this.products = this.products.filter(product => product.id !== id);
    //   }
    // });

    let currentBlogs: ProductItem[] = [];

    // this.store.select(state => state.blogs).subscribe(blogs => {
    //   currentBlogs = blogs;
    // });

    // this.blogService.deleteBlog(id).subscribe(({ data }: any) => {
    //   if (data == 1) {
    //     const updatedBlogs = currentBlogs.filter(product => product.id !== id);
    //     this.store.dispatch(setBlogList({ blogs: updatedBlogs }));
    //     console.log('Updated blogs:', updatedBlogs);
    //   }
    // });

     this.store.select(state => state.blogs)
        .pipe(take(1))
        .subscribe(currentBlogs => {

            this.blogService.deleteBlog(id).subscribe(({ data }: any) => {

                if (data === 1) {
                    const updatedBlogs = currentBlogs.filter(
                        product => product.id !== id
                    );

                    this.store.dispatch(
                        setBlogList({
                            blogs: updatedBlogs
                        })
                    );
                }

            });

        });
  }
  //NgRx
  blogs$: Observable<ProductItem[]>;

  //lifecycle
  // constructor() {
  //   console.log('HomeComponent constructor called');
  // }
  //HttpClient
  constructor(private blogService: BlogService, private store: Store<AppState>) {
    console.log('HomeComponent constructor called');
    this.getBlogApi = new Subscription();
    this.blogs$ = this.store.select(state => state.blogs);
  }
  // ngOnInit(): void {
  //   this.getBlogApi = this.blogService.getBlogs()
  //     .subscribe(({ data, message }) => {
  //       this.products = data.map((item: any) => {
  //         return {
  //           ...item,
  //           name: item.title,
  //           price: Number(item.body),
  //           image: item.author,
  //         };
  //       });
  //     });
  // }
  getBlogApi: Subscription;

  //HttpMapping
  ngOnInit(): void {
    this.getBlogApi = this.blogService.getBlogs().pipe(
      map(({ data }) =>
        data.map((item: any) => {
          return {
            ...item,
            name: item.title,
            price: Number(item.body),
            image: item.author,
          };
        }).filter(product => product.price > 100000)
      ),
    ).subscribe((res) => {
      this.products = res;
      this.store.dispatch(setBlogList({ blogs: res }));
    });
  }


  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('Unsubscribed from getBlogApi');
    }
  }
  // ngDoCheck(): void {
  //   console.log('HomeComponent ngDoCheck called');
  // }
  isVisible = true;
  handleToggleVisibility() {
    this.isVisible = !this.isVisible;
  }

}

