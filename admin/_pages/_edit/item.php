<?php
    $segments = explode("/", $_SERVER['REQUEST_URI']);
    $id = doubleval(array_pop($segments));

    $collection = $admin->database->items;
    $item = $collection->findOne(['id' => $id]);

    if (!$item) {
        $admin->get404();
    }
?>


    <h1>Edit <?= $item->name ?? 'Item '.$id; ?></h1>

    <section>
        <div>
            Name
            <input type="text" name="name" value="<?= $item->name ?? ''; ?>" placeholder="Vorpal Blade">
        </div>
    </section>