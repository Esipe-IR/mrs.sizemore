<?php

    $sheet = $_GET["sheet"];
    $content = $_GET["content"];

    try {
        $arr = json_decode($content);
    } catch (Exception $e) {
        exit(print "error");
    }

    if (!isset($arr["words"]) || !isset($arr["definitions"]) || !isset($arr["examples"])) {
        exit(print("Not well formated: {words: [], definitions: [], examples: []}"));
    }

    file_put_contents("../data/sheets/" . $sheet . ".json", $content);
    