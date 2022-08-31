<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');

    $post = json_decode(file_get_contents('php://input'));

    $parentID = doubleval($post->parentid);
    $childID = doubleval($post->childid);
    $text = $post->text;

    $room = $admin->getDocument(doubleval($parentID), 'rooms');

    if (!$room) {
        echo json_encode("No parent room");
    } else {
        $result = $admin->removeRoomOption($parentID, $childID, $text);
        echo json_encode($result);
    }
