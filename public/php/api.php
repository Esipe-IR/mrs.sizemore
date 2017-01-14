<?php

/*
** DEBUG
** error_reporting(E_ALL);
** ini_set('display_errors', 1);
** 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
*/

require('wordnik/Swagger.php');

function parse($word) {
    if (!$word || $word === "") {
        return null;
    }

    $word_array = explode(" ", $word);

    if (count($word_array) > 2) {
        return null;
    }

    if (count($word_array) == 2) {
        return strtolower($word_array[1]);
    }

    return strtolower($word_array[0]);
}

function getInformation($word) {
    $word = parse($word);

    if (!$word) {
        return array("error" => "This api doesn't support more than 2 words");
    }

    $myAPIKey = "b2d2689701f5127dd3e2e0607b7071a94794fb2fe51b8e71b";
    $client = new APIClient($myAPIKey, 'http://api.wordnik.com/v4');
    $wordApi = new WordApi($client);

    try {
        $examples = $wordApi->getExamples($word);
    } catch(Exception $e) {
        return array("error" => "Bug with api");
    }

    try {
        $definitions = $wordApi->getDefinitions($word);
    }  catch(Exception $e) {
        return array("error" => "Bug with api");
    }

    $arr = array(
        "word" => $word,
        "definitions" => array(),
        "examples" => array()
    );

    if ($examples) {
        foreach ($examples->examples as $item) {
            if (!$item->text) {
                continue;
            }

            $v = $item->text;
            $v = str_ireplace($word, '[x]', $v);
            $arr["examples"][] = $v;
        }
    }

    if ($definitions) {
        foreach ($definitions as $def) {
            if (!$def->text) {
                continue;
            }

            $arr["definitions"][] = $def->text;
        }
    }

    return $arr;
}

if (isset($_GET["word"])) {
    print json_encode(getInformation($_GET['word']));
}
