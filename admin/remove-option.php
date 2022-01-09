<?php
    error_reporting(E_ALL);
    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');

    $post = json_decode(file_get_contents('php://input'));

    $parentID = doubleval($post->parentid);
    $childID = doubleval($post->childid);
    $text = $post->text;

    $room = $admin->getRoom(doubleval($parentID), 'rooms');

    $collection = $admin->database->rooms;
    $foo = $collection->findOne(['options' => [
        'id' => $childID,
        'text' => $text,
    ]]);

    if (!$room) {
        echo json_encode("No parent room");
    } else {
        $result = $admin->removeOption($parentID, $childID, $text);
        echo json_encode($result);
    }
