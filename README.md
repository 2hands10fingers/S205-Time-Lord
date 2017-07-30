# S205-Time-Lord
Time tracking table/web application to measure burn down rate and other things through Teamwork.com's API. This project is constantly under construction.


<img src="http://i.imgur.com/cNZwd3Y.png" />

## Features
#### v1.0
- Track burndown rate of fixed contract projects (budgeted hours - the time entries entered)
- Enter and display projects by ID using the + ROW form
- Remove row by inserting the provided project ID into the - ROW form
- Click a the arrow of the project to take you to that project
- Display the deadline for each project
- Group projects by div class in the HTML
- Page hard refreshes every hour to calculate any possible new time entries.
- Loading screen capabilities
- Order columns in ascending and descending order with just a click using sortable.js
- Syncs with MySQL database
- Pulls up color-coded tags undernearth each project to demonstrate if the project is billable or contract.
- Displays the Project Manager for the project if assoicated with the second tag.
- Click the Space DJ Cat to remove colors from behind the Total Hours Left column
- Numbers within in Total Hours Left are color-coded by the percentage which the Total Hours is closest to the Budgeted Hours to demonstrate severity.

#### v0.1
 - Displays burn down rate per project iterating through Object Array.
  
### Upcoming Features/Fixes
 - More secure PHP error handling and security to prevent harmful SQL injections.
 - Refactoring of JavaScript/jQuery code

## How it Works

Time Lord uses AJAX calls through Teamwork's API to pull the available JSON data for each project's deadline, hours entered, and deadlines assigned. All you need to do to add a row, is to enter the project ID and the budgeted hours. To use this product, you must enter the key and change your company name in the variables of "main.js". It works on your localhost or when hosted. Tested only in Google Chrome Version 59.0.3071.115 and up.
