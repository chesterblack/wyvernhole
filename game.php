<?php
    error_reporting(E_ALL);
    include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
    
    switch ($_GET['function']) {
        case 'fetchRoom':
            $collection = (new MongoDB\Client)->game->rooms;
            $id = intval(htmlentities($_GET['room']));
            break;
        case 'fetchItem':
            $collection = (new MongoDB\Client)->game->items;
            $id = intval(htmlentities($_GET['item']));
            break;
    }

    if ($collection) {
        try {
            $result = $collection->findOne(['id' => $id]);
            echo json_encode($result);
        } catch (Throwable $t) {
            echo $t->getMessage();
        }
    }