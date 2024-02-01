const sphere_1 = document.getElementById('sphere_1');
const sphere_2 = document.getElementById('sphere_2');
const sphere_3 = document.getElementById('sphere_3');

const btnStart = document.getElementById("btnStart");

const taskElement = document.getElementById("task");
const taskImage = document.getElementById("task__image");

const d = document.getElementById('d');
const f = document.getElementById('f');

const s1 = document.getElementById('skill1');
const s2 = document.getElementById('skill2');

let lastSpell = 0;
let countCards = 0;
let canPlay = false;
let cardSpellId = -1;

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
		if(!canPlay) {
			startGame();
		}
		else {
			stopTimer();
		taskImage.style.display = "none";
		document.getElementById("timer").innerText = "";
		taskElement.textContent = "";
		btnStart.disabled = false;
		canPlay = false;
		}
		
	}
});

function rollBack(btn, imageSrc) {
	if(!canPlay) {
		return;
	}
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
	if (item != lastSpell && countCards < 10) {
		rollBackSkill(item);
		if (item + 1 == cardSpellId) {
			nextCard();
		}
	}
}

function nextCard() {
	countCards++;
	previousId = setRandomValues(previousId);
}

function startGame() {
	startTimer();
	taskImage.style.display = "initial";
	document.getElementById("timer").innerText = "";
	previousId = setRandomValues(-1);
	countCards = 0;
	btnStart.disabled = true; 
	canPlay = true;

}

//*************
let intervalVariable = undefined;  
let timeleft = 0;  
let totaltime = 0;  

const startTimer = () => {  
   // Создаем интервал, который будет считать нам время
  intervalVariable = setInterval(updateTime, 100); 
  
	timeleft = 0;  
	totaltime = 0;   
}  

 const resetTimer = () => {  
   // Останавливаем таймер
   stopTimer();
   timeleft = 0;
   
   // Обновляем значение в ui
   updateTime();  
}  

const stopTimer = () => {
   // Производим очистку интервала
   clearInterval(intervalVariable);  
	 intervalVariable = undefined;
} 

function updateTime() {
  // Шаг 10 миллисекунд
  timeleft = timeleft + 100;  
  let milli = timeleft % 1000;  
	if (Math.floor(timeleft / 1000) > 100 || countCards >= 10) {
		stopTimer();
		taskImage.style.display = "none";
		document.getElementById("timer").innerText = `${Math.floor(timeleft / 1000)}.${Math.floor(milli / 100)} sec`;
		taskElement.textContent = "";
		btnStart.disabled = false;
		canPlay = false;
	}
}  


function setRandomValues(previousId) {
  let randomIndex = Math.floor(Math.random() * skillsMas.length);
  if (previousId !== -1) {
    while (skillsMas[randomIndex].id === previousId) {
      randomIndex = Math.floor(Math.random() * skillsMas.length);
    }
  }
  const randomSkill = skillsMas[randomIndex];
  taskImage.src = 'images/' + randomSkill.src;
  taskElement.textContent = randomSkill.name;
	cardSpellId = randomSkill.id;
  return randomSkill.id;
}
