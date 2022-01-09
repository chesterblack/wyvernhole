<?php
    include_once($_SERVER['DOCUMENT_ROOT'] . '/layouts/admin-header.php');

    $request = $_SERVER['REQUEST_URI'];
    $trailingRegex = '((^|)(\/|\?(.*)))*$';
    $routeFound = false;

    $routes = [
        [
            "route" => "\/admin",
            "template" => "/rooms.php",
        ],
        [
            "route" => "\/admin\/edit\/[0-9]+",
            "template" => "/_edit/room.php",
        ],
    ];

    foreach ($routes as $route) {
        $regex = '/' . $route['route'] . $trailingRegex . '/';
        if (preg_match($regex, $request) && !$routeFound) {
            $routeFound = true;
            require __DIR__ . $route['template'];
        }
    }

    if (!$routeFound) {
        $admin->get404();
    }

    include_once($_SERVER['DOCUMENT_ROOT'] . '/layouts/admin-footer.php');
