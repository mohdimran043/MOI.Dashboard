// pnotify.service.ts
import { Injectable } from '@angular/core';
import PNotify from "pnotify/dist/es/PNotify";
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";
import PNotifyConfirm from "pnotify/dist/es/PNotifyConfirm";
import PNotifyHistory from "pnotify/dist/es/PNotifyHistory";
import PNotifyDesktop from "pnotify/dist/es/PNotifyDesktop";

@Injectable()
export class PNotifyService {
  getPNotify() {
    PNotifyButtons;
    PNotifyConfirm;
    PNotifyHistory;
    PNotifyDesktop;
    //PNotify.defaults.styling = 'bootstrap4';
    PNotify.defaults.width = '500px';
    //  PNotify.modules.History.defaults.maxInStack = 4;
    return PNotify;
  }
}
