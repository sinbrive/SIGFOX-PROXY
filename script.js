// fetch not supported by old version of major browsers
// see list here : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// alternative : XMLHttpRequest

var URL ='api.php?';


setInterval(function getDateTime() {
    var dt = new Date();
    document.getElementById("date").innerHTML = dt.toLocaleDateString();
    document.getElementById("time").innerHTML = dt.toLocaleTimeString();

}, 1000);


function updateDiff(){
    console.log("update diff");
    yest = document.querySelector('#res-yest').innerHTML;
    day = document.querySelector('#res-day').innerHTML;
    dates = document.querySelector('#res-dates').innerHTML;

    console.log(yest,day,dates);

    if (yest!=0 && day!=0 && day>=yest) document.querySelector('#diff-yesterday').innerHTML= "+"+(day-yest);
    else document.querySelector('#diff-yesterday').innerHTML="";
    if (dates!=0 && yest!=0 && yest>=dates) document.querySelector('#diff-date').innerHTML= "+"+(yest-dates);
    else document.querySelector('#diff-date').innerHTML="";
}


//-----------------------
function getRange(since, before) {

    if (!since) {
        console.log(since);
        document.querySelector('#res-dates').innerHTML="00";
        return;
    }

    since_t = new Date(since).getTime();

    before_t=new Date(since).getTime()+3600*24*1000;
 //   before_t = new Date(before).getTime()+60*60*24*1000;  // add one day to get the include "before" date


    var url = URL+'before='+before_t+"&since="+since_t+"&limit=1";
    
    console.log(url);


    getData(url, "range");
     

}


function getToday() {
   
before = new Date().toISOString().substring(0,10);
console.log(before);
before_t=new Date(before).getTime()+3600*24*1000;
since_t = new Date(before).getTime();  

var url = URL+'before='+before_t+"&since="+since_t+"&limit=1";
 console.log(url);

getData(url, "day");
 
}


function getYesterday() {
   
before = new Date().toISOString().substring(0,10);
//console.log("before:", before);

before_t=new Date(before).getTime();
since_t = before_t-3600*24*1000;  // add one day to get the include "before" date

//console.log("Yestarday:", new Date(since_t).toLocaleString(), before);

var url = URL+'before='+before_t+"&since="+since_t+"&limit=1";
 console.log(url);

getData(url, "yest");
 
}


//-----------------------
function calcLast() {
 var url = URL+'limit=2';

 getData(url, "last");

}

var ticHour = setInterval(calcLast, 1*60*1000);

clearInterval(ticHour); // clear it for this step


//-----------------------
function getData(url, _where) {
   
fetch(url)
.then(response => response.json())
.then(function (json) {

        //console.log(json)

		let total=0;
		
		let len = json['data'].length;
        console.log("len", len);
		
	   if (len==1) {
			total=parseInt(json['data'][0]['data']); 
		}

        let  result = document.getElementById("res-dates");

        if (_where == "day") {
            result = document.getElementById("res-day");
        }
        else if (_where == "yest") {
            result = document.getElementById("res-yest");
        }
        else if (_where == "range"){
            result = document.getElementById("res-dates");
        }
        else if (_where == "last"){
            result = document.getElementById("res-last");
        }

        result.innerHTML=total;
        updateDiff();

        }



    );
}
