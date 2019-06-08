import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnChanges {
  // Show dialog to create or edit item
  @Input() showDialog: boolean;
  // The dialog is used for create (true) or edit (false)
  @Input() isCreate: boolean;
  // The selected item, which will be shown in screen in case of edit item
  @Input() selectedItem: any;

  @Output() clickSubmit: EventEmitter<any>;

  // The form group to add or edit item
  itemSettingForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.itemSettingForm = this.formBuilder.group({
      'userId': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      'title': new FormControl('', Validators.compose([Validators.required])),
      'body': new FormControl('', Validators.compose([Validators.required])),
    });
    this.clickSubmit = new EventEmitter<any>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCreate) {
      if (this.isCreate) {
        this.itemSettingForm = this.formBuilder.group({
          'userId': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
          'title': new FormControl('', Validators.compose([Validators.required])),
          'body': new FormControl('', Validators.compose([Validators.required])),
        });
      } else {
        this.itemSettingForm = this.formBuilder.group({
          'userId': new FormControl(this.selectedItem.userId, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
          'title': new FormControl(this.selectedItem.title, Validators.compose([Validators.required])),
          'body': new FormControl(this.selectedItem.body, Validators.compose([Validators.required])),
        });
      }
    }
  }

  handleClickSubmit() {
    this.showDialog = false;
    const itemData = this.itemSettingForm.value;
    this.clickSubmit.emit(itemData);
  }

}
