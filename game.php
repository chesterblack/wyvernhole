<?php

    include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
    $dotenv = Dotenv\Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT']);
    $dotenv->load();

    function connect() {
        $dsn = "mysql:host=".$_ENV['DB_HOST'].";dbname=".$_ENV['DB_NAME'].";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        try {
            return $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], $options);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    if (isset($_GET['function'])) {
        switch($_GET['function']){
            case 'fetchRoom':
                fetchRoom($_GET['room']);
                break;
            default:
                echo "Invalid function provided";
        }
    }

    /**
     * 
     * Fetches data from rooms table
     * 
     * @param String $roomID - the id of the room row
     * @return String - JSON encoded object
     */
    function fetchRoom($roomID){
        $stmt = connect()->prepare('SELECT `data` FROM rooms WHERE id = :id');
        $stmt->execute(['id' => $roomID]);
        $results = $stmt->fetch();
        echo $results['data'];
    }