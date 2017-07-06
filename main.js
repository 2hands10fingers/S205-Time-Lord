$(document).ready(function() {
  $('.btn').click(function(){
// VARIABLES

  // HEADERS
    var company = "square205";
    var key = "twp_LkozdI7ALx1JseX88x8gmGvTuUCF";

  // BUDGETED HOURS
    var AutoQuipBudgetSEO = 120;
    var AutoQuipBudgetWebDev = 1185;
    var txBBQBudget = 50;

  // HTML BLOCK BUILDERS
    var build1 = '<div class="item"><h3>';
    var build2 = '</h3><p><b>Toal Hours Entered: </b>';
    var build2= '</p><p>Total Hours Left: ';
    var build3 = '</p></div>';

  // CLASSES
    var autoQuipSec = $('.AutoQuip');
    var txBBQSec = $('.TXBBQGrills');
    var dataHere = $('.dataHere');

  // SLUGS
    var AutoQuipSEOSlug = 'projects/180206/time/total.json?callback=?';
    var AutoQuipWebDevSlug = 'projects/179558/time/total.json?callback=?';
    var txBBQSlug = 'projects/175562/time/total.json?callback=?';
    // var slug = 'projects/' + id + '/time.toal.json?callback=?'

  // AJAX REQUESTS
      // AUTOQUIP
    var AutoQuipSEOCall = $.ajax({
        url: 'https://' + company + '.teamwork.com/' + AutoQuipSEOSlug,
        headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
        dataType: 'JSON',
        application: "application/json"
      });
    var AutoQuipWebDevCall = $.ajax({
          url: 'https://' + company + '.teamwork.com/' + AutoQuipWebDevSlug,
          headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
          dataType: 'JSON',
          application: "application/json"
        });
      // TXBBQGRILLS
    var txBBQCall = $.ajax({
          url: 'https://' + company + '.teamwork.com/' + txBBQSlug ,
          headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
          dataType: 'JSON',
          application: "application/json"
        });

// FUNCTION JUNCTION
    // AUTOQUIP
    function AutoSEOCalc(data) {
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      autoQuipSec.append( build1 + projName + build2 + totalHoursSum +  + parseInt(AutoQuipBudgetSEO - totalHoursSum)  + build3);
      console.log(data["projects"][0]["time-totals"]["total-hours-sum"]);
      }

    function AutoDevCalc(data) {
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      autoQuipSec.append( build1 + projName + build2 + totalHoursSum +  + parseInt(AutoQuipBudgetWebDev - totalHoursSum)  + build3);
      console.log(data["projects"][0]["time-totals"]["total-hours-sum"]);
      }
    // TXBBQGRILLS
    function txBBQCalc(data) {
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      txBBQSec.append( build1 + projName + build2 + totalHoursSum +  + parseInt(txBBQBudget - totalHoursSum)  + build3);
      console.log(data["projects"][0]["time-totals"]["total-hours-sum"]);
      }


//AJAX CALL EXECUTIONS
    // AUTOQUIP
      AutoQuipSEOCall.done(AutoSEOCalc);
      AutoQuipWebDevCall.done(AutoDevCalc);
    // TXBBQGRILLS
      txBBQCall.done(txBBQCalc);
    // AMC SERVICES
  });
  // END BUTTON CLICK!
});
