function startBattle(id){
	const mob = allEntities.find((enemy) => {
		return enemy.id==id;
	});
	console.log(mob.name);
	
	
}

function endBattle(situation){
	switch(situation){
		case "flee":
		
			break;
		case "victory":
		
			break;
		case "defeat":
		
			break;
	}
}