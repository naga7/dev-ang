import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  posts:any []=[]
 constructor (private global :GlobalService){

    this.global.getallproducts().subscribe(data=>{
      console.log(data)
      this.posts=data.data
    })
 }
 ngOnInit(){

 }
}
