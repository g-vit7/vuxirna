class Entity {
	constructor(id, name, hp, maxHp, level, dmg){
		this.id=id;
		this.name=name;
		this.hp=hp;
		this.maxHp=maxHp;
		this.level=level;
		this.dmg=dmg;
	}
}

class Player extends Entity {
	constructor(id, name, hp, maxHp, level, dmg, ability, energy, maxEnergy){
		super(id, name, hp, maxHp, level, dmg);
		this.level=level;
		this.ability=ability;
		this.energy=energy;
		this.maxEnergy=maxEnergy;
	}
}

class Item {
    constructor(type, name, state, amount) {
        this.type = type;
		this.name = name;
        this.state = state;
		this.amount = amount;
    }
};

/* 
The possible states of an Item:
0: is out-of-play (destroyed or not yet introduced).
1: is in the player's inventory.
2: is equipped.
*/

class Weapon extends Item {
	constructor(type, name, state, amount, dmg){
		super(type, name, state, amount);
		this.dmg = dmg;
	}
}

class Vuxirna extends Item {
	constructor(type, name, state, amount, souls){
		super(type, name, state, amount);
		this.souls = souls;
	}
}

var allItems = [
	vux = new Vuxirna("Vuxirna","Old Vuxirna",0,1,0),
	dagger = new Weapon("Weapon","Dagger",0,1,4),
	light = new Item("Item","Lit Stone",0,1)
];

var allEntities = [
	player = new Player(0, "Mary", 100, 100, 1, 4, 0, 100, 100),
	lost = new Entity(1, "Lost Soul", 20, 20, 5, 1)
];

// Each item description.
vux.desc = "A black and strange gem with a deep and dark purple glow. It feels bad and good to hold it at the same time.";
dagger.desc = "A simple dagger. Probably not that useful, but better than nothing.";
light.desc = "A warm white stone, with a cozy light emanating from it.";

var inventory = [];

// The text nodes. -------------------------

const textNodes = [
	{
		id: 1,
		text: "...",
		options: [{
			text:"?",
			nextText: 2
		}]
	},
	{
		id: 2,
		text: "You are unconscious. You can't feel yourself. You are in complete nothingness, in the void of the dark.",
		options: [{
			text:"Wake up",
			nextText: 3
		}]
	},
	{
		id: 3,
		text: "Waking up is hard. You still try to concentrate your mind to it. At least now you can think.",
		options: [{
			text:"Wake up",
			nextText: 4
		}]
	},
	{
		id: 4,
		text: "You wake up. You are in a completely black place, which you don't see anything. There is something near your right foot.",
		options: [{
			text:"Pick it up",
			target: allItems[2],
			chk:function(){
				if(this.target.state==1){
					return false;
				} else {
					return true;
				}
			},
			func:function(){
				this.target.state=1;
				notify("item",this.target);
			},
			nextText: 5
		}]
	},
	{
		id: 5, // Room being lit
		text: "You pick it up. It is cold, but as the seconds pass, it gets warmer and warmer. At a certain point, it starts a light. It's faint, but enough to light up the place you're in.",
		options: [{
			text:"Examine the Black Gem",
			itemText: " There is a black gem with a triangular shape on a small and old table.",
			target: allItems[0],
			chk:function(){
				if(this.target.state==1){
					return false;
				} else {
					return true;
				}
			},
			nextText: 7
		},{
			text:"Grab the dagger",
			itemText: " There is a dagger on the ground, next to the door.",
			target: allItems[1],
			chk:function(){
				if(this.target.state==1){
					return false;
				} else {
					return true;
				}
			},
			func:function(){
				this.target.state=1;
				notify("item",this.target);
			},
			nextText: 9
		},{
			text:"Leave room",
			nextText: 10
		}]
	},
	{
		id: 6, // Room after
		text: "You are back in the room.",
		options: [{
			text:"Examine the Black Gem",
			itemText: " There is a black gem with a triangular shape on a small and old table.",
			target: allItems[0],
			chk:function(){
				if(this.target.state==1){
					return false;
				} else {
					return true;
				}
			},
			nextText: 7
		},{
			text:"Grab the dagger",
			itemText: " There is a dagger on the ground, next to the door.",
			target: allItems[1],
			chk:function(){
				if(this.target.state==1){
					return false;
				} else {
					return true;
				}
			},
			func:function(){
				this.target.state=1;
				notify("item",this.target);
			},
			nextText: 9
		},{
			text:"Leave room",
			nextText: 10
		}]
	},
	{
		id: 7,
		text: "You approach the Black Gem. It instantly made you feel a bad omen. You remember that this kind of stone was called Vuxirna.",
		options: [{
			text:"Pick it up",
			target: allItems[0],
			func:function(){
				this.target.state=1;
				notify("item",this.target);
			},
			nextText: 8
		},{
			text:"Go back",
			nextText: 6
		}]
	},
	{
		id: 8,
		text: "You pick it up. It is as warm as your body. It feels soft, even if it is rock hard, and it makes you feel watched. You start to have a small rememberance of something familiar.",
		options: [{
			text:"Remember",
			target:player,
			func:function(){
				this.target.name = window.prompt("What is your name?");
			},
			nextText: 80
		}]
	},
	{
		id: 80,
		text: "You remember your name, and a little of your past. You are "+player.name+". You used to live a peaceful life, and this peace, for some reason, has been destroyed.",
		options: [{
			text:"Proceed",
			nextText: 6
		}]
	},
	{
		id: 9,
		text: "You pick up the dagger. It is light and easy to use. It doesn't look too bad.",
		options: [{
			text:"Leave room",
			nextText: 10
		},{
			text:"Go back",
			nextText: 6
		}]
	},
	{	// outside before
		id: 10,
		text: "You leave the room, closing the old and almost falling door. You turn to see where you are, and are surprised by a dark and bizarre creature. It is slow, and you were able to evade it's attack. What do you do?",
		options: [{
			text:"Fight",
			nextText: 6
		},{
			text:"Run away",
			nextText: 10
		}]
	}
]