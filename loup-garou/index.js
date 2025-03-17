let players = [];
let assignments = [];
let currentPlayerIndex = 0;
let finalResults = [];
let num_click = 0;

// Add a new player
function Addplayer() {
    const nameInput = document.getElementById("inputName");
    const name = nameInput.value.trim();

    if (!name) {
        alert("Please enter a valid name.");
        return;
    }

    if (players.includes(name)) {
        alert('This name is already taken.');
    } else {
        players.push(name);
        nameInput.value = '';
        updatePlayerList();
    }
}

// Remove a player
function removePlayer(playerName) {
    players = players.filter(player => player !== playerName);
    updatePlayerList();

    if (players.length < 6) {
        document.getElementById("RoleSelection").classList.add("hidden");
    }
}

// Update the player list display
function updatePlayerList() {
    const playerRemoveDiv = document.getElementById("playerRemoveDiv")
    const playerList = document.getElementById("playerList");
    playerList.innerHTML = `<strong>Players (${players.length}):</strong>`;
    playerRemoveDiv.innerHTML = '';

    players.forEach(player => {
        const playerDiv = document.createElement("div");
        playerDiv.textContent = player;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removePlayer(player);
        removeButton.classList.add("button2")

        playerDiv.appendChild(removeButton);
        playerRemoveDiv.appendChild(playerDiv);
    });
}

// Assign default roles
function AssignDefaultRoles() {
    if (players.length < 6) {
        alert('Minimum 6 players required');
        return;
    }

    const roles = [
        "Witch", "Hunter", "Seer",
        ...Array(2).fill("Werewolf"),
        ...Array(players.length - 5).fill("Villager")
    ];

    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
    assignments = players.map((player, index) => ({
        name: player,
        role: shuffledRoles[index]
    }));

    resetGameState();
    displayNextRole();
}

function assignCustomRoles() {

    const witchCount = parseInt(document.getElementById("witch").value) || 0;
    const hunterCount = parseInt(document.getElementById("hunter").value) || 0;
    const mayorCount = parseInt(document.getElementById("mayor").value) || 0;
    const loveKingCount = parseInt(document.getElementById("loveKing").value) || 0;
    const werewolfCount = parseInt(document.getElementById("werewolf").value) || 0;
    const SeerCount = parseInt(document.getElementById("Seer").value) || 0;
    const whitewolfCount = parseInt(document.getElementById("whitewolf").value) || 0;
    const bluewolfCount = parseInt(document.getElementById("bluewolf").value) || 0;
    const barbiCount = parseInt(document.getElementById("barbi").value) || 0;
    const healerCount = parseInt(document.getElementById("healer").value) || 0;
    const InfectedWolfCount = parseInt(document.getElementById("Infected Wolf").value) || 0;
    const RedWolfCount = parseInt(document.getElementById("RedWolf").value) || 0;
    const FogWolfCount = parseInt(document.getElementById("Fog Wolf").value) || 0;
    const BearCount = parseInt(document.getElementById("Bear").value) || 0;
    const MasterBearCount = parseInt(document.getElementById("Master Bear").value) || 0;
    const WildchildrenCount = parseInt(document.getElementById("Wild children").value) || 0;
    const kamikazeCount = parseInt(document.getElementById("kamikaze").value) || 0;
    const TalkativewolfCount = parseInt(document.getElementById("Talkative wolf").value) || 0;
    const judgeCount = parseInt(document.getElementById("judge").value) || 0;
    const ThiefCount = parseInt(document.getElementById("Thief").value) || 0;
    const alienCount = parseInt(document.getElementById("alien").value) || 0;

    const totalRoles = witchCount + hunterCount + mayorCount + loveKingCount + werewolfCount
                      + SeerCount + whitewolfCount + bluewolfCount + barbiCount + healerCount + InfectedWolfCount + alienCount + RedWolfCount + FogWolfCount
                      + BearCount + MasterBearCount + WildchildrenCount + kamikazeCount + TalkativewolfCount + judgeCount + ThiefCount;

    if (totalRoles > players.length) {
        alert("Total roles exceed the number of players.");
        return;
    }

    const roles = [
        ...Array(witchCount).fill("Witch"),
        ...Array(hunterCount).fill("Hunter"),
        ...Array(mayorCount).fill("Mayor"),
        ...Array(loveKingCount).fill("Love King"),
        ...Array(werewolfCount).fill("Werewolf"),
        ...Array(SeerCount).fill("Seer"),
        ...Array(whitewolfCount).fill("White Wolf"),
        ...Array(bluewolfCount).fill("Blue Wolf"),
        ...Array(barbiCount).fill("Barbi"),
        ...Array(healerCount).fill("Healer"),
        ...Array(InfectedWolfCount).fill("Infected Wolf"),
        ...Array(RedWolfCount).fill("Red Wolf"),
        ...Array(FogWolfCount).fill("Fog Wolf"),
        ...Array(BearCount).fill("Bear"),
        ...Array(MasterBearCount).fill("Master Bear"),
        ...Array(WildchildrenCount).fill("Wild children"),
        ...Array(kamikazeCount).fill("kamikaze"),
        ...Array(TalkativewolfCount).fill("Talkative wolf"),
        ...Array(judgeCount).fill("judge"),
        ...Array(ThiefCount).fill("Thief"),
        ...Array(alienCount).fill("Alien"),
        ...Array(players.length - totalRoles).fill("Villager")
    ];

    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
    assignments = players.map((player, index) => ({
        name: player,
        role: shuffledRoles[index]
    }));

    resetGameState();
    displayNextRole();
}

function resetGameState() {
    currentPlayerIndex = 0;
    num_click = 0;
    finalResults = [];
    document.getElementById("card").classList.remove("hidden");
}

function displayNextRole() {
    const roleDisplay = document.getElementById("roleDisplay");
    const player = assignments[currentPlayerIndex];

    if (num_click % 2 === 0) {
        // Display player name
        roleDisplay.innerHTML = `Player: ${player.name}`;
    } else {
        // Display player role
        roleDisplay.innerHTML = `Role: ${player.role}`;
        finalResults.push(`Player: ${player.name}, Role: ${player.role}`);
        currentPlayerIndex++;


        if (currentPlayerIndex >= assignments.length) {
            document.getElementById("resultBUtton").classList.remove("hidden");
            document.getElementById("card").classList.add("hidden");
            return;
        }
    }

    num_click++;
}

function afficherTousLesJoueurs() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = finalResults.join("<br>");
}

function closeCard() {
    resetGameState();
    document.getElementById("card").classList.add("hidden");
}

function playerRemoveButton(){
    const playerRemoveDiv = document.getElementById("playerRemoveDiv");
    playerRemoveDiv.classList.toggle("hidden");

    if (!playerRemoveDiv.classList.contains("hidden")) {
        updatePlayerList();
    }
}

function resultBUtton(){
    const resultDiv = document.getElementById("result");
    resultDiv.classList.toggle("hidden")
    if(!resultDiv.classList.contains("hidden")){
        afficherTousLesJoueurs();
    }
}

function parametre(){
    if (players.length < 6) {
        alert("Minimum 6 players required.");
        return;
    }
    if(players.length >= 6) {
        const RoleSelection = document.getElementById("RoleSelection");
        RoleSelection.classList.toggle("hidden")
    }
}





// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("card");
    if (card) {
        card.addEventListener("click", displayNextRole);
    } else {
        console.error("Card element not found!");
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        Addplayer();
    }
});