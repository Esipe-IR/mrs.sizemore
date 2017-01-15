<?php

$result = array(
    "words" => array(),
    "definitions" => array(),
    "examples" => array()
);
$random = 0;

$json = file_get_contents("../data/sheets/" . $_GET['sheet'] . ".json");
$arr = json_decode($json, true);

for ($i = 0; $i < 5; $i++) {
    $len = count($arr);

    $random = mt_rand(0, $len - 1);
    $elem = $arr[$random];
    
    array_splice($arr, $random, 1);

    $lenExamples = count($elem['examples']);
    $random = mt_rand(0, $lenExamples - 1);

    $example = explode("[x]", $elem["examples"][$random]);

    $result["words"][] = $elem["word"];
    $result["definitions"][] = $elem["definitions"][0];
    $result["examples"][] = $example;
}

if (isset($_GET['callback'])) {
    exit(print $_GET['callback'] . "('" . base64_encode(json_encode($result)) . "');");
}

print json_encode($result);
