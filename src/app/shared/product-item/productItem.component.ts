import { ProductItem } from './../types/productItem';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, output, Output, OutputEmitterRef, SimpleChanges } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { TitleCasePipe, NgClass, NgForOf } from '@angular/common';
import { UppercasePipe } from '../pipes/UpperCasePipe.pipe';
import { CurrencyPipe } from '../pipes/CurrencyPipe.pipe';
@Component({
    selector: 'app-product-item',
    imports: [RouterOutlet, FormsModule, CurrencyPipe, UppercasePipe, TitleCasePipe, NgClass, NgForOf, RouterLink],
    templateUrl: './productItem.component.html',
    styleUrl: './productItem.component.css'
})
export class ProductItemComponent implements OnChanges, OnDestroy {
    @Input() products: ProductItem[] = [];

    @Output() dataEvent = new EventEmitter<number>();

    handleDelete(productId: number) {
        this.dataEvent.emit(productId);
    }
    // deleteProduct = output<number>();
    // @Output() deleteProduct = new EventEmitter<number>();

    // handleDelete(productId: number) {
    //      this.deleteProduct.emit(productId);
    // }
    constructor(private router: Router) { }
    goToDetail(id: number): void {
        // this.router.navigate(['/detail', id]);
        console.log('Chuẩn bị đi tới detail:', id);
    }
    get totalPrice(): number {
        // const total = this.products.reduce((sum, product) => { return sum + product.price }, 0);
        // return total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        return this.products.reduce((sum, product) => sum + product.price,
            0
        );
    }

    get productCount(): number { return this.products.length; }

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['products'];

        console.log('Previous:', change.previousValue);
        console.log('Current:', change.currentValue);
    }

    ngOnDestroy(): void {
        console.log('ProductItemComponent destroyed');
    }
}

