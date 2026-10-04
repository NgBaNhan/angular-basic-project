import { BlogService } from './../../service/BlogService';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductItem } from '../shared/types/productItem';
import { CurrencyPipe } from '../shared/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id = '';

  productItem: ProductItem =
    {
      id: 0,
      name: '',
      price: 0,
      image: ''
    };
  constructor(private route: ActivatedRoute, private BlogService: BlogService) {
    this.id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.BlogService.detailBlog(Number(this.id)).subscribe(({ data }: any) => {
      this.productItem.id = data.id;
      this.productItem.name = data.title;
      this.productItem.price = Number(data.body);
      this.productItem.image = 'assets/images/yuta.jpg';
    });
  }
}

