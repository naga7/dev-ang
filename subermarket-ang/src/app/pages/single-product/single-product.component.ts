import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {
  singlePost:any
  constructor(private global: GlobalService,private _activatedRoute :ActivatedRoute){
    let id = this._activatedRoute.snapshot.paramMap.get("_id")
    global.getSingleproduct(id).subscribe(data=>{
      this.singlePost=data.data
      console.log( this.singlePost)
    })
  }
}
