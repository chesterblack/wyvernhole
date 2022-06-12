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

        public function getDocument($id, $type) {
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

        public function removeRoomOption($parentID, $childID, $text) {
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

        public function addRoomOption($parentID, $childID, $text) {
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

        public function removeDialogueOption($parentID, $speaker, $color, $message) {
            $collection = $this->database->rooms;
            $result = $collection->updateOne(
                ['id' => $parentID],
                ['$pull' => ['dialogue' => [
                    'speaker' => [
                        'name' => $speaker,
                        'color' => $color
                    ],
                    'message' => $message,
                ]]]
            );
            return $result;
        }

        public function addDialogueOption($parentID, $speaker, $color, $message) {
            $collection = $this->database->rooms;
            $result = $collection->updateOne(
                ['id' => $parentID],
                ['$addToSet' => ['dialogue' => [
                    'speaker' => [
                        'name' => $speaker,
                        'color' => $color,
                    ],
                    'message' => $message,
                ]]]
            );
            return $result;
        }

        public function getLatestID($type) {
            $all = $this->database->$type->find();
            $allArr = [];
            foreach ($all as $result) {
                $allArr[] = $result;
            }
            usort($allArr, function($a, $b) {
                return ($a->id < $b->id) ? -1 : 1;
            });
            return $allArr[count($allArr)-1]->id;
        }

        public function addDocument($type, $attributes = []) {
            if (!isset($attributes['id'])) {
                $biggestID = (int)$this->getLatestID($type);
                $newID = $biggestID + 1;
                $attributes['id'] = $newID;
            }

            $this->database->$type->insertOne($attributes);
            return $attributes['id'];
        }
    }

    $admin = new admin;