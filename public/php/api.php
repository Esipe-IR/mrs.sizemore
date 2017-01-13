<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

require('wordnik/Swagger.php');

function parse($word) {
    $word_array = explode(" ", $word);

    if (count($word_array) > 2) {
        return null;
    }

    if (count($word_array) == 2) {
        return $word_array[1];
    }

    return $word_array[0];
}

$word = $_GET['word'];
$word = parse($word);

if (!$word) {
    print json_encode(array("error" => "This api doesn't support more than 2 words"));
    return;
}

//$myAPIKey = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
$myAPIKey = "b2d2689701f5127dd3e2e0607b7071a94794fb2fe51b8e71b";
$client = new APIClient($myAPIKey, 'http://api.wordnik.com/v4');

$wordApi = new WordApi($client);
$examples = $wordApi->getExamples($word);
$definitions = $wordApi->getDefinitions($word);

$arr = array(
    "word" => $word,
    "definitions" => array(),
    "examples" => array()
);

foreach ($examples->examples as $item) {
    $v = $item->text;
    $v = str_replace($word, '[x]', $v);
    $arr["examples"][] = $v;
}

foreach ($definitions as $def) {
    $arr["definitions"][] = $def->text;
}

print json_encode($arr);
