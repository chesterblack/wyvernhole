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
    <hr>

    <div>
        Name
        <input type="text" name="name" value="<?= $room->name ?? ''; ?>" placeholder="Castle entrance hall">
    </div>

    <div>
        Message
        <textarea type="text" name="message"><?= $room->message ?? ''; ?></textarea>
    </div>

    <div>
        Options
        <div class="existing-options">
            <?php
                foreach ($room->options as $option) {
            ?>
            <div class="admin-option">
                <a href="/admin/edit/<?= $option->id; ?>" class="btn">
                    <?= $option->text.' ['.$option->id.']'; ?>
                </a>
                <button class="delete" data-roomid="<?= $option->id; ?>" data-roomtext="<?= $option->text; ?>">-</button>
            </div>
            <?php
                }
            ?>
        </div>
        <div class="admin-option">
            <input class="add-input-text" type="text" placeholder="Text for option">
            <input class="add-input-id" type="text" placeholder="ID of room">
            <button class="add">+</button>
        </div>
    </div>

    <script>
        function deleteRoom(id, text) {
            let data = {
                parentid: '<?= $id; ?>',
                childid: id,
                text: text
            };
            data = JSON.stringify(data);

            fetch('/admin/remove-option.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data,
            });
        }
    
        let deleteButtons = document.querySelectorAll('.delete');
        for (let i = 0; i < deleteButtons.length; i++) {
            const button = deleteButtons[i];
            button.addEventListener('click', () => {
                const id = button.dataset.roomid;
                const text = button.dataset.roomtext;
                deleteRoom(id, text);
            })
        }

        const addButton = document.querySelector('.add');
        const addInputID = document.querySelector('.add-input-id');
        const addInputText = document.querySelector('.add-input-text');

        addInputID.addEventListener('keyup', () => {
            addInputID.classList.remove('error');
            addInputID.placeholder = 'ID of room';
        })

        addButton.addEventListener('click', () => {
            const newRoomID = parseInt(addInputID.value);
            const newRoomText = addInputText.value;
            let data = {
                parentid: '<?= $id; ?>',
                childid: newRoomID,
                text: newRoomText
            };

            let JSONdata = JSON.stringify(data);

            fetch('/admin/add-option.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            })
                .then(response => response.json())
                .then((response) => {
                    if (response == 'no room') {
                        addInputID.classList.add('error');
                        addInputID.value = '';
                        addInputID.placeholder = 'Invalid Id';
                    } else {
                        let newRoomContainer = document.createElement('div');
                        newRoomContainer.classList.add('admin-option');

                        let newRoomButton = document.createElement('a');
                        newRoomButton.classList.add('btn');
                        newRoomButton.href = `/admin/edit/${data.childid}`;
                        newRoomButton.innerHTML = `${data.text} [${data.childid}]`;

                        let newRoomDelete = document.createElement('button');
                        newRoomDelete.classList.add('delete');
                        newRoomDelete.dataset.roomid = data.childid;
                        newRoomDelete.innerHTML = '-';
                        newRoomDelete.addEventListener('click', () => {
                            deleteRoom(data.childid, data.text);
                        })

                        newRoomContainer.appendChild(newRoomButton);
                        newRoomContainer.appendChild(newRoomDelete);
                        document.querySelector('.existing-options').appendChild(newRoomContainer);

                        addInputID.value = '';
                        addInputText.value = '';
                    }
                })
        })
    </script>