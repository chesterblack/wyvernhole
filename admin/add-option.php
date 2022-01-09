<?php
    
    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');

    $post = json_decode(file_get_contents('php://input'));

    $parentID = doubleval($post->parentid);
    $childID = doubleval($post->childid);
    $text = htmlentities($post->text);

    $childRoom = $admin->getRoom($childID, 'rooms');

    if (!$childRoom) {
        echo json_encode("no room");
    } else {
        $result = $admin->addRoomOption($parentID, $childID, $text);
        echo json_encode($result);
    }