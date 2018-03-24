$(document).ready(function() {

    // LOADING
    $(function() {
      $('.loading_wrap').fadeOut(1000, function() {
        $('#mega-container').fadeIn(2000);
        $('body').addClass('makeSquareGreen');
      });
    });

    // GLOBAL VARIABLES
    var projectCont = $('.project-container');
    var company = '';
    var key = '';

    function loopLog(array) {
      for (var i = 0; i < array.length; i++) {
        // console.log(array[i]);
      }
    }

    function dateAssign(proj, dateClass, theDate ,firstNum, secondNum) {
      projectCont.find("#" + proj + dateClass).append(theDate.substr(firstNum, secondNum));
    }

    function generalAppender(theID, theClass, appendThis ) {
      projectCont.find("#" + theID + theClass).append(appendThis);
      // console.log("#" + theID + theClass);
    }

    function ajaxCaller(queryString, theContext, successFunction) {
      $.ajax({
          url: 'https://' + company + '.teamwork.com' + queryString,
          headers: {"Authorization": "BASIC " + window.btoa(key + ":xxx")},
          dataType: 'JSON',
          application: "application/json",
          async: true,
          context: theContext,
          success: successFunction
      });
    }

    function cache_clear() {
      window.location.reload(true);
      // window.location.reload(); use this if you do not remove cache
      }

    // CREATE DATE PASSED IN, PARSE IT, MODIFY, AND ADD IT TO SPECIFIC SPAN CLASS
    function deadlineCallback(deadline) {
      var datePassed = deadline.project.endDate;
      var tags = deadline.project.tags
      var thisProj = this.projID;

      dateAssign(thisProj, " .month", datePassed, 4, 2)
      dateAssign(thisProj, " .day", datePassed, 6, 2)
      dateAssign(thisProj, " .year", datePassed, 0, 4)

      for(var i = 0; i < tags.length; i++) {
        tagName = tags[i]["name"]

        if (tagName === "PM: Roger")        { generalAppender(thisProj, " .projectAssigned", "R.W.") }
        else if (tagName === "PM: Charles") { generalAppender(thisProj, " .projectAssigned", "C.M.") }
        else if (tagName === "PM: Jim")     { generalAppender(thisProj, " .projectAssigned", "J.S.") }
        else                                { generalAppender(thisProj, " .projectAssigned", "") }
      }
    }


  function taskListCallback(taskLists) {
    var listHeiarchy = []
    // console.log(taskLists);

    for (var i = 0; i < taskLists.tasklists.length; i++) {
      var base = taskLists.tasklists[i];
      var listName = base["name"]
      var uncompletedCount = base["uncompleted-count"]
      var projID = base["projectId"]
      var msData = base["milestone"]

      if (msData == undefined) {
          msData =  { "deadline" : "0000-00-00T00:00:00Z" }
        } else {
          listName = base["milestone"]["title"];
        }

      var taskListsObj = {
                           "project" : listName,
                           "count" : uncompletedCount,
                           "id": projID,
                           "milestoneData": msData
                         }

      console.log(taskListsObj);
      listHeiarchy.push(taskListsObj)
    }

    for (var i = 0; i < listHeiarchy.length; i++) {
        var listHeiarchyBase = listHeiarchy[i]
        var projCount = listHeiarchyBase["count"]
        var projNameList = listHeiarchyBase["project"]
        var projNameID = listHeiarchyBase["id"]
        var projMSDeadline = listHeiarchyBase["milestoneData"]["deadline"]

        if (projCount == 0 || projNameList == "Project Management" || projNameList == "Project Onboarding" || projNameList == "Project Kickoff") {
          // pass
        } else {
          dateAssign(parseInt(projNameID), " .ms-month", projMSDeadline, 5, 2)
          dateAssign(parseInt(projNameID), " .ms-day", projMSDeadline, 8, 2)
          dateAssign(parseInt(projNameID), " .ms-year", projMSDeadline, 0, 4)
          generalAppender(projNameID, " .current-tasklist", projNameList)
          generalAppender(projNameID, " .task-count", projCount)
          break
        }
      }
    }

    function selectorBuilder(data) {
      for (var i = 0; i < data.projects.length; i++) {
        var projName = data["projects"][i].name;
        var projID = data["projects"][i].id;
        var sBuilder = '<option value="'+ projID +'">'+ projName  +'</option>';

        $('.selector').append(sBuilder)

        }
    }

    // CREATES MAIN DATA ITEMS TO BE DISPLAYED IN HTML AND LOOPS THROUGH DEADLINES
    function timeCallback(data) {
      var projID = this.projID
      var budget = this.budget
      var projects = data["projects"];
      var totalHoursSum = data["projects"][0]["time-totals"]["total-hours-sum"];
      var projName = data["projects"][0]["name"];
      var totalHoursLeft = budget - totalHoursSum;

      var builder = '<tr id ="' + projID + '" class="item">'

      builder += '<td class="projectAssigned"></td>'

      builder += '<td class="projName project dividers">'
      builder +=  '<a target="_blank" href="https://square205.teamwork.com/projects/' + projID + '/time">' + projName +'</a>'
      builder += '</td>'

      builder += '<td class="tasklists">'
      builder += '<p class="current-tasklist"></p>'
      builder += '<span class="tasks-left">Tasks Left: </span><span class="tasks-left task-count"></span>'
      builder += '</td>'

      builder += '<td class="ms-deadline">'
      builder += '<span class="ms-month"></span>.<span class="ms-day"></span>.<span class="ms-year"></span>'
      builder += '</td>'

      builder += '<td class="deadline">'
      builder += '<span class="month"></span>.<span class="day"></span>.<span class="year"></span>'
      builder += '</td>'

      builder += '<td class="hoursBudgeted">'
      builder += budget
      builder += '</td>'

      builder += '<td class="hoursEntered">'
      builder += totalHoursSum
      builder += '</td>'

      builder += '<td class="hoursLeft">'
      builder += parseInt(totalHoursLeft)
      builder += '</td>'

      builder += '</tr>'

      projectCont.append(builder);

      function colorAssign(colorClass) { projectCont.find("#"+projID+' .hoursLeft').addClass(colorClass); }

      if (totalHoursSum <= budget * 0.50 && totalHoursSum >= 0)                 { colorAssign('makeGreen'); }
      else if (totalHoursSum > budget * 0.50 && totalHoursSum <= budget * 0.75) { colorAssign('makeYellow'); }
      else if (totalHoursSum > budget || totalHoursSum > budget * 0.75 )        { colorAssign('makeRed'); }

      ajaxCaller( '/projects/' +  projID + '.json?callback=?', this,  deadlineCallback)
      ajaxCaller('/projects/' + projID + '/tasklists.json?showMilestones=1', "", taskListCallback)
    }

    // LOOP FOR TIME TOTALS AJAX CALL
    $.getJSON('/php/serverside.php', function (projArray) {
      for(var i = 0; i < projArray.length; i++){

        ajaxCaller('/projects/' + projArray[i].projID + '/time/total.json?callback=?',
                    projArray[i],
                    timeCallback)
        }
    });

    // FILLS IN SELECTORS
    ajaxCaller('/projects.json?callback=?', "", selectorBuilder)

    // HARD REFRESHES EVERY HOUR
    setInterval(function() {
      cache_clear()
    }, 3600000);

});
