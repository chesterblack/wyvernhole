<?php
    include_once($_SERVER['DOCUMENT_ROOT'] . '/layouts/header.php');
?>
    <div class="counters">
        <div id="money-counter">
            Money: <span class="gold"><span id="gold"></span>gp</span>
        </div>
        <div id="health-counter">
            Health: <span id="health"></span>/<span id="maxHealth"></span>
        </div>
        <div id="drunkenness-counter">
            Drunkenness: <span id="drunkenness">0</span>
        </div>
        <div>
            Attack: <span id="attack"></span>
        </div>
        <div>
            Defence: <span id="defence"></span>
        </div>
    </div>

    <div class="menu-wrapper">
        <button onclick="toggleMenu('options')">Options</button>
        <button onclick="toggleMenu('inventory-menu')" id="inv-button">Inventory</button>
        <button onclick="toggleMenu('quests-menu')" id="quests-button">Quests</button>

        <div id="inventory-menu" class="menu closed">
            <button onclick="toggleMenu('inventory-menu')">Close</button>
            <div id="inventory"></div>
        </div>
        <div id="quests-menu" class="menu closed">
            <button onclick="toggleMenu('quests-menu')">Close</button>
            <div id="quests"></div>
        </div>
        <div id="options" class="menu closed">
            <button onclick="toggleMenu('options')">Close</button>
            <div>
                Text Speed:
                <input type="number" id="text-speed" value="10" />
            </div>
            <div>
                Save game:
                <input id="save-game" type="text" />
                <button onclick="copySaveCode()" id="copy-button">Copy</button>
            </div>
            <div>
                Load game:
                <input type="text" id="load-game" />
                <button onclick="loadGame()">Load</button>
            </div>
            <div>
                <button onclick="newGame()">New Game</button>
            </div>
            <div>
                <button onclick="toggleAutosave()">Autosave: <span id="autosave">on</span></button>
            </div>
        </div>
    </div>

    <div id="text"></div>
    <div id="dialogue"></div>
    <div id="responses"></div>

    <script type="text/javascript" src="game.js"></script>
<?php
    include_once($_SERVER['DOCUMENT_ROOT'] . '/layouts/footer.php');
?>