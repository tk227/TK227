let towers = [[], [], []];
let steps = [];
let stopFlag = false;
let speed = 1500;

async function startGame() {
    let numDisks = parseInt(document.getElementById("disk-input").value);
    towers = [[], [], []];
    steps = [];
    stopFlag = false;

    document.getElementById("tower1").innerHTML = '<div class="peg">Tower 1</div>';
    document.getElementById("tower2").innerHTML = '<div class="peg">Tower 2</div>';
    document.getElementById("tower3").innerHTML = '<div class="peg">Tower 3</div>';
    document.getElementById("step-list").innerHTML = '';

    // Initialize towers with disks
    for (let i = numDisks; i > 0; i--) {
        towers[0].push(i);
    }

    displayTowers();
    hanoi(numDisks, 0, 1, 2);
    await visualizeSteps();
}

function stopGame() {
    stopFlag = true;
}

function resetGame() {
    towers = [[], [], []];
    steps = [];
    stopFlag = false;
    displayTowers();
    document.getElementById("step-list").innerHTML = '';
}

function hanoi(n, from, to, temp) {
    if (n > 0) {
        hanoi(n - 1, from, temp, to);
        steps.push({ from: from, to: to });
        hanoi(n - 1, temp, to, from);
    }
}

function displayTowers() {
    for (let i = 0; i < 3; i++) {
        let towerDiv = document.getElementById(`tower${i + 1}`);
        towerDiv.innerHTML = '<div class="peg">Tower ' + (i + 1) + '</div>';
        for (let j = towers[i].length - 1; j >= 0; j--) {
            let diskSize = towers[i][j] * 20 + 'px';
            let disk = document.createElement('div');
            disk.className = 'disk';
            disk.style.width = diskSize;
            disk.innerHTML = towers[i][j];
            towerDiv.appendChild(disk);
        }
    }
}

async function visualizeSteps() {
    for (let i = 0; i < steps.length; i++) {
        if (stopFlag) break;

        moveDisk(steps[i].from, steps[i].to);
        await sleep(speed);
    }
}

function moveDisk(from, to) {
    let disk = towers[from].pop();
    towers[to].push(disk);
    displayTowers();
    let stepItem = document.createElement("li");
    stepItem.textContent = `Move disk ${disk} from Tower ${from + 1} to Tower ${to + 1}`;
    document.getElementById("step-list").appendChild(stepItem);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
