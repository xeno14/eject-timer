var timerId = null;

function stopTimer() {
  if (timerId != null) {
    clearInterval(timerId);
  }
}

function countStart() {
  if (getTotalSeconds() <= 0) return;
  stopTimer();
  timerId = setInterval("timer()", 1000);
};

function countClear() {
  stopTimer();
  writeTime(0);
  closeTray();
}

function countPause() {
  stopTimer();
}

function onCountStopped() {
  eject();
}

function timer() {
  if (countDown()) {
    clearInterval(timerId);
    tiemrId = null;
    onCountStopped();
  }
}

function countDown() {
  var sec = getTotalSeconds();
  sec = sec - 1;
  writeTime(sec);
  if (sec <= 0) {
    return true;
  }
  return false;
}

function getTotalSeconds() {
  var splited = $("#time").text().split(":");
  var min = parseInt(splited[0]);
  var sec = parseInt(splited[1]);
  return 60 * min + sec;
}

function writeTime(totalSec) {
  if (totalSec <= 0) totalSec = 0;
  var min = Math.floor(totalSec / 60);
  var sec = totalSec % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  $("#time").text(min + ":" + sec);
}

function eject() {
  $.ajax({
    type: "GET",
    url: "/eject",
    success: function(msg) {
      alert(msg);
    }
  });
}

function closeTray() {
  $.ajax({
    type: "GET",
    url: "/close",
    success: function(msg) {}
  });
}

$(function() {
  closeTray();

  writeTime(getTotalSeconds());
  $("#start").click(function() {
    countStart();
  });
  $("#pause").click(function() {
    countPause();
  });
  $("#clear").click(function() {
    countClear();
  });
  $("#plus").click(function() {
    var sec = getTotalSeconds() + 30;
    writeTime(sec);
  });
  $("#minus").click(function() {
    var sec = getTotalSeconds() - 30;
    sec = sec >= 0 ? sec : 0;
    writeTime(sec);
  });
});
