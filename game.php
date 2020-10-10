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
        case 'fetchItems':
            $multiple = true;
            $collection = (new MongoDB\Client)->game->items;
            $options = [];

            foreach ($_GET['item'] as $item) {
                $id = intval(htmlentities($item));
                $options[] = ['id' => $id];
            }
            break;
    }

    if ($collection) {
        try {
            if (isset($multiple)) {
                $resultsArr = [];
                $results = $collection->find(
                    ["\$or" => $options]
                );
                foreach ($results as $result) {
                    $resultsArr[] = $result;
                }
                echo json_encode($resultsArr);
            } else {
                $result = $collection->findOne(['id' => $id]);
                echo json_encode($result);
            }
        } catch (Throwable $t) {
            echo $t->getMessage();
        }
    }