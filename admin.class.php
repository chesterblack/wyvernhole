<?php

    class admin
    {
        public $database;
        public $collection;

        /**
         * 
         * Sets up mongodb connection
         * 
         * @return void
         */
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

        /**
         * 
         * Sets 404 header and displays 404 page
         * 
         * @return void 
         */
        public function get404() {
            header("HTTP/1.1 404 Not Found");
            require __DIR__ . "/admin/404.php";
            die();
        }

        public function getRoom($id, $type) {
            $collection = $this->database->$type;
            $room = $collection->findOne(['id' => $id]);
            return $room;
        }

        public function updateField($id, $type, $field, $data) {
            $collection = $this->database->$type;
            $result = $collection->updateOne(
                ['id' => $id],
                ['$set' => [$field => json_decode($data)]]
            );
            return $result;
        }

        public function removeOption($parentID, $childID, $text) {
            $collection = $this->database->rooms;
            $result = $collection->updateOne(
                ['id' => $parentID],
                ['$pull' => ['options' => [
                    'id' => $childID,
                    'text' => $text,
                ]]]
            );
            return $result;
        }

        public function addOption($parentID, $childID, $text) {
            $collection = $this->database->rooms;
            $result = $collection->updateOne(
                ['id' => $parentID],
                ['$addToSet' => ['options' => [
                    'id' => $childID,
                    'text' => $text,
                ]]]
            );
            return $result;
        }
    }

    $admin = new admin;