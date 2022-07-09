var URL = 'api.php?';

var ticHour = setInterval(calcLast, 1 * 60 * 1000);
clearInterval(ticHour); 

setInterval(function getDateTime() {
    var dt = new Date();
    document.getElementById("date").innerHTML = dt.toLocaleDateString();
    document.getElementById("time").innerHTML = dt.toLocaleTimeString();
}, 1000);

function getRange() {
    event.preventDefault();
    const sinceInput = document.querySelector("input[name='since']");
    since = sinceInput.value;
    if (!since) {
        console.log(since);
        document.querySelector('#res-dates').innerHTML = "";
        return;
    }
    since_t = new Date(since).getTime();
    before_t = new Date(since).getTime() + 3600 * 24 * 1000;
    //   before_t = new Date(before).getTime()+60*60*24*1000;  // add one day to get the include "before" date
    var url = URL + 'before=' + before_t + "&since=" + since_t + "&limit=1";
    console.log(url);
    getData(url, "range");
}

function getToday() {
    event.preventDefault();
    before = new Date().toISOString().substring(0, 10);
    console.log(before);
    before_t = new Date(before).getTime() + 3600 * 24 * 1000;
    since_t = new Date(before).getTime();
    var url = URL + 'before=' + before_t + "&since=" + since_t + "&limit=1";
    console.log(url);
    getData(url, "day");
}

function getYesterday() {
    event.preventDefault();
    before = new Date().toISOString().substring(0, 10);
    before_t = new Date(before).getTime();
    since_t = before_t - 3600 * 24 * 1000; // add one day to get the include "before" date
    var url = URL + 'before=' + before_t + "&since=" + since_t + "&limit=1";
    console.log(url);
    getData(url, "yest");
}

function updateDiff() {
    day = document.querySelector('#res-day').innerHTML;
    yest = document.querySelector('#res-yest').innerHTML;
    dates = document.querySelector('#res-dates').innerHTML;
    console.log(day, yest, dates);
    if (yest!=0 && day!=0 ) document.querySelector('#diff-yesterday').innerHTML = (day - yest);
    else document.querySelector('#diff-yesterday').innerHTML = "";
    if (dates!=0 && yest!=0 ) document.querySelector('#diff-date').innerHTML = (yest - dates);
    else document.querySelector('#diff-date').innerHTML = "";
}

function getData(url, _where) {
    fetch(url).then(response => response.json()).then(function(json) {
        let total = 0;
        let len = json['data'].length;
        if (len == 1) {
            total = parseInt(json['data'][0]['data']);
        }
        let result = document.querySelector('#res-day');
        if (_where == "yest") {
            result = document.querySelector('#res-yest');
        } else if (_where == "range") {
            result = document.querySelector('#res-dates');
        }
        result.innerHTML = total;
        updateDiff();
    });
}
