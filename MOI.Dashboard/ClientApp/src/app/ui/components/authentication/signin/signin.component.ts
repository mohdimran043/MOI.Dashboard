import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CommonService } from '@app/services/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  userName = '';
  password = '';

  constructor(private authService: AuthService, private svc: CommonService) { }

  async ngOnInit() {
    // this.userName = 'mimran';
    // this.password = 'admin';

    await this.svc.GetUserName().subscribe((resp: string) => {
      this.userName = resp;
      this.password = 'admin';
      this.login();
    }, error => { console.error(error); });
  }

  login() {
    this.authService.login(this.userName, this.password, false).subscribe(user => { });
  }

}
