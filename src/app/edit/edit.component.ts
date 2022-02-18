import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  name = ""
  detail = ""
  price = undefined
  productId = 0

  constructor(
    private httpClient: HttpClient, private router: Router, private cookie: CookieService, private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('productId')) // Get productId on local
    // this.productId = Number(id)
    // console.log(typeof(this.productId))
    this.httpClient.post(`${environment.API_URL}/product/detail`,
      this.productId,
      { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } }).subscribe((res: any) => {
        console.log(this.productId)
        this.name = res.data.name
        this.detail = res.data.detail
        this.price = res.data.price
      }
      )
  }

  onEdit() {
    this.httpClient.post(`${environment.API_URL}/product/save`,
      { "name": this.name, "detail": this.detail, "price": this.price, "productId": this.productId },
      { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } }).subscribe((res: any) => {
        // console.log(res)
        this.router.navigate(['/landing'])
      }
      )
  }

}
