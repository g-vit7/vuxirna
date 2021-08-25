// Simple variables ---
const scr = document.getElementById("screen"),
	menus = scr.getElementsByClassName("menu"),
	d = document.documentElement,
	actions = document.getElementById("actions");
	text = document.getElementById("text"),
	inv = document.getElementById("inv"),
	invDesc = document.getElementById("invDesc"),
	notifications = document.getElementById("notifications"),
	nicon = document.getElementById("nicon"),
	ntxt = document.getElementById("ntxt");
var savepoint;

// Functions ----------
function startGame(chk){
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
		
		if(typeof(option.chk)=="undefined"){
			option.chk = function(){return true}
		}
		if(option.chk()){
			const button = document.createElement('button');
			button.innerText = option.text;
			button.classList.add('click')
			button.addEventListener('click', ()=> selectOption(option));
			actions.appendChild(button);
		}
		if(typeof(option.itemText)!=="undefined" && option.chk()){
			text.innerText+=option.itemText;
		}
	})
}

function selectOption(option){
	if(option.func !== null && option.func !== undefined){
		option.func();
	}
	
	const nextTextNodeId = option.nextText;
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

function notify(type,arg){
	if(type=="item"){
		ntxt.innerText=arg.name + "  has been acquired.";
	}
	
	
	fadeIn(notifications);
	setTimeout(function(){fadeOut(notifications)},5000);
}

function fadeIn(element){
	element.classList.remove("fadingIn","fadingOut");
	element.classList.add("fadingIn");
	element.style.display="block";
}

function fadeOut(element){
	element.classList.remove("fadingOut","fadingIn");
	element.classList.add("fadingOut");
	setTimeout(function(){element.style.display="none";},1000);
}

document.getElementById('nclose').onclick=()=>{
	notifications.style.display='none';
}

nicon.onclick = () => change('inventory');

change('main');
startGame(1);
