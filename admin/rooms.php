<?php
    $collection = $admin->database->rooms;
    $rooms = [];
    $results = $collection->find();

    foreach ($results as $result) {
        $rooms[] = $result;
    }

    function sortResults($a, $b) {
        return ($a->id < $b->id) ? -1 : 1;
    }

    usort($rooms, "sortResults");
?>

<h1>Rooms</h1>
<hr>
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

<script>
    function link(id) {
        window.location.href = '/admin/edit/'+id;
    }
</script>