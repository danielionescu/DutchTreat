import { Component } from "@angular/core";
import { Store } from "../services/store.service";

@Component({
    selector: "shop-page",
    templateUrl: "shopPage.component.html"
})
export class ShopPage {
    title = 'Shop';
    constructor(public store: Store) {
    }

    ngOnInit(): void {
        this.store.loadProducts()
            .subscribe(() => {
                //do somethins
            }); // <- Kicks off the operation
    }
}