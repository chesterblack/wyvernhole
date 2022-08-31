<?php
    $collection = $admin->database->items;
    $items = [];
    $results = $collection->find();

    foreach ($results as $result) {
        $items[] = $result;
    }

    usort($items, function($a, $b) {
        return ($a->id < $b->id) ? -1 : 1;
    });
?>

<h1>Items</h1>
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
                Base Price
            </th>
            <th>
                Effects
            </th>
        </tr>
    </thead>
    <tbody>
    <?php
        foreach ($items as $item) {
    ?>
        <tr onclick="link(<?= $item->id; ?>)">
            <td><?= $item->id ?? 'n/a'; ?></td>
            <td><?= $item->name ?? ''; ?></td>
            <td><?= $item->basePrice ?? ''; ?></td>
            <td>
                <?php
                    $effects = [];
                    foreach ($item->effects as $effect) {
                        $effect = get_object_vars($effect);
                        $effectKey = key($effect);

                        $string = ucfirst($effectKey);
                        $string .= $effectKey >= 0 ? " +" : " -";
                        $string .= $effect[$effectKey];

                        $effects[] = $string;
                    }
                    if (count($effects) > 3) {
                        $effects = array_splice($effects, 0, 3);
                        $effects[] = "...";
                    }
                    echo implode(", ", $effects);
                ?>
            </td>
        </tr>
    <?php
        }
    ?>
    </tbody>
</table>

<script>
    function link(id) {
        window.location.href = '/admin/items/edit/'+id;
    }
</script>