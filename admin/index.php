<?php
    $request = $_SERVER['REQUEST_URI'];
    $trailingRegex = '((^|)(\/|\?(.*)))*$';
    $routeFound = false;

    $routes = [
        [
            "route" => "\/admin",
            "template" => "/_pages/admin-home.php",
        ],
        [
            "route" => "\/admin\/rooms",
            "template" => "/_pages/rooms.php",
            "args" => [
                "backlink" => "/admin",
            ],
        ],
        [
            "route" => "\/admin\/items",
            "template" => "/_pages/items.php",
        ],
        [
            "route" => "\/admin\/rooms\/edit\/[0-9]+",
            "template" => "/_pages/_edit/room.php",
            "args" => [
                "backlink" => "/admin/rooms",
            ],
        ],
        [
            "route" => "\/admin\/items\/edit\/[0-9]+",
            "template" => "/_pages/_edit/item.php",
        ],
    ];

    foreach ($routes as $route) {
        $regex = '/' . $route['route'] . $trailingRegex . '/';
        if (preg_match($regex, $request) && !$routeFound) {
            $routeFound = $route;
        }
    }

    if (!$routeFound) {
        $admin->get404();
        die();
    }

    $args = $routeFound['args'] ?? [];

    include_once($_SERVER['DOCUMENT_ROOT'] . '/layouts/admin-header.php');
    include_once(__DIR__ . $routeFound['template']);
    include_once($_SERVER['DOCUMENT_ROOT'] . '/layouts/admin-footer.php');
