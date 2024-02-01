sphere_1 = document.getElementById('sphere_1');
sphere_2 = document.getElementById('sphere_2');
sphere_3 = document.getElementById('sphere_3');

d = document.getElementById('d');
f = document.getElementById('f');

s1 = document.getElementById('skill1');
s2 = document.getElementById('skill2');

let lastSpell = 0;

const skillsMas = [
  {id: 1, name: "Cold Snap", src: "cold-snap.jpg", pool: [3,0,0]},
  {id: 2, name: "Ghost Walk", src: "ghost-walk.jpg", pool: [2,1,0]},
  {id: 3, name: "Ice Wall", src: "ice-wall.jpg", pool: [2,0,1]},
  {id: 4, name: "EMP", src: "emp.jpg", pool: [0,3,0]},
  {id: 5, name: "Tornado", src: "tornado.jpg", pool: [1,2,0]},
  {id: 6, name: "Alacrity", src: "alacrity.jpg", pool: [0,2,1]},
  {id: 7, name: "Sun Strike", src: "sun-strike.jpg", pool: [0,0,3]},
  {id: 8, name: "Forged Spirit", src: "forged-spirit.jpg", pool: [1,0,2]},
  {id: 9, name: "Chaos Meteor", src: "chaos-meteor.jpg", pool: [0,1,2]},
  {id: 10, name: "Deafening Blast", src: "deafening-blast.jpg", pool: [1,1,1]}
];
let skillPool = [0,0,0];

document.addEventListener('keydown', function(e){
	if (e.code === 'KeyQ') {
		rollBack('q', 'quas.jpg',e);
	}
	else if (e.code === 'KeyW') {
		rollBack('w', 'wex.jpg',e);
	}
	else if (e.code === 'KeyE') {
		rollBack('e', 'exort.jpg',e);
	}
	else if (e.code === 'KeyR') {
		invoke();
	}
	else if (e.code === 'Space') {
		invoke();
	}
});

function rollBack(btn, imageSrc) {
	skillPool = [0,0,0];
	sphere_3.textContent = sphere_2.textContent;
  sphere_2.textContent = sphere_1.textContent;
	sphere_1.textContent = btn;
	
	sphere_3.src = sphere_2.src;
    sphere_2.src = sphere_1.src;
    sphere_1.src = 'images/' + imageSrc;
	
	switch(sphere_1.textContent) {
		case 'q':
			skillPool[0]++;
			break;
		case 'w':
			skillPool[1]++;
			break;
		case 'e':
			skillPool[2]++;
			break;
	}
	switch(sphere_2.textContent) {
		case 'q':
			skillPool[0]++;
			break;
		case 'w':
			skillPool[1]++;
			break;
		case 'e':
			skillPool[2]++;
			break;
	}
	switch(sphere_3.textContent) {
		case 'q':
			skillPool[0]++;
			break;
		case 'w':
			skillPool[1]++;
			break;
		case 'e':
			skillPool[2]++;
			break;
	}
}

function rollBackSkill(id) {
	f.src = d.src;
	d.src = 'images/' + skillsMas[id].src;
	lastSpell = id;
}

function invoke() {
	let item = skillsMas.findIndex(skill => skill.pool[0] == skillPool[0] & skill.pool[1] == skillPool[1] & skill.pool[2] == skillPool[2])

	if (item == -1) {
		return;
	}
	console.log(lastSpell)
	if (item != lastSpell) {
		rollBackSkill(item);
	}
	
}

function startGame() {
	
}

let seconds = 0;
let milliseconds = 0;
let intervalId;
let stopTimer = true;

function start() {
	if (!stopTimer) {
    stopTimer = true;
  }
	stopTimer = false;
  intervalId = setInterval(updateTimer, 10); // Обновление таймера каждые 10 миллисекунд
}

function updateTimer() {
	if (stopTimer) {
		clearInterval(intervalId);
	}
  milliseconds += 10; 

  if (milliseconds === 1000) {
    // Если достигли 1000 миллисекунд (1 секунда), сбрасываем миллисекунды и увеличиваем секунды
    milliseconds = 0;
    seconds++;
  }

  if (seconds === 100) {
    // Если достигли 2 секунд, останавливаем таймер
    clearInterval(intervalId);
  }

  // Обновляем текст элемента с id "timer" на текущее значение секунд и миллисекунд
  //document.getElementById("timer").innerText = `${seconds}:${Math.floor(milliseconds / 100)}`;
}