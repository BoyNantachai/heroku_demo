import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName = ""
  passWord = ""


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.httpClient.post(`${environment.API_URL}/user/register`,
      { "userName": this.userName, "passWord": this.passWord })
      .subscribe((res: any) => {
        console.log(res)
        if (res.data == 1) {
          this.router.navigate(['/'])
        } else {

        }
      })
  }

}
