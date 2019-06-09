This is an Angular 5 application to view, create, edit, delete items
Backend resource: https://jsonplaceholder.typicode.com/

1. Features
- View list of items:
	+ Show items by pagination
	+ The number of items on each page is changeable
	+ Refresh button to refresh current page
	+ In case there is no data in current page, back to page 1
	+ A row can be select by checkbox (can select multiple items) or by clicking at the row (select 1 item)
	+ The selected row is hightlight (The checkbox also show the selected state of the row)
	+ Can select all items on a page
	+ Backend resource: GET https://jsonplaceholder.typicode.com/posts?_page={page}&_limit={limit}
	+ Alignment of columns:
		- Checkbox: Center
		- Number (Id, User ID): Right
		- Text (Title, Body): Left

- Add a new item
	+ Add button is always enabled
	+ Validate user's input and show error in case of invalid input data
	+ Backend resource: POST https://jsonplaceholder.typicode.com/posts

- Edit an item
	+ Edit button is only enabled if there is 1 selected item
	+ Validate user's input and show error in case of invalid input data
	+ Backend resource: PUT https://jsonplaceholder.typicode.com/posts/{item_id}

- Delete items
	+ Can delete multiple items
	+ Delete button is only enabled if there is at least 1 selected item
	+ Backend resource: DELETE https://jsonplaceholder.typicode.com/posts/{item_id}

- General behaviors:
	+ In case of add/edit/delete item(s) success, show success toast
	+ In case of list/add/edit/delete item(s) fail, show error toast
	+ Show loading icon, block screen in case of waiting for response from backend
	
2. Component structure
TableComponent: 
	+ The component is a table to show the data
	+ Input:
		- listItems: List items which are displayed in the screen (only for current page, not all data)
		- listSelectedId: List ids of selected items
		- totalItems: Total number of all items (all data)
		- first: offset of index in each page (for example: page 1, first = 0; page 2, first = 10 if page size = 10
	+ Output:
		- loadPage({page: page_number, limit: page_size}): This event will be emitted in case user change page or change page size
	
DialogComponent: 
	+ The component is a dialog to show add or edit item
	+ Input:
		- showDialog: The boolean variable is used to show/hide the dialog
		- isCreate: The boolean variable to indistingust between create item dialog or edit item dialog
		- selectedItem: The selected item object
	+ Output:
		- clickSubmit({userId: user_id, title: title, body: body}): This event will be emitted in case the submit (Create/Edit) button is clicked
	
AppComponent: 
	+ This is the root components, which is parent component of TableComponent and DialogComponent
	+ This component handle events when user click create/edit/delete/refresh buttons

3. Todo
- Sort by each column
- Logger

4. Limitation
- Not show detail error

