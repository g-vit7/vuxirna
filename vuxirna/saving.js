function saveGame(){
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem('cMain',getComputedStyle(d).getPropertyValue("--main"));
		localStorage.setItem('cDark',getComputedStyle(d).getPropertyValue("--dark"));
		localStorage.setItem('cBehind',getComputedStyle(d).getPropertyValue("--behind"));
		localStorage.setItem('cLight',getComputedStyle(d).getPropertyValue("--light"));
		localStorage.setItem('cTxt',getComputedStyle(d).getPropertyValue("--txt"));
	
		localStorage.setItem('gSavepoint',savepoint);
		localStorage.setItem('gItems', JSON.stringify(allItems));
	
	} else {
		alert("Your browser does not support the saving system :/");
	}
}

function loadGame(){
	if(typeof(Storage) !== "undefined") {
		setTheme(
			localStorage.getItem('cMain'),
			localStorage.getItem('cDark'),
			localStorage.getItem('cBehind'),
			localStorage.getItem('cLight'),
			localStorage.getItem('cTxt'),
		);
		if(localStorage.getItem('gItems')!==null){
			allItems = JSON.parse(localStorage.getItem('gItems'));
		}
		startGame(parseInt(localStorage.getItem('gSavepoint')));
		
		
	} else {
		alert("Your browser does not support the saving system :/");
	}
}
