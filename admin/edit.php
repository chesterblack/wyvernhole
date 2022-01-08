<?php
    $segments = explode("/", $_SERVER['REQUEST_URI']);
    $id = array_pop($segments);

    $collection = $admin->database->rooms;
?>


    <h1>Edit</h1>
    <hr>