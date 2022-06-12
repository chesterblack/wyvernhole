<?php

    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');

    $post = json_decode(file_get_contents('php://input'));

    if ($post->type) {
        echo $admin->addDocument($post->type);
    } else {
        echo json_encode('invalid payload');
    }
