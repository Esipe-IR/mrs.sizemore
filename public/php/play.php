<?php

$result = array();
$random = 0;

$json = file_get_contents("../data/final.json");
$arr = json_decode($json, true);
$len = count($arr);

for ($i = 0; $i < 20; $i++) {
    $random = mt_rand(0, $len - 1);
    $elem = $arr[$random];

    $lenExamples = count($elem['examples']);
    $random = mt_rand(0, $lenExamples - 1);
    
    $result[] = array(
        "word" => $elem["word"],
        "definitions" => $elem["definitions"],
        "examples" => $elem["examples"][$random]
    );
}

print json_encode($result);
