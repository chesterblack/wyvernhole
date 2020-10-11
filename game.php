<?php
    error_reporting(E_ALL);
    include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $dbPassword = $_ENV['DB_PASSWORD'];

    $client = new MongoDB\Client(
        'mongodb+srv://chester:'.$dbPassword.'@wyvernhole.2ydpn.mongodb.net/wyvernhole?retryWrites=true&w=majority'
    );
    
    switch ($_GET['function']) {
        case 'fetchRoom':
            $collection = $client->wyvernhole->rooms;
            $id = intval(htmlentities($_GET['room']));
            break;
        case 'fetchItem':
            $collection = $client->wyvernhole->items;
            $id = intval(htmlentities($_GET['item']));
            break;
        case 'fetchItems':
            $multiple = true;
            $collection = $client->wyvernhole->items;
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