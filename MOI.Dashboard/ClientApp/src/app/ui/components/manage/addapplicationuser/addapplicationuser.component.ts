import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { DialogType, AlertService } from '@app/services/alert.service';
import { CommonService } from '@app/services/common.service';
import { ModalService } from '@app/services/modalservice';
import {
  DxDataGridComponent, DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent
} from 'devextreme-angular';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { fadeInOut } from '@app/theme/shared/animations/animation-constants';
import CustomStore from 'devextreme/data/custom_store';

import * as overlay from 'devextreme/ui/overlay';
import { AppTranslationService } from '@app/services/app-translation.service';
import { ActivatedRoute } from '@angular/router';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-addapplicationuser',
  templateUrl: './addapplicationuser.component.html',
  styleUrls: ['./addapplicationuser.component.scss'],
  animations: [fadeInOut]
})
export class AddapplicationuserComponent implements OnInit {
  @ViewChild(DxTreeViewComponent, { static: false }) treeView;
  treeDataSource: any;
  treeBoxValue: string[];

  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  data: any;
  patrolid = 0;
  username: string;
  dataSource: any;
  applicationlistsrc: any;
  applicationid: number;
  applicationname: string;
  popupVisible: boolean;
  hdntrans = '';
  modaltitle = '';

  applicationusername = '';
  applicationdisplayname = '';
  applicationroles: any;
  addPopupToolbarOptions = [
    {
      widget: 'dxButton',
      location: 'after',
      options: {
        text: 'حفظ',
        icon: 'feather icon-save',
        stylingMode: 'contained',
        type: 'success',
        onClick: this.onSaveBtnClick.bind(this)
      },
      toolbar: 'bottom'
    },
    {
      widget: 'dxButton',
      location: 'after',
      options: {
        text: 'إلغاء',
        icon: 'feather icon-x-circle',
        stylingMode: 'contained',
        type: 'danger',
        onClick: this.onCancelBtnClick.bind(this)
      },
      toolbar: 'bottom'
    }
  ];
  loadingVisible = false;
  constructor(private svc: CommonService, private modalService: ModalService, private cd: ChangeDetectorRef,
    private alertService: AlertService, private route: ActivatedRoute, private http: HttpClient) {

    // this.treeBoxValue = ['1_1'];
    this.username = window.localStorage.getItem('UserName');
    this.showLoadPanel();

    // this.treeBoxValue = ['1_1'];
  }
  showLoadPanel() {
    this.loadingVisible = true;
  }

  ngOnInit() {
    this.route.data.
      subscribe(data => {
        this.applicationlistsrc = data.applist;
        this.applicationid = data.applist[0].id;
      });
    this.treeDataSource = this.makeAsyncDataSource();
    this.LoadData();
  }
  makeAsyncDataSource() {
    const rqhdr: object = { applicationid: this.applicationid };
    return new CustomStore({
      loadMode: 'raw',
      key: 'ID',
      load: () => this.svc.FetchApplicationRoles(rqhdr).toPromise()
    });
  }

  syncTreeViewSelection(e) {
    const component = (e && e.component) || (this.treeView && this.treeView.instance);
    if (!component) { return; }
    if (!this.treeBoxValue) {
      component.unselectAll();
    }
    if (this.treeBoxValue) {
      this.treeBoxValue.forEach((function (value) {
        component.selectItem(value);
      }).bind(this));
    }
  }

  getSelectedItemsKeys(items) {
    let result = [], that = this;

    items.forEach(function (item) {
      if (item.selected) {
        result.push(item.key);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItemsKeys(item.items));
      }
    });
    return result;
  }
  treeView_itemSelectionChanged(e) {
    const nodes = e.component.getNodes();
    this.treeBoxValue = this.getSelectedItemsKeys(nodes);
  }
  // makeAsyncDataSource() {
  //   return new CustomStore({
  //     loadMode: 'raw',
  //     key: 'id',
  //     load: () => {
  //       const rqhdr: object = { applicationid: this.applicationid };
  //       return this.svc.FetchApplicationRoles(rqhdr).toPromise();
  //     }
  //   });
  // }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 3000);
  }
  LoadData() {
    const userid: string = window.localStorage.getItem('UserID');
    const rqhdr: object = { applicationid: this.applicationid };
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => this.svc.FetchUsers(rqhdr)
        .toPromise()
        .then((data: any) => {
          return data;
        }),
      //  update: (key, values) => this.RowAdd(values, key)
      //   .toPromise()
      //   .then(() => {
      //     Swal.fire({
      //       html: '<font style="font-weight: bold;">' + 'تم إنشاء تفاصيل الحادث' + '</font>',
      //       type: 'success',
      //       timer: 2000,
      //       showConfirmButton: false,
      //       showCancelButton: false
      //     });
      //   }),
      // insert: (values) => this.RowAdd(values, 0)
      //   .toPromise()
      //   .then(() => {
      //     Swal.fire({
      //       html: '<font style="font-weight: bold;">' + 'تم إنشاء تفاصيل الحادث' + '</font>',
      //       type: 'success',
      //       timer: 2000,
      //       showConfirmButton: false,
      //       showCancelButton: false
      //     });
      //   }),
      remove: (key) => this.RowDelete(key)
        .toPromise()
        .then((resp: any) => {
          const paredObject = JSON.parse(resp);
          if (paredObject.statusid === 1) {
            Swal.fire({
              html: '<font style="font-weight: bold;">' + 'تم حذف تفاصيل الحادث' + '</font>',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
              showCancelButton: false
            });
          } else {
            Swal.fire({
              html: '<font style="font-weight: bold;">' + paredObject.text + '</font>',
              type: 'error',
              timer: 2000,
              showConfirmButton: false,
              showCancelButton: false
            });
          }
        })
    });
  }

  onSaveBtnClick(e) {
    this.dataGrid.instance.saveEditData();
  }

  onCancelBtnClick(e) {
    this.dataGrid.instance.cancelEditData();
  }
  showConfirmation(e) {
    e.cancel = Swal.fire({
      title: '<strong>' + 'روى بتفصيل' + ' <u>' + e.data.name + '</u></strong>',
      html: 'هل أنت متأكد أنك تريد' + ' <font style="font-weight: bold;"></font> ',
      onBeforeOpen: () => {
        Swal.getContent().querySelector('font').textContent = 'حذف';
      },
      type: 'question',
      confirmButtonText: '<i class="feather icon-trash-2"></i> ' + 'حذف',
      cancelButtonText: 'إلغاء',
      focusCancel: true,
      showCloseButton: true,
      showCancelButton: true
    }).then((deleteIt) => {
      return !deleteIt.value;
    });
  }
  applicationChanged(e) {
    this.applicationid = e.value;
    this.LoadData();
    this.treeDataSource = this.makeAsyncDataSource();
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        widget: 'dxSelectBox',
        options: {
          width: '200px',
          items: this.applicationlistsrc,
          stylingMode: 'filled',
          value: this.applicationlistsrc[0].id,
          valueExpr: 'id',
          displayExpr: 'name',
          dropDownButtonTemplate: '<i class="dx-icon-filter custom-icon"></i>',
          onValueChanged: this.applicationChanged.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'plus',
          onClick: this.ShowAddPopup.bind(this)
        }
      },
      {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }
  refreshDataGrid() {
    this.LoadData();

  }

  RowDelete(key) {
    const rqhdr: object = { applicationid: key, username: this.username };
    return this.svc.PostDeleteApplication(rqhdr);
  }
  cleardata() {
    this.applicationid = 0;
    this.applicationname = '';
  }
  getValueCell(rowIndex, datafield) {
    this.dataGrid.instance.cellValue(rowIndex, datafield);
  }
  ShowAddPopup() {
    this.hdntrans = 'I';

    this.cleardefaultvalues();
    // this.LoadApplicationRoles();
    this.popupVisible = true;
  }

  ShowUpdatePopup(e) {
    if (e !== undefined) {
     // console.log(e);
      this.hdntrans = 'U';
      this.cleardefaultvalues();
      this.applicationusername = e.domainUser;
      this.applicationdisplayname = e.name;
      this.treeBoxValue = e.roles.map((subElement) => subElement.id);
      this.popupVisible = true;
      //console.log();
    }


  }

  cleardefaultvalues() {
    this.applicationusername = '';
    this.applicationdisplayname = '';
    // this.treeBoxValue = [];
    // this.applicationroles = [];
  }

  LoadApplicationRoles() {
    this.treeDataSource = this.makeAsyncDataSource();
  }

  ClosePopup() {
    this.popupVisible = false;
  }
  RowAdd(e) {
    if (this.applicationusername !== undefined && this.applicationdisplayname !== undefined
       && this.treeBoxValue !== undefined && this.treeBoxValue.length > 0) {

      const rqhdr: object = {
        applicationid: this.applicationid
        , domainuser: this.applicationusername
        , displayname: this.applicationdisplayname
        , roleids: this.treeBoxValue
        , username: this.username
      };
      this.svc.PostUpdateApplicationUser(rqhdr).subscribe((resp) => {
        if (resp) {
          Swal.fire({
            html: '<font style="font-weight: bold;">Successfully Saved</font>',
            type: 'success',
            timer: 2000,
            showConfirmButton: false,
            showCancelButton: false
          });
          this.popupVisible = false;
          this.LoadData();
        }

      });
    } else {
      Swal.fire({
        html: '<font style="font-weight: bold;">Fill all the fields</font>',
        type: 'error',
        timer: 2000,
        showConfirmButton: false,
        showCancelButton: false
      });
    }

  }



  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'NumpadAdd') {
      this.dataGrid.instance.addRow();
    }
    if (event.code === 'Enter') {
      this.onSaveBtnClick(event);
    }
  }
}
