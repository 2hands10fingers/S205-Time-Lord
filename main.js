$(document).ready(function() {

  // LOADING
  $(function() {
    $('.loading_wrap').fadeOut(3000, function() {
      $('#mega-container').fadeIn(2000);
      $('body').addClass('makeSquareGreen');
    });
  });

// LAZY GLOBAL VARIABLES
  var projectCont = $('.project-container');

  // HEADERS
    var company = "square205";
    var key = "";

// FUNCTIONS & LOOPS
    // LOOP FOR TIME TOTALS AJAX CALL
    $.getJSON('serverside.php', function (projArray) {
      for(var i = 0; i < projArray.length; i++){
          $.ajax({
            url: 'https://' + company + '.teamwork.com/projects/' + projArray[i].projID + '/time/total.json?callback=?',
            headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
            dataType: 'JSONP',
            application: "application/json",
            async: false,
            context: projArray[i],
            success: timeCallback
          });
        }
    })

    // CREATE DATE PASSED IN, PARSE IT, MODIFY, AND ADD IT TO SPECIFIC SPAN CLASS
    function deadlineCallback(deadline) {
      var datePassed = deadline.project.endDate;
      var projIDvar = "#" + this.projID;
      var thisProj = this.projID;
      var newDateString = datePassed.substr(4,2)  + " " + datePassed.substr(6,2) + " " + datePassed.substr(0, 4);
      
      // CREATE THE DATE. FORMATTING SUCKS.
      projectCont.find("#" + this.projID + " .month").append(datePassed.substr(4,2));
      projectCont.find("#" + this.projID + " .day").append(datePassed.substr(6,2));
      projectCont.find("#" + this.projID + " .year").append(datePassed.substr(0,4));

      // APPENDS TEAMWORK TAGS
      var tagLocaleOne = deadline.project.tags[0]["name"];
      var tagLocaleTwo = deadline.project.tags[1]["name"];

      projectCont.find("#" + this.projID + " .firstTag").append(tagLocaleOne);
      projectCont.find("#" + this.projID + " .projectAssigned").append(tagLocaleTwo);
      projectCont.find("#" + this.projID + " .idDisplay").append(thisProj);
      
      // COLOR TAGS APPROPRIATELY
      if (tagLocaleOne === "Billable") {
        projectCont.find("#" + this.projID + " .firstTag").addClass('billable');
      } else if (tagLocaleOne === "Contract") {
        projectCont.find("#" + this.projID + " .firstTag").addClass('contract');
      }

  }

    // CREATES MAIN DATA ITEMS TO BE DISPLAYED IN HTML AND LOOPS THROUGH DEADLINES
    function timeCallback(data) {
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      var totalHoursLeft = this.budget - totalHoursSum;
   
    // BUILDS THE TABLE ROW
      var builder = '<tr id ="' + this.projID + '" class="item">'
      builder += '<td class="projName project dividers">'
      builder += projName + ' <a target="_blank" href="https://square205.teamwork.com/projects/' + this.projID + '/time">&#10140;</a>' + '</br><span class="firstTag">' + '</span><span class="idDisplay">ID#:</span>'
      builder += '<td class="projectAssigned"></td>'
      builder += '<td class="hoursBudgeted">'
      builder += this.budget
      builder += '</td>'
      builder += '<td class="hoursEntered">'
      builder += totalHoursSum
      builder += '</td>'
      builder += '<td class="hoursLeft">'
      builder += parseInt(totalHoursLeft)
      builder += '</td>'
      builder += '<td class="deadline">'
      builder += '<span class="month"></span>/<span class="day"></span>/<span class="year"></span>'
      builder += '</td>'
      builder += '</tr>'
      console.log(projName)
      projectCont.append(builder);

      if (totalHoursSum < this.budget * 0.25 && totalHoursSum >= this.budget * 0) {
        projectCont.find("#" + this.projID + ' .hoursLeft').addClass('makeGreen');
      } else if (totalHoursSum >= this.budget * 0.25 && totalHoursSum <= this.budget * 0.50) {
        projectCont.find("#" + this.projID + ' .hoursLeft').addClass('makeYellow');
      } else if (totalHoursSum < this.budget * 0.75 && totalHoursSum > this.budget * 0.50) {
        projectCont.find("#" + this.projID + ' .hoursLeft').addClass('makeOrange');
      } else if (totalHoursSum < this.budget * 0.90 && totalHoursSum > this.budget * 0.75) {
        projectCont.find("#" + this.projID + ' .hoursLeft').addClass('makeBurntOrange');
      } else if (totalHoursSum < this.budget && totalHoursSum >= this.budget * 0.90) {
        projectCont.find("#" + this.projID + ' .hoursLeft').addClass('makeRed');
      } else if (totalHoursSum > this.budget) {
        projectCont.find("#" + this.projID + ' .hoursLeft').addClass('makeDarkRed');
      }

      // SECONDARY AJAX CALL FOR DEADLINES
      $.ajax({
        url: 'https://' + company + '.teamwork.com/projects/' + this.projID + '.json?callback=?',
        headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
        dataType: 'JSON',
        application: "application/json",
        async: false,
        context: this,
        success: deadlineCallback
      });
    }

    // HARD REFRESHES EVERY HOUR
    setInterval(function(){cache_clear()},3600000);
    function cache_clear() {
      window.location.reload(true);
      // window.location.reload(); use this if you do not remove cache
      }
});
