import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = ""
  passWord = ""

  constructor(private httpClient: HttpClient, private router: Router,
    private cookie: CookieService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.httpClient.post(`${environment.API_URL}/auth/login`,
      { "userName": this.userName, "passWord": this.passWord }).subscribe((res: any) => {
        console.log(res)
        if (res.data.loginStatus == 0) {
          this.cookie.put('token', res.data.token)
          this.router.navigate(['/landing'])
        }
      })
  }

}
