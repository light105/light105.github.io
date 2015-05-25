function state(st){
	this.board = [];
	this.length = null;
	this.blockSize = null;
	this.curZero = null;
	this.remZero = null;
	this.i = 0;

	if(st != undefined){
		this.board = st.board.slice();
		this.length = st.length;
		this.blockSize = st.blockSize;
		this.curZero = st.curZero;
		this.remZero = st.remZero;
	}
}

//Queue Structure
function Queue(){
	var list = [];
	var obj = {};

	obj.enqueue = function(st){
		if(st == undefined)
			return {error: "Lacks Parameter"};

		list = [st].concat(list);
	}

	obj.dequeue = function(){
		if(list.length == 0)
			return {error: "Queue Empty"}

		return list.pop();
	}

	return obj;
}



function BackTracker(){
	var bt = Queue();
	var initialState;
	var currentState;
	var input;
	var solutions = [];
	var conditions = [];
	var input_rules = [];

	var obj = {};

	obj.solve = function(){
		if(initialState == undefined)
			return {error: "BackTracker not Initialized"}

		console.log(input_rules);
		currentState = bt.dequeue();
		console.log("inrul1")
		console.log(currentState);

//		input = input_rules[0](currentState);

		input_rules.forEach(function(rule){
			rule(currentState, bt);
		});


		console.log("BT");
		console.log(bt)
//		input = input_rules[0](currentState);
		console.log(currentState);

		console.log(input);
	}

	obj.initialize = function(st, conds, inrules){
		initialState = new state(st);
		bt.enqueue(st);
		conditions = conds;
		input_rules = inrules;

	}

	obj.getSolutions = function(){
		return solutions;
	}

	obj.getInitialState = function(){
		return initialState;
	}

	obj.updateConditions = function(rules){
		conditions = rules;
	}


	function generateStates(){


	}

	function checkConditions(){

	}

	return obj;
}



function SudokuSolver(){
	var bt = BackTracker();
	var solutions;
	var board;

	var type;
	var solution_condition_list = [];
	var input_condition_list = [];
	var input_rule_list = [];


	initializeSolutionConditions();
	initializeInputConditions();
	initializeInputRules();

	var obj = {};

	obj.solve = function(){
		if(board == undefined)
			return {error: "Board not Initialized"};

		var st = new state();
		st.board = board;
		st.length = 9;
		st.blockSize = 3;
		st.curZero = 0;
		st.remZero = 64;

		bt.initialize(st, solution_condition_list, input_rule_list);

		if(bt.solve() != -1)
			solutions = bt.getSolutions();
		else
			solutions = undefined;

		console.log("BT")
		console.log(bt);
	}

	obj.initializeBoard = function(filename){
		board = [
					[0,0,2,0,5,0,0,7,0],
					[6,0,8,0,2,4,0,0,0],
					[0,0,0,7,0,0,0,0,0],
					[1,0,0,0,0,2,0,0,5],
					[0,6,9,0,0,0,8,1,0],
					[2,0,0,3,0,0,0,0,6],
					[0,0,0,0,0,8,0,0,0],
					[0,0,0,2,1,0,5,0,3],
					[0,2,0,0,6,0,1,0,0]
				]
	}

	obj.addSolutionCondition = function(condition){
		solution_condition_list.push(condition);
		updateRules();
	}

	obj.resetSolutionConditions = function(){
		initializeSolutionConditions();
		updateSolutionConditions();
	}

	function updateSolutionConditions(){
		bt.updateConditions(solution_condition_list);
	}

	//Default Sudoku Rules
	function initializeSolutionConditions(){
		solution_condition_list = [];

		solution_condition_list.push(function(st){
			if(st != undefined)
				return true;

			else
				return false;
		});
	}

	function initializeInputRules(){
		input_rule_list = [];

		input_rule_list.push(function(st, bt){

			console.log("INPUT RULES")
			console.log("ST")
			console.log(st);
			var cx = Math.trunc(st.curZero/st.length);
			var cy = st.curZero%st.length;

			for(var i=0; i<st.length; i++){
				var reject = input_condition_list.every(function(condition){
					if(!condition(st, {x: cx, y: cy, num: i+1})){
						return true;
					}
				});

				if(!reject){
					var temp = new state(st);
					temp.board[cx][cy] = i+1;
					bt.enqueue(temp);
				}
			}
		});
	}

	function initializeInputConditions(){
		//Checks for horizontal, vertical, and block repetition
		input_condition_list.push(function(st, input){
			baseX = Math.trunc(input.x/st.blockSize)*st.blockSize; //start x index of block
			baseY = Math.trunc(input.y/st.blockSize)*st.blockSize; //start y index of block
			for(var i=0; i<st.length; i++){
				if(st.board[input.x][i] == input.num) //horizontal
					return false;
				if(st.board[i][input.y] == input.num) //vertical
					return false;
				if(st.board[baseX+(Math.trunc(i/st.blockSize))][baseY+(i%st.blockSize)] == input.num) //block
					return false;
			}

			console.log(" --- " + input.num);
			console.log("RETURNED TRUE")
			return true;
		});
	}



	return obj;
}






