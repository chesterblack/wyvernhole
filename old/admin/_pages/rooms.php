<?php
    $collection = $admin->database->rooms;
    $rooms = [];
    $results = $collection->find();

    foreach ($results as $result) {
        $rooms[] = $result;
    }

    usort($rooms, function($a, $b) {
        return ($a->id < $b->id) ? -1 : 1;
    });
?>

<h1>Rooms</h1>
<hr>
<button class="add-new-room">Add New</button>
<table>
    <thead>
        <tr>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
            <th>
                Message
            </th>
        </tr>
    </thead>
    <tbody>
    <?php
        foreach ($rooms as $room) {
    ?>
        <tr onclick="link(<?= $room->id; ?>)">
            <td><?= $room->id ?? 'n/a'; ?></td>
            <td><?= $room->name ?? ''; ?></td>
            <td><?= $room->message ?? ''; ?></td>
        </tr>
    <?php
        }
    ?>
    </tbody>
</table>
<button class="add-new-room">Add New</button>

<script>
    function link(id) {
        window.location.href = '/admin/rooms/edit/'+id;
    }

    let addNewRoomButtons = document.querySelectorAll('.add-new-room');

    for (let i = 0; i < addNewRoomButtons.length; i++) {
        const button = addNewRoomButtons[i];
        button.addEventListener('click', () => {
            console.log('clicked');
            let JSONdata = JSON.stringify({
                type: 'rooms'
            });
            console.log(JSONdata);
            fetch('/admin/_utilities/add-document.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            })
                .then((response) => response.text())
                .then((response) => {
                    let id = parseInt(response);
                    link(id);
                })
        })
    }
</script>