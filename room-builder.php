<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room builder</title>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./game.css"></head>
</head>
<body>
    <div class="container">
        <form id="new-room-form" action="" method="POST">
            <h2>Create new room</h2>
            <input type="text" name="message" id="message" placeholder="Message" />

            <div id="dialogues">
                <button type="button" onclick="addDialogue()">Dialogue +</button>
            </div>
            <div id="option">
                <button type="button" onclick="addOption()">Option +</button>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
    <script>
        const form = document.getElementById('new-room-form');
        const dialogueContainer = document.getElementById('dialogues');
        const optionsContainer = document.getElementById('option');
        let dialogueI = 0;
        let optionI = 0;

        function addDialogue() {
            let container = document.createElement("div");
            container.classList.add("dialogue");

            let dialogueMessage = document.createElement("input");
            dialogueMessage.type = "text";
            dialogueMessage.name = "dialogue["+dialogueI+"][message]";
            dialogueMessage.placeholder = "Dialogue Message";

            let speakerName = document.createElement("input");
            speakerName.type = "text";
            speakerName.name = "dialogue["+dialogueI+"][speaker][name]";
            speakerName.placeholder = "Speaker Name";

            let speakerColor = document.createElement("input");
            speakerColor.type = "text";
            speakerColor.name = "dialogue["+dialogueI+"][speaker][color]";
            speakerColor.placeholder = "Speaker Color";

            let deleteDialogue = document.createElement("button");
            deleteDialogue.type = "button";
            deleteDialogue.innerHTML = "-";
            deleteDialogue.classList.add("delete");
            deleteDialogue.addEventListener("click", (e) => {
                let parent = e.target.parentElement
                parent.parentNode.removeChild(parent)
            });

            container.appendChild(dialogueMessage);
            container.appendChild(speakerName);
            container.appendChild(speakerColor);
            container.appendChild(deleteDialogue);

            dialogueContainer.appendChild(container);

            dialogueI++;
        }

        function addOption() {
            let container = document.createElement("div");
            container.classList.add("dialogue");

            let optionText = document.createElement("input");
            optionText.type = "text";
            optionText.name = "options["+optionI+"][text]";
            optionText.placeholder = "Option Text";

            let optionID = document.createElement("input");
            optionID.type = "number";
            optionID.name = "options["+optionI+"][id]";
            optionID.placeholder = "Room ID";

            let deleteOption = document.createElement("button");
            deleteOption.type = "button";
            deleteOption.innerHTML = "-";
            deleteOption.classList.add("delete");
            deleteOption.addEventListener("click", (e) => {
                let parent = e.target.parentElement
                parent.parentNode.removeChild(parent)
            });

            container.appendChild(optionText);
            container.appendChild(optionID);
            container.appendChild(deleteOption);

            optionsContainer.appendChild(container);

            optionI++;
        }
    </script>
</body>

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
    

        if ($_POST) {
            $stmt = connect()->prepare('SELECT `id` FROM rooms ORDER BY id DESC LIMIT 1');
            $stmt->execute();
            $results = $stmt->fetch();
            $lastID = $results['id'];
            $id = intval($lastID) + 1;

            $data = [
                "id" => $id,
            ];

            $data['message'] = $_POST['message'] ?? "";

            foreach($_POST['dialogue'] as $dialogue) {
                $data['dialogue'][] = $dialogue;
            }
            $i = 0;
            foreach($_POST['options'] as $option) {
                $data['options'][$i]['text'] = $option['text'];
                $data['options'][$i]['id'] = intval($option['id']);
                $i++;
            }

            $data = json_encode($data);

            try {
                $stmt = connect()->prepare('INSERT INTO rooms VALUES (:id, :data)');
                $stmt->execute(['id' => $id, 'data' => $data]);
                echo "New data inserted";
            } catch (Throwable $t) {
                echo $t->getMessage();
            }
        }