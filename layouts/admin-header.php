<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wyvernhole</title>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/game.css">
</head>

<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/admin.class.php');
?>


<body id="body">
    <div class="container">
        <header>
            <nav class="main-nav">
                <?php
                    if (isset($args['backlink'])) {
                ?>
                    <a href="<?= $args['backlink']; ?>" class="btn">< Back</a>
                <?php
                    }
                ?>
                <a href="/admin" class="btn">Home</a>
                <a href="/" class="btn">Play</a>
            </nav>
        </header>

        