<?php

require('api.php');

$result = [];
$json = file_get_contents('../data/data.json');
$arr = json_decode($json);

foreach($arr as $i) {
    $r = getInformation($i);

    if (isset($r["error"])) {
        print("Err\n");
        continue;
    }

    $result[] = $r;

    sleep(30);
}

$resultjson = json_encode($result);
file_put_contents("../data/result" . date("H-i-s") . ".json", $resultjson);
