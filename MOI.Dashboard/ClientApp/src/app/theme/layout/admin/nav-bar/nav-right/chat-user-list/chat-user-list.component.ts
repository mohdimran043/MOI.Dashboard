import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from '../../../../../../services/common.service';
import { AppTranslationService } from '../../../../../../services/app-translation.service';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {
  public friendsList: any;
  public config: any;
  gT: any;
  ahwalsrc: any;
  ahwalsrcFilters: any;
  userid: number = null;
  selhdrAhwalId: number;
  constructor(private svc: CommonService, private appTranslateService: AppTranslationService) {
    // this.friendsList = FriendsList.friends;
    this.userid = parseInt(window.localStorage.getItem('UserID'), 0);
    this.gT = (key: string) => this.appTranslateService.getTranslation(key);
    this.ahwalsrc = JSON.parse(window.localStorage.getItem('Ahwals'));
    this.selhdrAhwalId = this.ahwalsrc[0].ahwalid;
    this.ahwalsrcFilters = Array.from(this.ahwalsrc).map(item => {
      return {
        id: item['ahwalid'],
        name: item['name']
      };
    });
  }

  ngOnInit() {
    this.LoadData();

  }
  private extractData(res: Response) {
    const body = res.json();
    return body || []; // here!
  }
  async LoadData() {
    const rqhdr: object = { userid: this.userid, ahwalid: this.selhdrAhwalId };
    // await this.svc.fetchcallerbyoperator(rqhdr).subscribe((resp: any) => {
    //   console.log(resp);
    //   console.log('111111111111111111111')
    //   console.log(this.extractData(resp));
    //   this.friendsList = resp;

    // });
  }
  onChatOn(friend_id) {
    //this.onChatToggle.emit(friend_id);
  }

}
