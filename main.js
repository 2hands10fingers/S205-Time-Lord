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
    var build4 = '</span><span class="hoursLeft">';
    var build5 = '</span><span class="deadline"><span class="month"></span>/<span class="day"></span>/<span class="year"></span>';
    var build6 = '</span></div></div>';
    var linkPart1 = '<a target="_blank" href="https://square205.teamwork.com/projects/';
    var linkPar2 = '/time"';
    var linkPart3 = '</a>';

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
    },{
      projectName: "BPublicWebDev",
      slugId: '185547',
      budget: 40,
      elem: $('.BPublic')
    },{
      projectName: "FidYourZoneWebDev",
      slugId: '177775',
      budget: 35,
      elem: $('.FindYourZone')
    },{
      projectName: "TheWashFactoryWebDev",
      slugId: '178826',
      budget: 116,
      elem: $('.TheWashFactory')
    },{
      projectName: "PodcastMovementBrandingEighteen",
      slugId: '182761',
      budget: 50,
      elem: $('.PodcastMovement')
    },{
      projectName: "PodcastMovementWebDevEighteen",
      slugId: '169869',
      budget: 58,
      elem: $('.PodcastMovement')
    },{
      projectName: "VRSSWebDev",
      slugId: '170079',
      budget: 120,
      elem: $('.VRSS')
    },{
      projectName: "VRSSBranding",
      slugId: '170279',
      budget: 15,
      elem: $('.VRSS')
    },{
      projectName: "EnergyAdvisoryServiceWebDev",
      slugId: '165241',
      budget: 102,
      elem: $('.EAS')
    },{
      projectName: "EnergyAdvisoryServiceMotionGraphic",
      slugId: '160562',
      budget: 90,
      elem: $('.EAS')
    },{
      projectName: "DentonFreedomHouseWebDevAndPrint",
      slugId: '155547',
      budget: 44,
      elem: $('.DentonFreedomHosue')
    },{
      projectName: "DentonInternetPrint",
      slugId: '178888',
      budget: 28,
      elem: $('.DentonInternet')
    },{
      projectName: "JLStudiosDesignAndDevelopment",
      slugId: '165242',
      budget: 35,
      elem: $('.JLStudios')
    },{
      projectName: "BigHatLimoWebDev",
      slugId: '186847',
      budget: 30,
      elem: $('.BigHatLimousine')
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
      var newDateString = datePassed.substr(4,2)  + " " + datePassed.substr(6,2) + " " + datePassed.substr(0, 4);
      this.elem.find(".month").append(datePassed.substr(4,2));
      this.elem.find(".day").append(datePassed.substr(6,2));
      this.elem.find(".year").append(datePassed.substr(0,4));

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
});
