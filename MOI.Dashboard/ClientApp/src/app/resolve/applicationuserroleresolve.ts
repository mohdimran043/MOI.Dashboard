import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './../services/common.service';
@Injectable()
// tslint:disable-next-line:class-name
export class applicationuserroleresolve implements Resolve<any> {
  constructor(private svc: CommonService) { }
  resolve() {
    const myData = this.svc.FetchApplicationList().toPromise();
    return myData;
  }
}
