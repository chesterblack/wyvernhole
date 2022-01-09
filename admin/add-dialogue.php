<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');

    $post = json_decode(file_get_contents('php://input'));

    $parentID = doubleval($post->parentid);
    $speaker = htmlentities($post->speaker);
    $color = htmlentities($post->color);
    $message = htmlentities($post->message);

    $result = $admin->addDialogueOption($parentID, $speaker, $color, $message);
    echo json_encode($result);