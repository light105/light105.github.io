$(document).ready(function(){

	});

	var numConstraints = 1;
	$("#addConstraint").on("click",function(){
		numConstraints++;
		$("#constraints").append('<div class="form-group div-constraint'+numConstraints+'"><label class="col-sm-2 control-label">Constraint '+numConstraints+'</label><div class="col-sm-10"><input type="text" class="form-control" id="listOfConstraints'+numConstraints+'" placeholder="Constraint"></div></div>');
	});

	$("#removeConstraint").on("click",function(){
		$('.div-constraint'+numConstraints).remove();
		if(numConstraints!=1){
		numConstraints--;
		}
	});

	$("#editInput").on("click",function(){
		$("#output").slideUp(1000);
		$("#input").slideDown(1000);

		$("#solution").remove();
		$("#editInput").prop('disabled',true);
	});

	$('#solve').on("click",function(){
		var objectiveFunction=$('#objectiveFunction').val();
		var constraints=new Array();
		for(var i=1;i<=numConstraints;i++){
			if($('#listOfConstraints'+i).val())
			constraints.push($('#listOfConstraints'+i).val().replace(/\s+/g, ''));
		}

		objectiveFunction.replace(/\s+/g, '');
		if(!objectiveFunction.match(/^[\+\-]?([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*\=([\+\-]?([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*)([\+\-]([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*)*$/)){
			alert("Please enter a valid Objective Function.");
			return;
		}
		else{
			var valid=true;
			for(var i=0;i<constraints.length;i++){
				if(!constraints[i].match(/^([\+\-]?([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*)([\+\-]([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*)*[\>\<]\=[\+\-]?([0-9]+(\.[0-9]+)?)*$/)){
					valid=false;
					break;
				}
			}

			if(!valid){
				alert("Please enter a valid constraint.");
				return;
			}
		}

		$("#editInput").prop('disabled',false);
		var type=$("#simplexForm input[type='radio']:checked").val();

		$("#input").slideUp(500);
		//print input here
		$("#outputPanel").append('<div id="solution"></div>');
		$("#solution").append('<h3>'+type+' '+objectiveFunction+'</h3>');
		$("#solution").append('<h4>Subject to:</h4>');
		for(var i=0;i<constraints.length;i++){
		$("#solution").append('<h4>'+constraints[i]+'</h4>');
		}
		$("#solution").append('<br/>');

		objectiveFunction=parseObjectiveFunction(objectiveFunction);
		for(var i=0;i<constraints.length;i++){
			constraints[i]=parseConstraint(constraints[i],i+1);
		}

		if(type=="Minimize"){
			var variables=[];
			for(var i=0;i<objectiveFunction.variables.length-1;i++){
				variables.push(objectiveFunction.variables[i]);
			}
			variables.push("");

			var initialTableau=[];
			for(var i=0;i<constraints.length;i++){
				initialTableau[i]=new Array();
				for(var j=0;j<variables.length-1;j++){
					var temp=constraints[i].variables.indexOf(variables[j]);
					if(temp!=-1){
						var coef=constraints[i].coefficients[temp];
						if(constraints[i].equality=="<="){
							coef*=-1;
						}
						initialTableau[i].push(coef);
					}
					else{
						initialTableau[i].push(0);
					}
				}
				var constant=constraints[i].constant;
				if(constraints[i].equality=="<="){
					constant*=-1;
				}
				initialTableau[i].push(constant);
			}

			initialTableau[constraints.length]=new Array();
			for(var j=0;j<variables.length-1;j++){
				var temp=objectiveFunction.variables.indexOf(variables[j]);
				if(temp!=-1){
					initialTableau[constraints.length].push(objectiveFunction.coefficients[temp]);
				}
				else{
					initialTableau[constraints.length].push(0);
				}
			}
			initialTableau[constraints.length].push(objectiveFunction.constant);

			var htmlTableauBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Initial Tableau</h3></div><div class="table-responsive"><table class="table">';
			var htmlTableauEnd='</tbody></table></div></div>';
			var colheadings='<thead><tr>';

			for(var i=0;i<variables.length;i++){
				colheadings+='<th>'+variables[i]+'</th>';
			}
			colheadings+='</tr></thead><tbody>';
			htmlTableauBegin+=colheadings;

			for(var i=0;i<initialTableau.length;i++){
				if(i!=initialTableau.length-1){
				htmlTableauBegin+='<tr>';
				}
				else{
				htmlTableauBegin+='<tr class="active">';
				}
				for(var j=0;j<initialTableau[i].length;j++){
					htmlTableauBegin+='<td>'+initialTableau[i][j]+'</td>';
				}
				htmlTableauBegin+='</tr>';
			}
			$("#solution").append(htmlTableauBegin+htmlTableauEnd+'<br/>');

			var tableau=[];
			for(var i=0;i<initialTableau[0].length;i++){
				tableau[i]=[];
			}

			for(var i=0;i<initialTableau.length-1;i++){
				for(var j=0;j<initialTableau[i].length;j++){
				tableau[j][i]=initialTableau[i][j];
				}
			}

			for(var i=0;i<tableau.length;i++){
				for(var j=0;j<variables.length-1;j++){
					if(i==j){
						tableau[i].push(1);
					}
					else{
						tableau[i].push(0);
					}
				}
				tableau[i].push(initialTableau[initialTableau.length-1][i]);
			}

			for(var j=0;j<tableau[0].length;j++){
				tableau[tableau.length-1][j]*=-1;
			}

			var hasNegative=false;
			for(var j=0;j<tableau[0].length-1;j++){
				if(tableau[tableau.length-1][j]<0){
					hasNegative=true;
					break;
				}
			}

			var newvariables=[];
			for(var i=0;i<constraints.length;i++){
				newvariables.push("Y"+(i+1));
			}
			for(var i=0;i<objectiveFunction.variables.length-1;i++){
				newvariables.push("S"+(i+1));
			}
			newvariables.push("");


			var iterations=0;

			var htmlTableauBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Tableau '+iterations+'</h3></div><div class="table-responsive"><table class="table">';
			var htmlTableauEnd='</tbody></table></div></div>';
			var colheadings='<thead><tr>';

			for(var i=0;i<newvariables.length;i++){
				colheadings+='<th>'+newvariables[i]+'</th>';
			}
			colheadings+='</tr></thead><tbody>';
			htmlTableauBegin+=colheadings;

			for(var i=0;i<tableau.length;i++){
				if(i!=tableau.length-1){
				htmlTableauBegin+='<tr>';
				}
				else{
				htmlTableauBegin+='<tr class="active">';
				}
				for(var j=0;j<tableau[i].length;j++){
					htmlTableauBegin+='<td>'+tableau[i][j]+'</td>';
				}
				htmlTableauBegin+='</tr>';
			}
			$("#solution").append(htmlTableauBegin+htmlTableauEnd+'<br/>');

			var htmlBasicSolutionBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Basic Solution</h3></div><div class="table-responsive"><table class="table">';
			var htmlBasicSolutionEnd='</tbody></table></div></div>';
			var bscolheadings='<thead><tr>';

			for(var i=0;i<objectiveFunction.variables.length;i++){
				bscolheadings+='<th>'+objectiveFunction.variables[i]+'</th>';
			}

			bscolheadings+='</tr></thead><tbody>';
			htmlBasicSolutionBegin+=bscolheadings;
			htmlBasicSolutionBegin+='<tr>';
			for(var i=0;i<objectiveFunction.variables.length;i++){
				htmlBasicSolutionBegin+='<td>'+tableau[tableau.length-1][tableau[tableau.length-1].length-objectiveFunction.variables.length+i]+'</td>';
			}
			htmlBasicSolutionBegin+='</tr>';
			$("#solution").append(htmlBasicSolutionBegin+htmlBasicSolutionEnd+'<br/>');

			while(hasNegative){
				var pivotCol=-1,min=0;
				var i=tableau.length-1;
				for(var j=0;j<tableau[0].length-1;j++){
					if(tableau[i][j]<min){
							min=tableau[i][j];
					}
				}
				pivotCol=tableau[i].indexOf(min);

				min=999999;
				for(var i=0;i<tableau.length-1;i++){
						if(tableau[i][pivotCol]>0){
							if(tableau[i][tableau[0].length-1]/tableau[i][pivotCol]<min){
								min=tableau[i][tableau[0].length-1]/tableau[i][pivotCol];
							}
						}
				}

				var pivotRow=-1;
				for(var i=0;i<tableau.length-1;i++){
						if(tableau[i][pivotCol]>0){
							if(tableau[i][tableau[0].length-1]/tableau[i][pivotCol]==min){
								pivotRow=i;
							}
						}
				}

				if(pivotCol==-1 || pivotRow==-1 || iterations==100){
							$("#solution").append('<div class="alert alert-danger" role="alert"><strong>The problem is infeasible.</strong></div>'+'<br/>');
							return;
				}

				var pivotElement=tableau[pivotRow][pivotCol];

				for(var j=0;j<tableau[0].length;j++){
					tableau[pivotRow][j]=tableau[pivotRow][j]/pivotElement;
				}

				for(var i=0;i<tableau.length;i++){
					if(i!=pivotRow){
						var temp=tableau[i][pivotCol];
						for(var j=0;j<tableau[0].length;j++){
							tableau[i][j]=tableau[i][j]-(temp*tableau[pivotRow][j]);
						}
					}
				}

				iterations++;
				var htmlTableauBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Tableau '+iterations+'</h3></div><div class="table-responsive"><table class="table">';
				var htmlTableauEnd='</tbody></table></div></div>';
				var colheadings='<thead><tr>';

				for(var i=0;i<newvariables.length;i++){
					colheadings+='<th>'+newvariables[i]+'</th>';
				}
				colheadings+='</tr></thead><tbody>';
				htmlTableauBegin+=colheadings;

				for(var i=0;i<tableau.length;i++){
					if(i!=tableau.length-1){
					htmlTableauBegin+='<tr>';
					}
					else{
					htmlTableauBegin+='<tr class="active">';
					}
					for(var j=0;j<tableau[i].length;j++){
						htmlTableauBegin+='<td>'+tableau[i][j]+'</td>';
					}
					htmlTableauBegin+='</tr>';
				}
				$("#solution").append(htmlTableauBegin+htmlTableauEnd+'<br/>');

				var htmlBasicSolutionBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Basic Solution</h3></div><div class="table-responsive"><table class="table">';
				var htmlBasicSolutionEnd='</tbody></table></div></div>';
				var bscolheadings='<thead><tr>';

				for(var i=0;i<objectiveFunction.variables.length;i++){
					bscolheadings+='<th>'+objectiveFunction.variables[i]+'</th>';
				}

				bscolheadings+='</tr></thead><tbody>';
				htmlBasicSolutionBegin+=bscolheadings;
				htmlBasicSolutionBegin+='<tr>';
				for(var i=0;i<objectiveFunction.variables.length;i++){
					htmlBasicSolutionBegin+='<td>'+tableau[tableau.length-1][tableau[tableau.length-1].length-objectiveFunction.variables.length+i]+'</td>';
				}
				htmlBasicSolutionBegin+='</tr>';
				$("#solution").append(htmlBasicSolutionBegin+htmlBasicSolutionEnd+'<br/>');

				hasNegative=false;
				for(var j=0;j<tableau[0].length-1;j++){
					if(tableau[tableau.length-1][j]<0){
						hasNegative=true;
						break;
					}

				}
			}

		}else{
		//======================print slack variables and obj function
		$("#solution").append('<h4>Step 1:Using slack variables,convert constraints to a system of linear equations.</h4>');
		for(var i=0;i<constraints.length;i++){
		$("#solution").append('<h4>'+constraints[i].slack+'</h4>');
		}
		$("#solution").append('<br/>');
		var iteration=1;
		var variables=[];
		for(var i=0;i<objectiveFunction.variables.length-1;i++){
			variables.push(objectiveFunction.variables[i]);
		}
		for(var i=1;i<constraints.length+1;i++){
			variables.push("S"+i);
		}
		variables.push(objectiveFunction.variables[objectiveFunction.variables.length-1]);
		variables.push("");

		var tableau=[];
		for(var i=0;i<constraints.length;i++){
			tableau[i]=new Array();
			for(var j=0;j<variables.length-1;j++){
				var temp=constraints[i].variables.indexOf(variables[j]);
				if(temp!=-1){
					tableau[i].push(constraints[i].coefficients[temp]);
				}
				else{
					tableau[i].push(0);
				}
			}
			tableau[i].push(constraints[i].constant);
		}
		tableau[constraints.length]=new Array();
		for(var j=0;j<variables.length-1;j++){
			var temp=objectiveFunction.variables.indexOf(variables[j]);
			if(temp!=-1){
				tableau[constraints.length].push(objectiveFunction.coefficients[temp]);
			}
			else{
				tableau[constraints.length].push(0);
			}
		}
		tableau[constraints.length].push(objectiveFunction.constant);
		for(var j=0;j<variables.length-2;j++){
			if(tableau[constraints.length][j]!=0){
			tableau[constraints.length][j]*=-1;
			}
		}
		//compute basic solution

		var basicSolution=[];
		var temp,temp2;
		for(var j=0;j<variables.length-1;j++){
			temp=0;
			temp2=-1;
			for(var i=0;i<constraints.length+1;i++){
				temp+=tableau[i][j];
				if(tableau[i][j]==1 || tableau[i][j]==-1){
					temp2=i;
				}
			}
			if(temp==1){
				basicSolution.push(tableau[temp2][variables.length-1]);
			}
			else if(temp==-1){
				if(tableau[temp2][variables.length-1]!=0){
					basicSolution.push(-1*tableau[temp2][variables.length-1]);
				}else{
					basicSolution.push(0);
				}
			}
			else{
				basicSolution.push(0);
			}
		}

		var hasNegative=false;
		var i=constraints.length;
		for(var j=0;j<variables.length-1;j++){
			if(tableau[i][j]<0){
				hasNegative=true;
				break;
			}
		}
		//print tableau and solution here
		var htmlTableauBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Tableau '+iteration+'</h3></div><div class="table-responsive"><table class="table">';
  	var htmlTableauEnd='</tbody></table></div></div>';
		var colheadings='<thead><tr>';

		for(var i=0;i<variables.length;i++){
			colheadings+='<th>'+variables[i]+'</th>';
		}
		colheadings+='</tr></thead><tbody>';
		htmlTableauBegin+=colheadings;

		for(var i=0;i<tableau.length;i++){
			if(i!=tableau.length-1){
			htmlTableauBegin+='<tr>';
			}
			else{
			htmlTableauBegin+='<tr class="active">';
			}
			for(var j=0;j<tableau[i].length;j++){
				htmlTableauBegin+='<td>'+tableau[i][j]+'</td>';
			}
			htmlTableauBegin+='</tr>';
		}
		$("#solution").append(htmlTableauBegin+htmlTableauEnd+'<br/>');

		var htmlBasicSolutionBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Basic Solution</h3></div><div class="table-responsive"><table class="table">';
		var htmlBasicSolutionEnd='</tbody></table></div></div>';
		var bscolheadings='<thead><tr>';

		for(var i=0;i<variables.length-1;i++){
			bscolheadings+='<th>'+variables[i]+'</th>';
		}
		bscolheadings+='</tr></thead><tbody>';
		htmlBasicSolutionBegin+=bscolheadings;
		htmlBasicSolutionBegin+='<tr>';
		for(var i=0;i<basicSolution.length;i++){
			htmlBasicSolutionBegin+='<td>'+basicSolution[i]+'</td>';
		}
		htmlBasicSolutionBegin+='</tr>';
		$("#solution").append(htmlBasicSolutionBegin+htmlBasicSolutionEnd+'<br/>');

		while(hasNegative){
			var pivotCol,min=0;
			var i=constraints.length;
			for(var j=0;j<variables.length-1;j++){
				if(tableau[i][j]<0){
					if(tableau[i][j]<min){
						min=tableau[i][j];
					}
				}
			}
			pivotCol=tableau[i].indexOf(min);

			min=999999;
			for(var i=0;i<constraints.length;i++){
					if(tableau[i][pivotCol]>0){
						if(tableau[i][variables.length-1]/tableau[i][pivotCol]<min){
							min=tableau[i][variables.length-1]/tableau[i][pivotCol];
						}
					}
			}
			var pivotRow;
			for(var i=0;i<constraints.length;i++){
					if(tableau[i][pivotCol]>0){
						if(tableau[i][variables.length-1]/tableau[i][pivotCol]==min){
							pivotRow=i;
						}
					}
			}

			var pivotElement=tableau[pivotRow][pivotCol];
			for(var j=0;j<variables.length;j++){
				tableau[pivotRow][j]=tableau[pivotRow][j]/pivotElement;
			}

			for(var i=0;i<constraints.length+1;i++){
				if(i!=pivotRow){
					var temp=tableau[i][pivotCol];
					for(var j=0;j<variables.length;j++){
						tableau[i][j]=tableau[i][j]-(temp*tableau[pivotRow][j]);
					}
				}
			}

			var basicSolution=[];
			var temp,temp2;
			for(var j=0;j<variables.length-1;j++){
				temp=0;
				temp2=-1;
				for(var i=0;i<constraints.length+1;i++){
					temp+=tableau[i][j];
					if(tableau[i][j]==1 || tableau[i][j]==-1){
						temp2=i;
					}
				}
				if(temp==1){
					basicSolution.push(tableau[temp2][variables.length-1]);
				}
				else if(temp==-1){
					if(tableau[temp2][variables.length-1]!=0){
						basicSolution.push(-1*tableau[temp2][variables.length-1]);
					}else{
						basicSolution.push(0);
					}
				}
				else{
					basicSolution.push(0);
				}
			}

			iteration++;
			//print tableau and solution here
			var htmlTableauBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Tableau '+iteration+'</h3></div><div class="table-responsive"><table class="table">';
			var htmlTableauEnd='</tbody></table></div></div>';
			var colheadings='<thead><tr>';

			for(var i=0;i<variables.length;i++){
				colheadings+='<th>'+variables[i]+'</th>';
			}
			colheadings+='</tr></thead><tbody>';
			htmlTableauBegin+=colheadings;

			for(var i=0;i<tableau.length;i++){
				if(i!=tableau.length-1){
				htmlTableauBegin+='<tr>';
				}
				else{
				htmlTableauBegin+='<tr class="active">';
				}
				for(var j=0;j<tableau[i].length;j++){
					htmlTableauBegin+='<td>'+tableau[i][j]+'</td>';
				}
				htmlTableauBegin+='</tr>';
			}
			$("#solution").append(htmlTableauBegin+htmlTableauEnd+'<br/>');

			var htmlBasicSolutionBegin='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Basic Solution</h3></div><div class="table-responsive"><table class="table">';
			var htmlBasicSolutionEnd='</tbody></table></div></div>';
			var bscolheadings='<thead><tr>';

			for(var i=0;i<variables.length-1;i++){
				bscolheadings+='<th>'+variables[i]+'</th>';
			}
			bscolheadings+='</tr></thead><tbody>';
			htmlBasicSolutionBegin+=bscolheadings;
			htmlBasicSolutionBegin+='<tr>';
			for(var i=0;i<basicSolution.length;i++){
				htmlBasicSolutionBegin+='<td>'+basicSolution[i]+'</td>';
			}
			htmlBasicSolutionBegin+='</tr>';
			$("#solution").append(htmlBasicSolutionBegin+htmlBasicSolutionEnd+'<br/>');


			hasNegative=false;
			var i=constraints.length;
			for(var j=0;j<variables.length-1;j++){
				if(tableau[i][j]<0){
					hasNegative=true;
					break;
				}
			}
		}
		}
		$("#output").slideDown(1000);
	});

	var parseObjectiveFunction=function(str){
		var terms=str.match(/[\+\-]?([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*/g);
		var objectiveVar=terms[0];
		terms.shift();
		terms.push(objectiveVar);

		var variables=new Array();
		var coefficients=new Array();
		var constant=0;
		var equality="=";
		for(var i=0;i<terms.length;i++){
			coefficients.push(terms[i].match(/[\+\-]?([0-9]+(\.[0-9]+)?)?/g)[0]);
			if(coefficients[i]=="+" || coefficients[i]=="-" || coefficients[i]==""){
				coefficients[i]+="1";
			}
			coefficients[i]=parseFloat(coefficients[i]);
			variables.push(terms[i].match(/[a-zA-Z]+[0-9]*/)[0]);
		}

		var obj={
			variables:variables,
			coefficients:coefficients,
			constant:constant,
			equality:equality,
		};
		return obj;

	}

	var parseConstraint=function(str,n){
		var equality=str.match(/[\>\<]\=/g)[0];
		var a=str.split(/[\>\<]\=/);
		var constant=parseFloat(a[1]);

		if(equality=="<="){
			a[0]+="+S"+n;
		}
		else if(equality==">="){
			a[0]+="-S"+n;
		}

		var terms=a[0].match(/[\+\-]?([0-9]+(\.[0-9]+)?)?[a-zA-Z]+[0-9]*/g);

		var variables=new Array();
		var coefficients=new Array();

		for(var i=0;i<terms.length;i++){
			coefficients.push(terms[i].match(/[\+\-]?([0-9]+(\.[0-9]+)?)?/g)[0]);
			if(coefficients[i]=="+" || coefficients[i]=="-" || coefficients[i]==""){
				coefficients[i]+="1";
			}
			coefficients[i]=parseFloat(coefficients[i]);
			variables.push(terms[i].match(/[a-zA-Z]+[0-9]*/)[0]);
		}

		var obj={
			slack:a[0]+equality+a[1],
			variables:variables,
			coefficients:coefficients,
			constant:constant,
			equality:equality,
		};
		return obj;

	}
