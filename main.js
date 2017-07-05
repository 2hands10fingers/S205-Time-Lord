$(document).ready(function() {
  $('.btn').click(function(){
    var $dataHere = $('.dataHere');

    var company = "square205";
    var key = "";
    var projectSlug = "projects.json?callback=?";
    var timeEntrySlug = 'time_entries.json?callback=?&sortby=project';
    var contractTag = $.ajax({
      	url: 'https://' + company + '.teamwork.com/' + projectSlug,
      	headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
        dataType: 'JSON',
        page: "1",
        success: function(data) {

          $.each(data["projects"], function(i, projects) {
            var tagData = data["projects"][i]["tags"][0]["name"];
            if (tagData == "Contract"){
                  // $dataHere.append('<div class="item"><h3>' + data["projects"][i]["name"] + '</h3>' +'<p><b>Type: </b>' + tagData + '</p>' + '</div>');

            }

          });
          console.log(data);
        }
      });
      $.ajax({
        	url: 'https://' + company + '.teamwork.com/' + timeEntrySlug,
        	headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
          dataType: 'JSON',
          application: "application/json",
          success: function(data) {
            // Current number sum of array is ~120
            var timeR = [];
            var totalHours = 0;
            $.each(data["time-entries"], function(i, projects) {
              var timeEntries = data["time-entries"][i]["hours"];
              totalHours += parseInt(timeEntries);
              // for ( x = 1; x <= timeR.length; x++) {
              //   timeR.push(timeEntries);
              // }


              $dataHere.append('<div class="item"><p><b>Project name: </b>' + data["time-entries"][i]["project-name"] + '</p>' +'<p><b>Task name: </b>' + data["time-entries"][i]["todo-item-name"] + '</p>' + '<p><b>Hours: </b><div class="hours">' + timeEntries + '</div></p></div>');
              // $dataHere.append('<div class="item"><p><b>Project name: </b>' + data["time-entries"][0]["project-name"] + '</p>' +'<p><b>Task name: </b>' + data["time-entries"][0]["todo-item-name"] + '</p>' + '<p><b>Hours: </b>' + data["time-entries"][0]["hours"] + '</p></div>');

            });

            console.log(data);
            console.log(totalHours);
          }
        });
  });
});
