import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  [x: string]: any;

  name = ""
  detail = ""
  price = undefined
  productId = 0

  constructor(
    private httpClient: HttpClient, private router: Router, private cookie: CookieService, private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('productId')) // Get productId on local
    console.log(this.productId);

  }

  onAdd() {
    this.httpClient.post(`${environment.API_URL}/product/save`,
      { "name": this.name, "detail": this.detail, "price": this.price, "productId": this.productId },
      { headers: { 'Authorization': `Bearer ${this.cookie.get('token')}` } }
    ).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['/landing'])
    })

  }

}
