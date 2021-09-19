// Simple variables ---
const scr = document.getElementById("screen"),
	menus = scr.getElementsByClassName("menu"),
	d = document.documentElement,
	actions = document.getElementById("actions");
	text = document.getElementById("text"),
	inv = document.getElementById("inv"),
	invDesc = document.getElementById("invDesc"),
	invProps = document.getElementById("invProps"),
	notifications = document.getElementById("notifications"),
	nicon = document.getElementById("nicon"),
	ntxt = document.getElementById("ntxt"),
	equip = document.getElementById("equip"),
	unequip = document.getElementById("unequip"),
	hpBar = document.getElementById("hpBar"),
	enBar = document.getElementById("enBar");
	
var savepoint;

// Useful Functions ----------
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
			return item.state>0;
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
			aItem.addEventListener('mouseout', ()=> invDesc.innerHTML="Hover over the item to see its description.<br>Click to see detailed info.<br><br>You can equip one weapon at once.");
			aItem.addEventListener('click', ()=> {
				const invChild = inv.childNodes;
				if(aItem.classList.contains('selectedInvItem')){
					aItem.classList.remove('selectedInvItem');
					invProps.style.display="none";
					invDesc.style.display="block";
				} else {
					for(i=0;i<invChild.length;i++){
						invChild[i].classList.remove('selectedInvItem');
					}
					aItem.classList.add('selectedInvItem');
					invDesc.style.display="none";
					invProps.style.display="block";
				}	
				console.log(item);
				// This console log is to monitor the item.
				// When the Load function is called, allItems items lose
				// all their instances. This is very bad ._.
				
				document.getElementById("prop1").innerText = item.name;
				document.getElementById("prop2").innerText = item.amount;
				if(item.type=="Vuxirna"){
					document.getElementById("equip").style.display="none";
					document.getElementById("unequip").style.display="none";
					document.getElementById("p3").innerText = "Souls: ";
					document.getElementById("prop3").innerText = item.souls;
					
				} else if(item.type=="Weapon"){
					document.getElementById("p3").innerText = "Damage: ";
					document.getElementById("prop3").innerText = item.dmg;
					equip.onclick=function(){
						item.state=2;
						player.dmg+=item.dmg;
						document.getElementById("equip").style.display="none";
						document.getElementById("unequip").style.display="block";
						document.getElementById("eqp2").innerText = item.name;
						notify("equip",item);
					}
					unequip.onclick=function(){
						item.state=1;
						player.dmg-=item.dmg;
						document.getElementById("unequip").style.display="none";
						document.getElementById("equip").style.display="block";
						document.getElementById("eqp2").innerText = "None";
						notify("unequip",item);
					}
					
					document.getElementById("p3").innerText = "Damage: ";
					if(aItem.classList.contains('selectedInvItem')){	
						if(item.state==2){
							document.getElementById("equip").style.display="none";
							document.getElementById("unequip").style.display="block";
						} else {
							document.getElementById("unequip").style.display="none";
							document.getElementById("equip").style.display="block";
						}
					} else {
						document.getElementById("equip").style.display="none";
						document.getElementById("unequip").style.display="none";
					}
				} else if(item.type=="Item"){
					document.getElementById("equip").style.display="none";
					document.getElementById("unequip").style.display="none";
				}
			});
			inv.appendChild(aItem);
		})
		holding = [];
	} else if(target=='status'){
		document.getElementById("stt1").innerText = player.name;
		document.getElementById("stt2").innerText = player.level;
		document.getElementById("stt3").innerText = player.dmg;
		document.getElementById("stt4").innerText = player.ability;
		
		hpBar.style.width=player.hp/player.maxHp*100 + "%";
		hpBar.innerText=player.hp/player.maxHp*100 + "%";
		enBar.style.width=player.energy/player.maxEnergy*100 + "%";
		enBar.innerText=player.energy/player.maxEnergy*100 + "%";
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
	switch(type){
		case "item":
			ntxt.innerText=arg.name + " has been acquired.";
			break;
		case "equip":
			ntxt.innerText=arg.name + " has been equipped.";
			break;
		case "unequip":
			ntxt.innerText=arg.name + " has been unequipped.";
			break;
		default:
			ntxt.innerText = type;
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
