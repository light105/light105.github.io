$(".button-collapse").sideNav();
$('.modal-trigger').leanModal();
function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#input").val(e.target.result);
            console.log(e.target.result)
        };
        reader.readAsText(input.files[0]);
      }

      $("#solve").show();
}

function removeFile(){
    $("#file").val("");
}

var board_list;
var index_to_show;
var asdf = 2;
    $("#check").hide();
    $("#show_sol").hide();
    $("#solve").hide();
$('#solve').click(function(){
  $("#slide-out").show();
  $("header").css("padding-left","240px");
  $("main").css("padding-left","240px");
  $("footer").css("padding-left","240px");
  puz_count=0;
  board_list = [];
  var input = $("#input").val().split("\n");
  var n = parseInt(input.shift());
  index_to_show = 0;
  $("#solutions").html("");
  $("#slide-out").html("");
  for(var i = 0; i<n; i++){
    var links='<li><a class="puzzle_links" value="' +(i+1)+ '"" class="waves-effect waves-teal">Puzzle '+(i+1)+'</a></li>';
    $("#slide-out").html($("#slide-out").html()+links);
        
    var nsubgrid=parseInt(input.shift());
    var nboard = new Array();
    for(var j = 0; j < nsubgrid*nsubgrid;j++){
      var row = input.shift().split(" ");
      for(var k = 0; k<row.length; k++){
        row[k]=parseInt(row[k]);
      }
      nboard.push(row);
    }
    board_list.push(nboard);
    //----sudoku solver starts here----
    var solver = SudokuSolver();
    solver.initialize(nboard,nsubgrid);
    solver.solve();
    var solutions=solver.getSolutions();
    var xsolutions=solver.getXSolutions();
    var ysolutions=solver.getYSolutions();
    var xysolutions=solver.getXYSolutions(xsolutions,ysolutions);
    //----sudoku solver ends here----

    var str = "";
    str+= "<div id='Puzzle"+(i+1)+"' hidden><h4  class='teal-text'>Puzzle "+(i+1)+"</h4>";
    str+= '<div class="row"><div class="col s12"><ul class="tabs"><li class="tab col s3"><a class="active" href="#normal'+(i+1)+'">Normal Sudoku <span class="teal-text">'+solutions.length+'</span></a></li><li class="tab col s3"><a href="#x'+(i+1)+'">Sudoku X <span class="teal-text">'+xsolutions.length+'</span></a></li><li class="tab col s3"><a href="#y'+(i+1)+'">Sudoku Y <span class="teal-text">'+ysolutions.length+'</span></a></li><li class="tab col s3"><a href="#xy'+(i+1)+'">Sudoku XY <span class="teal-text">'+xysolutions.length+'</span></a></li></ul></div><div id="normal'+(i+1)+'" class="col s12"></div><div id="x'+(i+1)+'" class="col s12"></div><div id="y'+(i+1)+'" class="col s12"></div><div id="xy'+(i+1)+'" class="col s12"></div></div>';
    $("#solutions").html($("#solutions").html()+str);

    //----normal solution start----
    str="";
    for(var j=0;j<solutions.length;j++){
      str+="<div style='{width:50%}'>";
      str+="<br/><h6 class='teal-text'>Solution "+(j+1)+"</h6>"
      str+="<div class='row'><div class='col s6' id='container'>";
      str+="<table class='centered sudoku-container'>";
      for(var k=0;k<solutions[j].length;k++){
        str+="<tr>";
        for(var l=0;l<solutions[j][k].length;l++){
          str+="<td class='";
          if(l%nsubgrid==0 && l!=0){
            str+="left-border ";
          }
          if(k%nsubgrid==0 && k!=0){
            str+="top-border ";
          }
          if((Math.floor(l/nsubgrid)+Math.floor(k/nsubgrid))%2==0){
            str+="sudoku-section-one ";
          }
          str+="'>"+solutions[j][k][l]+"</td>"
        }
        str+="</tr>";
      }
      str+="</table>";
      str+="</div></div>";
      str+="</div>";
    }
    $("#normal"+(i+1)).html(str);
    //----normal solution end----

    //----x solution start----
    str="";
    for(var j=0;j<xsolutions.length;j++){
      str+="<div>";
      str+="<br/><h6 class='teal-text'>Solution "+(j+1)+"</h6>"
      str+="<div class='row'><div class='col s6' id='container'>";
      str+="<table class='centered sudoku-container'>";
      for(var k=0;k<xsolutions[j].length;k++){
        str+="<tr>";
        for(var l=0;l<xsolutions[j][k].length;l++){
          str+="<td class='";
          if(l%nsubgrid==0 && l!=0){
            str+="left-border ";
          }
          if(k%nsubgrid==0 && k!=0){
            str+="top-border ";
          }
          if((Math.floor(l/nsubgrid)+Math.floor(k/nsubgrid))%2==0){
            str+="sudoku-section-one ";
          }
          if(l==k || l==(nsubgrid*nsubgrid-1)-k){
            str+="grey lighten-3 ";
          }
          str+="'>"+xsolutions[j][k][l]+"</td>"
        }
        str+="</tr>";
      }
      str+="</table>";
      str+="</div></div>";
      str+="</div>";
    }
    $("#x"+(i+1)).html(str);
    //----x solution end----

    //----y solution start----
    str="";
    for(var j=0;j<ysolutions.length;j++){
      str+="<div>";
      str+="<br/><h6 class='teal-text'>Solution "+(j+1)+"</h6>"
      str+="<div class='row'><div class='col s6' id='container'>";
      str+="<table class='centered sudoku-container' >";
      for(var k=0;k<ysolutions[j].length;k++){
        str+="<tr>";
        for(var l=0;l<ysolutions[j][k].length;l++){
          str+="<td class='";
          if(l%nsubgrid==0 && l!=0){
            str+="left-border ";
          }
          if(k%nsubgrid==0 && k!=0){
            str+="top-border ";
          }
          if((Math.floor(l/nsubgrid)+Math.floor(k/nsubgrid))%2==0){
            str+="sudoku-section-one ";
          }
          if( (l==k || l==(nsubgrid*nsubgrid-1)-k) && k<(nsubgrid*nsubgrid)/2){
            str+="grey lighten-3 ";
          }
          if(l==Math.floor((nsubgrid*nsubgrid)/2) && k>(nsubgrid*nsubgrid)/2){
            str+="grey lighten-3 ";
          }

          str+="'>"+ysolutions[j][k][l]+"</td>"
        }
        str+="</tr>";
      }
      str+="</table>";
      str+="</div></div>";
      str+="</div>";
    }
    $("#y"+(i+1)).html(str);
    //----y solution end----
  str="";
    for(var j=0;j<xysolutions.length;j++){
      str+="<div>";
      str+="<br/><h6 class='teal-text'>Solution "+(j+1)+"</h6>"
      str+="<div class='row'><div class='col s6' id='container'>";
      str+="<table class='centered sudoku-container' >";
      for(var k=0;k<xysolutions[j].length;k++){
        str+="<tr>";
        for(var l=0;l<xysolutions[j][k].length;l++){
          str+="<td class='";
          if(l%nsubgrid==0 && l!=0){
            str+="left-border ";
          }
          if(k%nsubgrid==0 && k!=0){
            str+="top-border ";
          }
          if((Math.floor(l/nsubgrid)+Math.floor(k/nsubgrid))%2==0){
            str+="sudoku-section-one ";
          }
          if(l==k || l==(nsubgrid*nsubgrid-1)-k){
            str+="grey lighten-3 ";
          }
          if( (l==k || l==(nsubgrid*nsubgrid-1)-k) && k<(nsubgrid*nsubgrid)/2){
            str+="grey lighten-3 ";
          }
          if(l==Math.floor((nsubgrid*nsubgrid)/2) && k>(nsubgrid*nsubgrid)/2){
            str+="grey lighten-3 ";
          }
          str+="'>"+xysolutions[j][k][l]+"</td>"
        }
        str+="</tr>";
      }
      str+="</table>";
      str+="</div></div>";
      str+="</div></div>";
    }
    $("#xy"+(i+1)).html(str);
  }


  $('ul.tabs').tabs();


  show_play();

  $(".puzzle_links").click(function(e){
    index_to_show = e.target.getAttribute("value")-1;
    hide_solutions();
    setBoard(board_list[index_to_show]);
  });


  $("#show_sol").click(function(){hide_solutions();show_solutions();});
  $("#check").click(function(){
    var stc = check_board();

    for(var i=0; i<board_list[index_to_show].length; i++){
      for(var j=0; j<board_list[index_to_show].length; j++){
        if(stc[i][j] == 1){
          $("#td"+i+"_"+j).addClass("wronged");
        }else{
          $("#td"+i+"_"+j).removeClass("wronged");
        }
      }
    }

  });
});


function show_play(){

  if(board_list.length != 0){
    var thisb = board_list[0];

    setBoard(thisb);
    $("#check").show();
    $("#show_sol").show();
  }
}

function hide_solutions(){
  for(var i=0; i<board_list.length; i++)
    $("#Puzzle"+(i+1)).hide();
}

function show_solutions(){
  $("#Puzzle"+(index_to_show+1)).show();
}

function setBoard(board){
  var template = "";
  var swtch = 0;
  var ct = 2;

  if(board.length == 9)
    ct = 3;

  for(var i=0; i<board.length; i++){
    template += "<tr>";
    for(var j=0; j<board.length; j++){

      if(board[i][j] == 0){
        if((Math.floor(i/ct)+Math.floor(j/ct))%2==0)
        template +="<td style='background:#2bbbad'  disabled id='td"+i+"_"+j+"'>";
        else
        template +="<td style='background:#ffffff' disabled id='td"+i+"_"+j+"'>";
      }else{
        if((Math.floor(i/ct)+Math.floor(j/ct))%2==0)
        template +="<td style='background:#2bbbad' id='td"+i+"_"+j+"'>";
        else
        template +="<td style='background:#ffffff' id='td"+i+"_"+j+"'>";
      }

      if( board[i][j] == 0)
        template += "<input type='textfield' class='inputer'/>";
      else
        template += "<input type='textfield' disabled value='"+board[i][j]+"'/>";
      template +="</td>";
    }

    template+= "</tr>";
  }

  $("#play_table").html("");
  $("#play_table").html(template);

}



function check_board(){
  if(board_list[index_to_show].length == 9)
    asdf = 3;
  else
    asdf = 2;

  var gboard = [];
  var res_board = [];
  for(var i=0; i<board_list[index_to_show].length; i++){
    gboard.push([]);
    res_board.push([]);
    for(var j=0; j<board_list[index_to_show].length; j++){
      gboard[i].push($("#td"+i+"_"+j +" > input").val());
      res_board[i].push(0);
    }
  }




  for(var i=0; i<board_list[index_to_show].length; i++){
    for(var j=0; j<board_list[index_to_show].length; j++){

      //horizontal
      for(var k=0; k<board_list[index_to_show].length; k++){
        var aa = Math.trunc(i/asdf)*asdf+Math.trunc(k/asdf);
        var bb = Math.trunc(j/asdf)*asdf+k%asdf;

        if(gboard[i][j] != "" && gboard[i][j] == gboard[i][k] && j != k)
          res_board[i][j] = 1;
        if(gboard[i][j] != "" && gboard[i][j] == gboard[k][j] && k != i)
          res_board[i][j] = 1;
        if(gboard[i][j] != "" && gboard[aa][bb] == gboard[i][j] && !(i==aa && j==bb))
          res_board[i][j] = 1;

      }
    }
  }

  console.log(res_board);
  return res_board;
}