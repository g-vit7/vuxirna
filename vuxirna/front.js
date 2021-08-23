// Simple variables ---
const scr = document.getElementById("screen"),
	menus = scr.getElementsByClassName("menu"),
	d = document.documentElement,
	actions = document.getElementById("actions");
	text = document.getElementById("text"),
	inv = document.getElementById("inv"),
	invDesc = document.getElementById("invDesc");
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

	if(option.targetItem !== null && option.targetItem !== undefined){
		Object.assign(option.targetItem, option.setState);
		console.log(option.targetItem.name + ", " + option.setState);
	}

	showTextNode(nextTextNodeId);
}

function change(target){
	if(target=='inventory'){
		let holding = allItems.filter((item) => {
			return item.state == 3;
		})
		
		if(holding.length==0){
			inv.innerHTML="Your inventory is empty.";
		} else {
			inv.innerHTML="";
		}
		holding.forEach((item) => {
			const aItem = document.createElement('a');
			aItem.innerText = item.name;
			aItem.classList.add('invItems');
			
			aItem.addEventListener('mouseenter', ()=> invDesc.innerText=item.desc);
			aItem.addEventListener('mouseout', ()=> invDesc.innerHTML="Hover over the item to see its description.<br>Click to see detailed info.");
			aItem.addEventListener('click', ()=> {
				const invChild = inv.childNodes;
				for(i=0;i<invChild.length;i++){
					invChild[i].classList.remove('selectedInvItem');
				}
				aItem.classList.add('selectedInvItem');
			});
			inv.appendChild(aItem);
		})
		holding = [];
	}
	for(i=0;i<menus.length;i++){
		menus[i].style.display="none";
	}	
	document.getElementById(target).style.display="block";
}

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

const testing = [{
	item: vux
}]
