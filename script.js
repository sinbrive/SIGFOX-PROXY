
const URL='counter.php?';

//-----------------------
setInterval(function getDateTime() {
      var dt = new Date();
      document.getElementById("date").innerHTML = dt.toLocaleDateString();
      document.getElementById("time").innerHTML = dt.toLocaleTimeString().substring(0,5);
  }, 1000);


//-----------------------
function calcToday() {
   
before = new Date().toISOString().substring(0,10);
before_t=new Date(before).getTime()+3600*24*1000;
since_t = new Date(before).getTime();  

var url = URL+'before='+before_t+"&since="+since_t;

getData(url, "day");
 
}


//-----------------------
function calcYesterday() {
   
before = new Date().toISOString().substring(0,10);

before_t=new Date(before).getTime();
since_t = before_t-3600*24*1000;  // add one day to get the include "before" date

var url = URL+'before='+before_t+"&since="+since_t;

getData(url, "yest");
 
}

//-----------------------
function calcRange(since, before) {

    if (!since || !before ) return;
    if (since > before) {
            let temp = since;
            since = before;
            before = temp;
    };

    since_t = new Date(since).getTime();
    before_t = new Date(before).getTime()+60*60*24*1000;  // add one day to get the include "before" date

    var url = URL+'before='+before_t+"&since="+since_t;

    getData(url, "range");  
}


//-----------------------
function getData(url, _where) {
fetch(url)
.then(response => response.json())
.then(function (json) {
    
        if (_where == "day") {
            result = document.getElementById("res-day");
        }
        else if (_where == "yest") {
            result = document.getElementById("res-yest");
        }
        else if (_where == "range"){
            result = document.getElementById("res-dates");
        }

        result.innerHTML=json;
    });
}

