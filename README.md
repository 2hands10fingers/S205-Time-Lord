# S205-Time-Lord
Time tracking web application to measure burn down rate and other things through Teamwork's API.


## Features

- Track burndown rate of fixed contract projects (budgeted hours - the time entries entered)
- Enter and display projects by ID in Teamwork via the Object Array
- Click any of the rows to visit the project's time entries in Teamwork.
- Display the deadline for each project.
- Group projects by <div> class in the HTML

## How it Works
Time Lord uses AJAX calls through Teamwork's API to pull the available JSON data. It arranges things by four simple paramaters added to an object array which mostly uses the the project ID to display the data. To use this product, you must enter the key and change your company name. It works on your localhost or when hosted. Tested only in Google Chrome Version 59.0.3071.115 and up.
