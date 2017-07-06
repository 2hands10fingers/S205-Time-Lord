$(document).ready(function() {
  $('.btn').click(function(){
// VARIABLES

  // HEADERS
    var company = "square205";
    var key = "";

  // HTML BLOCK BUILDERS
    var build1 = '<div class="item"><h3>';
    var build2 = '</h3><p><span>Hours Budgeted: </span>';
    var build3 = '</p><p><span>Toal Hours Entered: </span>';
    var build4 = '</p><p><span>Total Hours Left: </span>';
    var build5 = '</p></div>';

  // SLUGS array
  //Clean as a whistle
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
    }, {
      projectName: "txBBQ",
      slugId: '175562',
      budget: 50,
      elem: $('.TXBBQGrills')
    }];

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

    function timeCallback(data){
      console.log(this);
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      this.elem.append(build1 + projName + build2 + this.budget +  build3 + totalHoursSum + build4 + parseInt(this.budget - totalHoursSum) + build5);
      console.log(data["projects"][0]["time-totals"]["total-hours-sum"]);
    }
  });
  // END BUTTON CLICK!
});
