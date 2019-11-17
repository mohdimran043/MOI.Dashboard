import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { locale, loadMessages } from 'devextreme/localization';
import * as overlay from 'devextreme/ui/overlay';
import { AuthService } from '@app/services/auth.service';
import { DBkeys } from '@app/services/db-keys';
import { CommonService } from '@app/services/common.service';
import notify from 'devextreme/ui/notify';
import config from 'devextreme/core/config';
import { AccountService } from '@app/services/account.service';
import { PNotifyService } from '@app/services/pnotify.service';
import PNotify from 'pnotify/dist/es/PNotify';
import { Utilities } from '@app/services/utilities.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'datta-able';
  pnotify: any;
  closeTimeOutIntervalId: any;
  constructor(private svc: CommonService, private router: Router,
     public authService: AuthService, public accountService: AccountService,
     pnotifyService: PNotifyService) {
    locale('ar');
    config({
      rtlEnabled: true
    });

    this.pnotify = pnotifyService.getPNotify();
  }
  ngOnDestroy() {
  }


  ngOnInit() {
    overlay.baseZIndex(1050);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      
     
    });
  }

}



      // this.pnotify.notice({
      //  title: message.payload,
      //  text: '',
      //  icon: 'fas fa-question-circle',
      //  hide: false,
      //  stack: {
      //    'dir1': 'down',
      //    'dir2': 'right',
      //    'firstpos1': 25,
      //    'firstpos2': 25,
      //    'push': 'top'
      //  },
      //  modules: {
      //    Confirm: {
      //      confirm: true,
      //      buttons: [{
      //        text: 'Land',
      //        primary: true,
      //        click: function (notice) {
      //          this.closeModal('Land');
      //        }
      //      },
      //      {
      //        text: 'Away',
      //        click: function (notice) {
      //          this.closeModal('Away');
      //        }
      //      },
      //      {
      //        text: 'Back From Away',
      //        click: function (notice) {
      //          this.closeModal('BackFromAway');
      //        }
      //      },
      //      {
      //        text: 'Back From Land',
      //        click: function (notice) {
      //          this.closeModal('BackFromLand');
      //        }
      //      },
      //      {
      //        text: 'Back From Walking',
      //        click: function (notice) {
      //          this.closeModal('BackFromWalking');
      //        }
      //      },
      //      {
      //        text: 'Walking Patrol',
      //        click: function (notice) {
      //          this.closeModal('WalkingPatrol');
      //        }
      //      }
      //      ]
      //    },
      //    Buttons: {
      //      closer: true,
      //      sticker: true
      //    },
      //    History: {
      //      history: true
      //    }
      //  }
      // });
