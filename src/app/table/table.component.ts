import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  // List of items
  @Input() listItems: any[];

  // List id of all selected item
  @Input() listSelectedId: number[];
  // Total number of items
  @Input() totalItems: number;
  // Index of first item
  @Input() first: number;

  @Output() lazyLoad: EventEmitter<any>;

  // Headers of table
  columns = [
    { name: 'checkbox', key: 'checkbox', type: 'checkbox', width: '5%' },
    { name: 'Id', key: 'id', type: 'number', width: '10%' },
    { name: 'User Id', key: 'userId', type: 'number', width: '10%' },
    { name: 'Title', key: 'title', type: 'text', width: '25%' },
    { name: 'Body', key: 'body', type: 'text', width: '50%' }
  ];

  pageSizeOptions = [
    {label: '5 items per page', value: 5},
    {label: '10 items per page', value: 10},
    {label: '20 items per page', value: 20},
    {label: '50 items per page', value: 50},
    {label: '100 items per page', value: 100}
  ]
  pageSize: number;

  // When user click at a row of table, the clicked position can be in inside or ouside of a checkbox.
  // This variable is true if user click at the checkbox
  checkBoxClicked = false;
  isSelectedAll: boolean;
  constructor() {
    this.lazyLoad = new EventEmitter<any>();
    this.pageSize = this.pageSizeOptions[0].value;
  }

  ngOnInit() {
    if (this.listSelectedId == null) {
      this.listSelectedId = [];
    }
    if (this.first == null) {
      this.first = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.listSelectedId) {
      this.isSelectedAll = false;
    }
  }

  /**
   * Check if the row is selected or unselected
   * The row is selected if the corresponding id is in the list of selected id
   * @param rowIndex Index of the row
   * @returns true if the row is selected
   * @returns false if the row is unselected
   */
  checkRowSelected(rowIndex) {
    if (this.listSelectedId != null) {
      const id = this.listItems[rowIndex] ? this.listItems[rowIndex].id : null;
      if (this.listSelectedId.indexOf(id) > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Handle event when user click at the checkbox at the first cell of a row
   * This event is emitted before the event clickRow (see next method)
   * @param check: Status of checkbox (true if the checkbox is checked)
   */
  handleSelectRow(check: any) {
    // Mark that the checkbox is clicked, the remaing will be handle in the next method
    this.checkBoxClicked = true;
    // If the checkbox is unchecked, uncheck the select all checkbox
    if (!check) {
      this.isSelectedAll = false;
    }
  }

  /**
   * Handle event when user click at any position of a row.
   * @param rowIndex Index of the clicked row
   */
  handleClickRow(rowIndex) {
    const clickedId = this.listItems[rowIndex] ? this.listItems[rowIndex].id : null;
    // Check status of the clicked row before clicking (selected or unselected)
    const indexOfClickedId = this.listSelectedId.indexOf(clickedId);
    if (this.checkBoxClicked) { // User click at the checkbox
      if (indexOfClickedId === -1) {
        // If the clicked row is unselected, add the row to the selected list
        this.listSelectedId.push(clickedId);
        this.listItems[rowIndex].checked = true;
        if (this.listSelectedId.length === this.pageSize) {
          this.isSelectedAll = true;
        }
      } else {
        // If the clicked row is selected, remove the row from the selected list
        this.listSelectedId.splice(indexOfClickedId, 1);
        this.listItems[rowIndex].checked = false;
      }
    } else { // User click outside of the checkbox
      // In case user click ouside of checkbox, only the clicked row become selected
      // All other row is unselected
      this.isSelectedAll = false;
      this.listSelectedId.splice(0, this.listSelectedId.length);
      this.listSelectedId.push(clickedId);
      for (let index = 0; index < this.listItems.length; index++) {
        if (index === rowIndex) {
          this.listItems[index].checked = true;
        } else {
          this.listItems[index].checked = false;
        }
      }
    }
    // Reset the checkboxClicked variable
    this.checkBoxClicked = false;
  }

  /**
   * Handle event when user click at the checkbox of the header row to select or unselect all
   */
  handleSelectAll() {
    if (this.isSelectedAll) {
      // If the checkall checkbox is checked, set all item in the current page to be selected
      this.listItems.forEach(function (item) {
        item.checked = true;
      });
      this.listSelectedId.splice(0, this.listSelectedId.length);
      for (let index = 0; index < this.listItems.length; index++) {
        this.listSelectedId.push(this.listItems[index].id);
      }

    } else {
      // If the checkall checkbox is unchecked, set all item in the current page to be unselected
      this.listItems.forEach(function (item) {
        item.checked = false;
      });
      this.listSelectedId.splice(0, this.listSelectedId.length);
    }
  }

  /**
   * Handle event when each page of table is loaded (When load website or user change page of table)
   * @param event LazyLoadEvent, the event contains information of the index of first element of the page
   */
  handleLazyLoad(event) {
    // When change page, all item is unselected
    this.isSelectedAll = false;
    const start = event.first;
    // Calculate page number (start from 1) based on index of first element
    const page = start / this.pageSize + 1;
    this.lazyLoad.emit({page: page, limit: this.pageSize});
  }

  handleChangePageSize(event) {
    this.lazyLoad.emit({page: 1, limit: event.value});
  }
}
