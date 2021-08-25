class Entity {
	constructor(id, name, hp){
		this.id=id;
		this.name=name;
		this.hp=hp;
	}
}

class Player extends Entity {
	constructor(id, name, hp, level, ability){
		super(id, name, hp);
		this.level=level;
		this.ability=ability;
	}
}

class Item {
    constructor(name, state, amount) {
        this.name = name;
        this.state = state;
		this.amount = amount;
    }
};

/* 
The possible states of an Item:
0: is out-of-play (destroyed or not yet introduced).
1: is somewhere in the game world, but not yet found by the player.
2: is near and can be grabbed.
3: is in the player's possession.
*/

class Weapon extends Item {
	constructor(name, state, amount, dmg){
		super(name, state, amount);
		this.dmg = dmg;
	}
}

class Vuxirna extends Item {
	constructor(name, state, amount, souls){
		super(name, state, amount);
		this.souls = souls;
	}
}

var allItems = [
	vux = new Vuxirna("Old Vuxirna",1,1,0),
	dagger = new Weapon("Dagger",1,1,4),
	light = new Item("Lit Stone",1,1)
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
			targetItem: light,
			chk:function(){
				if(this.targetItem.state==3){
					return false;
				} else {
					return true;
				}
			},
			func:function(){
				this.targetItem.state=3;
				notify("item",this.targetItem);
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
			targetItem: vux,
			chk:function(){
				if(this.targetItem.state==3){
					return false;
				} else {
					return true;
				}
			},
			nextText: 7
		},{
			text:"Grab the dagger",
			itemText: " There is a dagger on the ground, next to the door.",
			targetItem: dagger,
			chk:function(){
				if(this.targetItem.state==3){
					return false;
				} else {
					return true;
				}
			},
			func:function(){
				this.targetItem.state=3;
				notify("item",this.targetItem);
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
			targetItem: vux,
			chk:function(){
				if(this.targetItem.state==3){
					return false;
				} else {
					return true;
				}
			},
			nextText: 7
		},{
			text:"Grab the dagger",
			itemText: " There is a dagger on the ground, next to the door.",
			targetItem: dagger,
			chk:function(){
				if(this.targetItem.state==3){
					return false;
				} else {
					return true;
				}
			},
			func:function(){
				this.targetItem.state=3;
				notify("item",this.targetItem);
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
			targetItem: vux,
			func:function(){
				this.targetItem.state=3;
				notify("item",this.targetItem);
			},
			nextText: 8
		},{
			text:"Go back",
			nextText: 6
		}]
	},
	{
		id: 8,
		text: "You pick it up. It is as warm as your body. It feels soft, even if it is rock hard, and it makes you feel watched.",
		options: [{
			text:"Leave room",
			nextText: 10
		},{
			text:"Go back",
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
	{
		id: 10,
		text: "You are outside.",
		options: [{
			text:"Enter room",
			nextText: 6
		},{
			text:"Proceed",
			nextText: 10
		}]
	}
]