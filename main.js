$(document).ready(function() {
  // $('.btn').click(function(){
// VARIABLES

  // HEADERS
    var company = "square205";
    var key = "";

  // HTML BLOCK BUILDERS
    var build1 = '<div class="item"><div class="project"><span>';
    var build2 = '</span></div><div class="totals dividers"><span>';
    var build3 = '</span><span>';
    var build4 = '</span><span>';
    var build5 = '</span><span class="deadline">';
    var build6 = '</span></div></div>';
    var linkPart1 = '<a target="_blank" href="https://square205.teamwork.com/projects/'
    var linkPar2 = '/time"'
    var linkPart3 = '</a>'

  // SLUGS ARRAY
  // "Clean as a whistle" - Adam Love
    var projArray = [{
      projectName: "AutoQuipSEO",
      slugId: '180206',
      budget: 120,
      elem: $('.AutoQuip')
    }, {
      projectName: "AutoQuipWebDev",
      slugId: '179558',
      budget: 1185,
      elem: $('.AutoQuip')
    },{
      projectName: "SpotPetSalonWebDev",
      slugId: '177474',
      budget: 1185,
      elem: $('.SpotPetSalon')
    },{
      projectName: "txBBQ",
      slugId: '175562',
      budget: 50,
      elem: $('.TXBBQGrills')
    }];

// FUNCTIONS & LOOPS

    // LOOP FOR TIME TOTALS AJAX CALL
    for(var i = 0; i < projArray.length; i++){
        $.ajax({
          url: 'https://' + company + '.teamwork.com/projects/' + projArray[i].slugId + '/time/total.json?callback=?',
          headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
          dataType: 'JSON',
          application: "application/json",
          context: projArray[i],
          success: timeCallback
        });
    }

    // CREATE DATE PASSED IN, PARSE IT, MODIFY, AND ADD IT TO SPECIFIC SPAN CLASS
    function deadlineCallback(deadline) {
      var datePassed = deadline.project.endDate;
      console.log(datePassed);
      var newDateString = datePassed.substr(4,2)  + " - " + datePassed.substr(6,2) + " - " + datePassed.substr(0, 4);
      // var d = new Date(newDateString);
      // var curr_date = d.getDate();
      // var curr_month = d.getMonth();
      // var curr_year = d.getFullYear();
      // var finalDate = curr_date + "/" + curr_month + "/" + curr_year;
      // console.log(finalDate);
      //timeCallback(datePassed);
      this.elem.find(".deadline").append(newDateString);
    }

    // CREATES MAIN DATA ITEMS TO BE DISPLAYED IN HTML AND LOOPS THROUGH DEADLINES
    function timeCallback(data, date) {
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      this.elem.append(linkPart1 + this.slugId + linkPar2 + build1 + projName + build2 + this.budget +  build3 + totalHoursSum + build4 + parseInt(this.budget - totalHoursSum) + build5 + build6+ linkPart3);

      // SECONDARY AJAX CALL FOR DEADLINES
      $.ajax({
        url: 'https://' + company + '.teamwork.com/projects/' + this.slugId + '.json?callback=?',
        headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
        dataType: 'JSON',
        application: "application/json",
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
  // });
  // END BUTTON CLICK!
});
