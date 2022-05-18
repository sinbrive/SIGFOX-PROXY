<?php
    header('Content-Type: application/json');

    $parameter = $_SERVER['QUERY_STRING'];

    $url ="https://api.sigfox.com/v2/devices/C3068E/messages?".$parameter;

    $total=calc_total($url);

    $arrayRes = array('total' => $total);

    echo json_encode($total);
   
 

function calc_total($url){

    require('config.php');
 
    $ch = curl_init();
    //curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For HTTPS
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // For HTTPS
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_USERPWD, "$user:$password");
    $result=curl_exec($ch);
    curl_close($ch);

    $dt = json_decode($result, true);

    $len = sizeof($dt['data']);

    //echo "len ".$len;

    if ($len<=0){
      $number=0;
    }
    else if ($len==1) {
      $number = $dt['data'][0]['data'];
    }
    else {
        $number = $dt['data'][0]['data']-$dt['data'][$len-1]['data'];
    }
    //echo "number ".$number;

    return $number;

  }
?>
