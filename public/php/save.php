<?php

require('api.php');

if (defined('STDIN')) {
    $type = $argv[1];
    $path = $argv[2];
} else { 
    $type = $_GET['type'];
    $path = $_GET['name'];
}

if ((!$path) || (!$type)) {
    print("Pease give the type and path\n");
    return;
}

$result = [];
$json = file_get_contents($path);
$arr = json_decode($json);

foreach($arr as $i) {
    $r = getInformation($i);

    if (isset($r["error"])) {
        print("Error\n");
        continue;
    }

    print("Save " . $i . "\n");

    $result[] = $r;

    sleep(10);
}

file_put_contents("../data/result_" . $type . "_" . date("H-i-s") . ".json", json_encode($result));
print("Succeed\n");
