<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');

    $post = json_decode(file_get_contents('php://input'));

    $parentID = doubleval($post->parentid);
    $speaker = htmlentities($post->speaker);
    $color = htmlentities($post->color);
    $message = htmlentities($post->message);

    $room = $admin->getDocument(doubleval($parentID), 'rooms');

    if (!$room) {
        echo json_encode("No parent room");
    } else {
        $result = $admin->removeDialogueOption($parentID, $speaker, $color, $message);
        echo json_encode($result);
    }
