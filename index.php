
<!DOCTYPE html>

<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>eCompteur</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
</head>

<body>

<div class="main"> 
  <h1>e-Compteur</h1>
  <p id="descriptif">
    Comptage à distance du nombre de randonneurs.
  </p>
<div class=container>
  <div class="info">
    <div class="datetime" id="date">date</div>
    <div id="text"></div>
    <div class="datetime" id="time">time</div>
  </div> 

  <section>
    <div>
      <p id="res-day">00</p>
    </div>

    <div>
      <p id="res-yest">00</p>
   </div>

    <div>
      <p id="res-dates">00</p> 
    </div>
  </section>
  
 <section>
    <div>
      <button id="btn-day" onclick="calcToday()">Aujourd'hui <img src="61444.png"></button>
    </div>

    <div>
      <button id="btn-yest" onclick="calcYesterday()">Hier <img src="61444.png"></button>
    </div>

    <div>
      <div class="input-dates">
        <button id="btn-dates" onclick="calcRange(document.getElementById('since').value, document.getElementById('before').value)">Autres <img src="61444.png"></button>
        <input id="since" type="date"  name="since">
        <input  id="before" type="date" name="before">
      </div>
    </div>

  </section>
</div>

</div>

<script src="script.js"></script>

</body>

</html>