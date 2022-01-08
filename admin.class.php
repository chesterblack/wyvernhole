<?php

    class admin
    {
        public $database;
        public $collection;

        function __construct() {
            include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
            $dotenv->load();
        
            try {
                $dbPassword = $_ENV['DB_PASSWORD'];
                $client = new MongoDB\Client(
                    'mongodb+srv://chester:'.$dbPassword.'@wyvernhole.2ydpn.mongodb.net/wyvernhole?retryWrites=true&w=majority'
                );
                $this->database = $client->wyvernhole;
            } catch (Throwable $t) {
                echo $t->getMessage();
            }
        }
    }

    $admin = new admin;