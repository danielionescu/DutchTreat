import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "../services/store.service";
/*import { DataService } from '../shared/dataService';*/

@Component({
  selector: "checkout",
  templateUrl: "checkout.component.html",
  styleUrls: ['checkout.component.css']
})
export class Checkout {
    public errorMessage = "";
    constructor(public store: Store, private router: Router) {
  }

    onCheckout() {
        this.errorMessage = "";
        console.log("ceva");
      this.store.checkout()
          .subscribe(() => {
              
              this.router.navigate(["/"]);
              
          }, err => {            
              this.errorMessage = `Failed to checkout: ${err}`;
          });
  }
}