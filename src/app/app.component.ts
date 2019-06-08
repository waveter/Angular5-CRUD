import { Component, ViewContainerRef } from '@angular/core';
import { BackendApiService } from './_services/backend-api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Show loading icon on screen to wait for response from server
  loading = true;
  // Show dialog to create or edit item
  showDialog = false;
  // The dialog is used for create (true) or edit (false)
  isCreate = true;
  // List items on the current page
  listItems: any[] = [];
  // Total item (on all page)
  totalItems = 0;
  // The variable to save current display state (page number, number of item on each page)
  displayState: any = {};
  // List of id of selected items
  listSelectedId: any = [];
  // The form group to add or edit item
  itemSettingForm: FormGroup;
  // Index of first item of the table
  first = 0;

  constructor(private backendApiService: BackendApiService,
    private toastr: ToastsManager, private vcr: ViewContainerRef,
    private confirmService: ConfirmationService,
    private formBuilder: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
    this.itemSettingForm = this.formBuilder.group({
      'userId': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      'title': new FormControl('', Validators.compose([Validators.required])),
      'body': new FormControl('', Validators.compose([Validators.required])),
    });
  }

  /**
   * This method will be called each time a page of table is loaded
   * @param event {page: pageNumber, limit: number of item on a page}
   */
  handleLoadTableData(event: any) {
    this.listSelectedId = [];
    this.listItems.forEach(item => {
      item.checked = false;
    })
    this.displayState = event;
    this.loading = true;
    this.backendApiService.getDataList(event.page, event.limit).subscribe((res) => {
      this.listItems = res.body;
      this.totalItems = Number(res.headers.get('x-total-count'));
      // In case of no item found, back to page 1
      if (this.listItems.length === 0 && this.totalItems !== 0) {
        this.backendApiService.getDataList(1, event.limit).subscribe((res2) => {
          this.first = 0;
          this.displayState.page = 1;
          this.loading = false;
          this.listItems = res2.body;
        }, (error) => {
          this.loading = false;
          this.toastr.error('Failed to load data');
        });
      } else {
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      this.toastr.error('Failed to load data');
    });
  }

  handleClickRefreshButton() {
    this.handleLoadTableData(this.displayState);
  }

  handleClickDeleteButton() {
    this.confirmService.confirm({
      message: 'Do you want to delete the selected items?',
      accept: () => {
        this.deleteItems();
      }
    });
  }

  deleteItems() {
    let totalResponse = 0;
    this.loading = true;
    for (const selectedId of this.listSelectedId) {
      this.backendApiService.deleteItem(selectedId).subscribe((res) => {
        this.loading = false;
        this.toastr.success('Delete item ' + String(selectedId) +  ' successfully');
        totalResponse += 1;
        if (totalResponse === this.listSelectedId.length) {
          this.handleRefreshPage();
        }
      }, (error) => {
        this.toastr.error('Failed to delete item ' + String(selectedId));
        totalResponse += 1;
        if (totalResponse === this.listSelectedId.length) {
          this.handleRefreshPage();
        }
      });
    }
  }

  handleRefreshPage() {
    this.loading = false;
    this.handleLoadTableData(this.displayState);
  }

  handleClickCreateButton() {
    this.isCreate = true;
    this.showDialog = true;
    this.itemSettingForm = this.formBuilder.group({
      'userId': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      'title': new FormControl('', Validators.compose([Validators.required])),
      'body': new FormControl('', Validators.compose([Validators.required])),
    });
  }

  handleClickEditButton() {
    this.isCreate = false;
    this.showDialog = true;
    const selectedItem = this.listItems.find((item) => item.id === this.listSelectedId[0]);
    this.itemSettingForm = this.formBuilder.group({
      'userId': new FormControl(selectedItem.userId, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      'title': new FormControl(selectedItem.title, Validators.compose([Validators.required])),
      'body': new FormControl(selectedItem.body, Validators.compose([Validators.required])),
    });
  }

  handleSubmitData() {
    this.showDialog = false;
    this.loading = true;
    const itemData = this.itemSettingForm.value;
    if (this.isCreate) {
      this.backendApiService.addItem(itemData).subscribe((res) => {
        this.toastr.success('Create new item successfully');
        this.handleRefreshPage();
      }, (error) => {
        this.toastr.error('Failed to create new item');
        this.handleRefreshPage();
      });
    } else {
      const selectedId = this.listSelectedId[0];
      this.backendApiService.updateItem(selectedId, itemData).subscribe((res) => {
        this.toastr.success('Edit item ' + String(selectedId) + ' successfully');
        this.handleRefreshPage();
      }, (error) => {
        this.toastr.error('Failed to edit item ' + String(selectedId));
        this.handleRefreshPage();
      });
    }
  }

}
