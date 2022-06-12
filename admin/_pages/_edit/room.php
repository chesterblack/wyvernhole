<?php
    $segments = explode("/", $_SERVER['REQUEST_URI']);
    $id = doubleval(array_pop($segments));

    $collection = $admin->database->rooms;
    $room = $collection->findOne(['id' => $id]);

    if (!$room) {
        $admin->get404();
    }
?>

    <h1>Edit <?= $room->name ?? 'Room '.$id; ?></h1>

    <section>
        <div>
            Name
            <input type="text" name="name" value="<?= $room->name ?? ''; ?>" placeholder="Castle entrance hall">
        </div>

        <div>
            Message
            <textarea type="text" name="message"><?= $room->message ?? ''; ?></textarea>
        </div>
    </section>

    <section>
        <h2>Options</h2>
        <div class="existing-options">
            <?php
                if (isset($room->options)) {
                    foreach ($room->options as $option) {
            ?>
            <div class="admin-option" data-roomid="<?= $option->id; ?>" data-roomtext="<?= $option->text; ?>">
                <a href="/admin/rooms/edit/<?= $option->id; ?>" class="btn">
                    <?= $option->text.' ['.$option->id.']'; ?>
                </a>
                <button class="delete-option" data-roomid="<?= $option->id; ?>" data-roomtext="<?= $option->text; ?>">-</button>
            </div>
            <?php
                    }
                }
            ?>
        </div>
        <div class="admin-option">
            <input class="add-input-text-option" type="text" placeholder="Text for option">
            <input class="add-input-id-option" type="text" placeholder="ID of room">
            <button class="add-option">+</button>
        </div>
    </section>

    <section>
        <h2>Dialogue</h2>
        <div class="existing-dialogue">
            <?php
                if (isset($room->dialogue)) {
                    foreach ($room->dialogue as $dialogue) {
            ?>
                <div class="dialogue-option">
                    <div class="admin-option">
                        <button class="delete-dia">-</button>
                        <div class="speaker" style="color: <?= $dialogue->speaker->color; ?>"><?= $dialogue->speaker->name; ?></div>
                    </div>
                    <div class="message" class="admin-option">
                        <div ><?= $dialogue->message; ?></div>
                    </div>
                </div>
            <?php
                    }
                }
            ?>
        </div>
        <div class="dialogue-option-new">
            <div class="admin-option">
                <input type="text" placeholder="Speaker" class="add-speaker-dia">
                <input type="text" placeholder="Color" class="add-color-dia">
                <button class="add-dia">+</button>
            </div>
            <div class="admin-option">
                <textarea class="add-message-dia" placeholder="Message"></textarea>
            </div>
        </div>
    </section>

    <a href="/?room=<?= $id; ?>" class="btn" target="_blank">View room</a>

    <script src="/admin/room-js.js"></script>
    <script>
        // OPTIONS
        const optionAddButton = document.querySelector('.add-option');
        const optionAddInputID = document.querySelector('.add-input-id-option');
        const optionAddInputText = document.querySelector('.add-input-text-option');
        const optionDeleteButtons = document.querySelectorAll('.delete-option');

        for (let i = 0; i < optionDeleteButtons.length; i++) {
            const button = optionDeleteButtons[i];
            button.addEventListener('click', () => {
                const id = button.dataset.roomid;
                const text = button.dataset.roomtext;
                removeRoomOption('<?= $id; ?>', id, text, button);
            });
        }

        optionAddButton.addEventListener('click', async () => {
            const newRoomID = parseInt(optionAddInputID.value);
            const newRoomText = optionAddInputText.value;
            let success = await addRoomOption('<?= $id; ?>', newRoomID, newRoomText);
            if (success) {
                optionAddInputID.value = '';
                optionAddInputText.value = '';
            }
        });

        optionAddInputID.addEventListener('keyup', () => {
            optionAddInputID.classList.remove('error');
            optionAddInputID.placeholder = 'ID of room';
        });
        // /OPTIONS

        // DIALOGUE
        const dialogueAddButton = document.querySelector('.add-dia');
        const dialogueDeleteButtons = document.querySelectorAll('.delete-dia');

        for (let i = 0; i < dialogueDeleteButtons.length; i++) {
            const button = dialogueDeleteButtons[i];
            
            button.addEventListener('click', () => {
                const parent = button.parentElement.parentElement;
                const speaker = parent.querySelector('.speaker');
                let color = speaker.style.color;
                color = rgbToHex(color);
                const name = speaker.innerText
                const message = parent.querySelector('.message').innerText;

                removeDialogueOption('<?= $id; ?>', name, color, message, parent);
            })
        };

        dialogueAddButton.addEventListener('click', () => {
            const speaker = document.querySelector('.add-speaker-dia').value;
            let color = document.querySelector('.add-color-dia').value;
            color = color == '' ? '#ffffff' : color;
            const message = document.querySelector('.add-message-dia').value;
            const hexRegex = /\#[0-9A-Fa-f]{6}/g;
            const hexlessRegex = /[0-9A-Fa-f]{6}/g;
            if (!hexRegex.test(color)) {
                if (hexlessRegex.test(color)) {
                    color = '#'+color;
                } else {
                    alert('Invalid hex code for the colour');
                    return;
                }
            }
            addDialogueOption('<?= $id; ?>', speaker, color, message);
        });
    </script>