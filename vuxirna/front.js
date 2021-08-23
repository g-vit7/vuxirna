// Simple variables ---
const scr = document.getElementById("screen"),
	menus = scr.getElementsByClassName("menu"),
	d = document.documentElement,
	actions = document.getElementById("actions");
	b1 = document.getElementById("b1"),
	b2 = document.getElementById("b2"),
	text = document.getElementById("text"),
	inv = document.getElementById("inv");
var savepoint;
let state={};

// Functions ----------
function startGame(chk){
	state={};
	showTextNode(chk);
}

function showTextNode(textNodeIndex){
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
	text.innerText = textNode.text;
	savepoint = textNodeIndex;

	while(actions.firstChild){
		actions.removeChild(actions.firstChild);
	}
	
	textNode.options.forEach(option => {
		if(showOption(option)){
			const button = document.createElement('button');
			button.innerText = option.text;
			button.classList.add('click')
			button.addEventListener('click', ()=> selectOption(option));
			actions.appendChild(button);
		}
	})
}

function showOption(option){
	return option.requiredState == null || option.requiredState(state);
}

function selectOption(option){
	const nextTextNodeId = option.nextText;
	state = Object.assign(state, option.setState);
	showTextNode(nextTextNodeId);
}

function change(target){
	if(target=='inventory'){
		for (let i of allItems) {
			if (i.state === 3) {
				inventory.push(i);
			}
		}
		for(i=0;i<inventory.length;i++){
			inv.innerHTML+=inventory[i].name+'</span><br>';
		}
		console.log(inventory);
	} else {
		inv.innerHTML="";
		inventory=[];
	}
	for(i=0;i<menus.length;i++){
		menus[i].style.display="none";
	}	
	document.getElementById(target).style.display="block";
}

/* function prog(){
	switch(progress){
		case 0:
			text.innerHTML="You are unconscious. You can't feel yourself. You are in complete nothingness, in the void of the dark.";
			progress++;
			break;
		case 1:
			text.innerHTML="You still can't access your thoughts. You feel like you are empty. At least now you feel something.";
			progress++;
			break;
		case 2:
			text.innerHTML="Waking up is hard. You still try to concentrate your mind to it. At least now you can think.";
			progress++;
			break;
		case 3:
			text.innerHTML="You wake up. You are in a completely black place, which you don't see anything. There is something near your right foot.";
			b1.style.display="none";
			b2.style.display="block";
			b2.onclick = function(){
				progress++;
				prog();
			}
			break;
		case 4:
			text.innerHTML="You pick it up. It is cold, but as the seconds pass, it gets warmer and warmer. At a certain point, it starts a light. It's faint, but enough to light up the room you're in. There is a dagger on the ground, next to a door. There is also a black gem with a triangular shape on a small and old table."
			b1.style.display="block";
			b2.style.display="block";
			b1.innerHTML="Examine the Black Gem"
			b2.innerHTML="Grab the dagger"
			b1.onclick = function(){
				text.innerHTML="You approach the Black Gem. It instantly made you feel a bad omen. You remember that this kind of stone was called Vuxirna."
				b1.innerHTML="Pick it up";
				b2.style.display="none";
				b1.onclick = function(){
					text.innerHTML="You pick it up. It is as warm as your body. It feels soft, even if it is rock hard, and it makes you feel watched.";
					vux.state=3;
					b1.innerHTML="Go back";
					b1.onclick=function(){
					}
				}
			}
			b2.onclick = function() {
				text.innerHTML="You pick up the dagger. It is light and easy to use. It doesn't look too bad."
				dagger.state=3;
				b2.style.display="none";
			}
			progress++;
			break;
		case 5:
			text.innerHTML="";
			progress++;
			break;
	}
}*/

function setTheme(main,dark,behind,light,txt){
	d.style.setProperty('--main', main.toString());
	d.style.setProperty('--dark', dark.toString());
	d.style.setProperty('--behind', behind.toString());
	d.style.setProperty('--light', light.toString());
	d.style.setProperty('--txt', txt.toString());
	
}
// Some default settings.

change('main');
startGame(1);

