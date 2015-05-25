function Options(size){
	var arr = [];
	var i;
	var obj = {};

	for(i=0; i<size; i++)
		arr[i] = [];

	obj.getTOS = function(i){
		if(arr[i] == undefined) return undefined;

		return arr[i][arr[i].length-1];
	}

	obj.removeTOS = function(i){
		return arr[i].pop();
	}

	obj.addCandidate = function(i, candidate){
		arr[i].push(candidate);
	}

	return obj;
}

function isEqual2d(a1,a2){

	for(var i=0;i<a1.length;i++){
		for(var j=0;j<a1[i].length;j++){
			if(a1[i][j] != a2[i][j]){
				return false;
			}
		}	
	}

	return true;
}

function SudokuSolver(){
	var board=[];
	var solutions = [];
	var subgrid, grid;
	var x, y;
	var tot_b;
	var cur_b;
	var obj = {};

	var cur_num;
	var cand_num;

	var options;

	var backtrack_flag = 0;
	//Object functions
	obj.solve = function(){
		if(board == []){
			return -1;
		}
		cur_b = 0;

		do{
			// console.log("==step==")
			cand_num = 0;
			if(backtrack_flag == 0){
				//console.log(board);
				if(cur_b<tot_b){
					for(var cand=1; cand<=grid; cand++){
						if(isCandidate(cand)){
							options.addCandidate(cur_b, cand);
							cand_num++;
							// console.log("ADDED CANDIDATE: " + cand);
						}
					}
					// console.log(options.getTOS(cur_b));
					if(options.getTOS(cur_b) != undefined){
						board[x[cur_b]][y[cur_b]] = options.getTOS(cur_b);
					}
					if(cand_num == 0){
						backtrack_flag = 1;
					}
					else{
						cur_b++;
					}

				}else if(cur_b == tot_b){ //therefore solution
					var temp = [];

					for(var i=0; i<grid; i++)
						temp.push(board[i].slice());
					
					solutions.push(temp);
					backtrack_flag = 1;
				}
			}else if(backtrack_flag > 0){
				if(backtrack_flag == 1){
					cur_b--;
					board[x[cur_b]][y[cur_b]] = 0;
					options.removeTOS(cur_b);
				}
				if(options.getTOS(cur_b) == undefined){
					cur_b--;
					board[x[cur_b]][y[cur_b]] = 0;
					options.removeTOS(cur_b);
					backtrack_flag = 2;
				}else{
					backtrack_flag = 0;
					board[x[cur_b]][y[cur_b]] = options.getTOS(cur_b);
					cur_b++;
				}
			}

		}while(options.getTOS(0) != undefined);
	}

	obj.getSolutions = function(){
		return solutions;
	}

	obj.getXSolutions = function(){
		var xSolutions = [];
		var num1=[];
		var num2=[];
		
		for(var i=0;i<solutions.length;i++){
			var isSolution = true;
			for(var j=0;j<grid;j++){
				num1[j]=solutions[i][j][j];
				num2[j]=solutions[i][j][grid-1-j];
			}
			num1.sort();
			num2.sort();
			for(var j=0;j<grid;j++){
				if ( num1[j] != j+1 || num2[j] != j+1 ) {
					isSolution = false;
					break
				}
			}
			if(isSolution){
				xSolutions.push(solutions[i]);
			}
		}
		return xSolutions;
	}

	obj.getYSolutions = function(){
		var ySolutions = [];
		var num1=[];
		var num2=[];

		for(var i=0;i<solutions.length;i++){
			var isSolution = true;
			
			for(var j=0;j<Math.floor(grid/2);j++){
				num1[j] = solutions[i][j][j];
				num2[j] = solutions[i][j][grid-1-j];
			}
			for(var j=Math.floor(grid/2);j<grid;j++){
				var k=Math.floor(grid/2);
				if(grid%2==0){
					k=k-1;
				}
				num1[j] = solutions[i][j][k];
				num2[j] = solutions[i][j][Math.floor(grid/2)];
			}
			num1.sort();
			num2.sort();
			
			for(var j=0;j<grid;j++){
				if ( num1[j] != j+1 || num2[j] != j+1 ) {
					isSolution = false;
					break
				}
			}
			if(isSolution){
				ySolutions.push(solutions[i]);
			}
		}

		return ySolutions;
	}

	obj.getXYSolutions = function(xSolutions,ySolutions){
		var xySolutions = [];

		for(var i=0;i<xSolutions.length;i++){
			for(var j=0;j<ySolutions.length;j++){
				if(isEqual2d(xSolutions[i],ySolutions[j])){
					xySolutions.push(xSolutions[i]);
					break;
				}
			}	
		}

		return xySolutions;
	}
	
	obj.initialize = function(nboard, nsubgrid){
		subgrid = nsubgrid;
		grid = nsubgrid*nsubgrid;

		for(var i=0; i<grid; i++){
			board[i]=[];
			for(var j=0; j<grid; j++)
				board[i][j] = nboard[i][j];
		}

		initializeBlankCoordinates();
		options = Options(tot_b);
	}


	//Class functions
	function initializeBlankCoordinates(){
		tot_b = 0;
		x=[];
		y=[];

		for(var i=0; i<grid; i++){
			for(var j=0; j<grid; j++){
				if(board[i][j]==0){
					x[tot_b] = i;
					y[tot_b] = j;
					tot_b++;
				}
			}
		}
	}

	function isCandidate(num){
		for(var i=0; i<grid; i++){
			var aa = Math.trunc(x[cur_b]/subgrid)*subgrid+Math.trunc(i/subgrid);
			var bb = Math.trunc(y[cur_b]/subgrid)*subgrid+i%subgrid;

			if(board[x[cur_b]][i] == num) return false;
			if(board[i][y[cur_b]] == num) return false;
			if(board[aa][bb] == num) return false;
		}

		return true;
	}

	return obj;
}