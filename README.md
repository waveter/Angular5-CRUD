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
- AppComponent
	|- TableComponent
	|- DialogComponent

3. Directory structure

4. Todo
- Sort by each column
- Logger

5. Limitation
- Not show detail error

