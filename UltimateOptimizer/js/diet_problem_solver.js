$(document).ready(function(){
    var foods=initFoods();
    var str='';
    for(var i=0;i<foods.length;i++){
      if(i%4==0){
          if(i>0){
              str+='</div>'
          }
          if(i<63){
              str+='<div class="row">';
          }
      }
      str+='<div class="col-sm-4 col-md-3"><div class="checkbox"><label><input type="checkbox" class="check-form" name="food[]" value="'+i+'" hidden="hidden"/><div class="thumbnail btn btn-success"><img data-src="js/holder.js/256x256" src="'+foods[i].image+'" style="height: 256px; width:256px; display: block;"/><div class="caption" style="overflow:hidden;"><h3>'+foods[i].name+'</h3></label></div></div></div></div>';
    }
    $('#foodForm').append(str);

    $('.thumbnail').on("click",function(){
      $(this).toggleClass("active");
    });
});

$('#solve').on("click",function(){
  var foodIndex = $("input[type=checkbox][name='food[]']:checked");
  if (foodIndex.length) {
        var foodIndex = foodIndex.map(function(){return this.value;}).get();
        var foods=initFoods();

        var minCalories=2000;
        var maxCalories=2250;
        var minCholesterol=0;
        var maxCholesterol=300;
        var minTotalFat=0;
        var maxTotalFat=65;
        var minSodium=0;
        var maxSodium=2400;
        var minCarbohydrates=0;
        var maxCarbohydrates=300;
        var minDietaryFiber=25;
        var maxDietaryFiber=100;
        var minProtein=50;
        var maxProtein=100;
        var minVitaminA=5000;
        var maxVitaminA=50000;
        var minVitaminC=50;
        var maxVitaminC=20000;
        var minCalcium=800;
        var maxCalcium=1600;
        var minIron=10;
        var maxIron=30;
        var minServing=0;
        var maxServing=10;

        var initialTableau=[];
        var row;
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].calories);
        }
        row.push(minCalories);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].cholesterol);
        }
        row.push(minCholesterol);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].totalFat);
        }
        row.push(minTotalFat);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].sodium);
        }
        row.push(minSodium);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].carbohydrates);
        }
        row.push(minCarbohydrates);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].dietaryFiber);
        }
        row.push(minDietaryFiber);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].protein);
        }
        row.push(minProtein);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].vitA);
        }
        row.push(minVitaminA);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].vitC);
        }
        row.push(minVitaminC);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].calcium);
        }
        row.push(minCalcium);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].iron);
        }
        row.push(minIron);
        initialTableau.push(row);
        //========================
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].calories);
        }
        row.push(-maxCalories);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].cholesterol);
        }
        row.push(-maxCholesterol);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].totalFat);
        }
        row.push(-maxTotalFat);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].sodium);
        }
        row.push(-maxSodium);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].carbohydrates);
        }
        row.push(-maxCarbohydrates);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].dietaryFiber);
        }
        row.push(-maxDietaryFiber);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].protein);
        }
        row.push(-maxProtein);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].vitA);
        }
        row.push(-maxVitaminA);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].vitC);
        }
        row.push(-maxVitaminC);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].calcium);
        }
        row.push(-maxCalcium);
        initialTableau.push(row);
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(-foods[foodIndex[i]].iron);
        }
        row.push(-maxIron);
        initialTableau.push(row);
        //===============================
        for(var i=0;i<foodIndex.length;i++){
          row=[];
          for(var j=0;j<foodIndex.length;j++){
            if(i==j){
              row.push(1);
            }
            else{
              row.push(0);
            }
          }
          row.push(minServing);
          initialTableau.push(row);
        }
        for(var i=0;i<foodIndex.length;i++){
          row=[];
          for(var j=0;j<foodIndex.length;j++){
            if(i==j){
              row.push(-1);
            }
            else{
              row.push(0);
            }
          }
          row.push(-maxServing);
          initialTableau.push(row);
        }
        row=[];
        for(var i=0;i<foodIndex.length;i++){
          row.push(foods[foodIndex[i]].pricePerServing);
        }
        row.push(0);
        initialTableau.push(row);

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
          for(var j=0;j<foodIndex.length;j++){
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

        var iterations=0;
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

                $(".modal-body").append('<div class="dietplan"></div>');
                $(".dietplan").append('<h4>Your Input</h4>');
                $(".dietplan").append('<h5>You selected '+foodIndex.length+' foods to consider for your diet</h5>');
                var str="<ul>";
                for(var i=0;i<foodIndex.length;i++){
                  str+='<li>'+foods[foodIndex[i]].name+'</li>';
                }
                str+="</ul>";
                $(".dietplan").append(str);
                str='';
                $(".dietplan").append('<h3>The Problem is infeasible</h3>');
                $(".dietplan").append('<h5>It is not possible to meet the nutritional constraints with the food that you have selected.</h5>');
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

          hasNegative=false;
          for(var j=0;j<tableau[0].length-1;j++){
            if(tableau[tableau.length-1][j]<0){
              hasNegative=true;
              break;
            }

          }
          iterations++;
        }

        $(".modal-body").append('<div class="dietplan"></div>');
        $(".dietplan").append('<h4>Your Input</h4>');
        $(".dietplan").append('<h5>You selected '+foodIndex.length+' foods to consider for your diet</h5>');

        $(".dietplan").append('<h3>The Optimized Menu</h3>');
        $(".dietplan").append('<h5>The cost of this optimal diet is $'+tableau[tableau.length-1][tableau[tableau.length-1].length-1]+' per day</h5><br/>');
        $(".dietplan").append('<h4>The Solution and Cost Breakdown by Food</h4>');
        var str='<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Food</th><th>Servings</th><th>Cost($)</th></tr></thead><tbody>';
        for(var i=0;i<foodIndex.length;i++){
          var serving=tableau[tableau.length-1][tableau[tableau.length-1].length-1-foodIndex.length+i];
          var cost=foods[foodIndex[i]].pricePerServing*serving;
          if(serving!=0){
          str+='<tr><td>'+foods[foodIndex[i]].name+'</td><td>'+serving+' '+foods[foodIndex[i]].servingUnit+'</td><td>'+cost+'</td></tr>';
          }
        }
        str+='</tbody></table></div></div>';
        $(".dietplan").append(str);
  }
  else{
      // display error message "no selected food"
      $(".modal-body").append('<div class="error">Please select a food</div>');
  }

});

$('#outputModal').on('hidden.bs.modal', function (e) {
  $(".error").remove();
  $(".dietplan").remove();
})

$(function(){

  var stickyTop = $('.sticky').offset().top;

  $(window).scroll(function(){

    var windowTop = $(window).scrollTop();

    if (stickyTop < windowTop && windowTop < 20000) {
      $('.sticky').css({ position: 'fixed', top: 25,"z-index":2});
    }
    else {
      $('.sticky').css('position','static');
    }

  });

});

$('#reset').on("click",function(){
  $('.thumbnail').removeClass("active");
});

$('#select_all').on("click",function(){
    $("#reset").click();
  $('.thumbnail').click();
});

$('#solve').on("click",function(){

});
function initFoods(){
    var foods=[];
    foods.push(newFood("Frozen Broccoli",0.16,10,"Oz Pkg",73.8,0,0.8,68.2,13.6,8.5,8,5867.4,160.2,159,2.3,""));
    foods.push(newFood("Carrots,Raw",0.07,1/2,"Cup Shredded",23.7,0,0.1,19.2,5.6,1.6,0.6,15471,5.1,14.9,0.3,""));
    foods.push(newFood("Celery,Raw",0.04,1,"Stalk",6.4,0,0.1,34.8,1.5,0.7,0.3,53.6,2.8,16,0.2,""));
    foods.push(newFood("Frozen Corn",0.18,1/2,"Cup",72.2,0,0.6,2.5,17.1,2,2.5,106.6,5.2,3.3,0.3,""));
    foods.push(newFood("Lettuce,Iceberg,Raw",0.02,1,"Leaf",2.6,0,0,1.8,0.4,0.3,0.2,66,0.8,3.8,0.1,""));
    foods.push(newFood("Peppers, Sweet, Raw",0.53,1,"Pepper",20,0,0.1,1.5,4.8,1.3,0.7,467.7,66.1,6.7,0.3,""));
    foods.push(newFood("Potatoes, Baked",0.06,1/2,"Cup",171.5,0,0.2,15.2,39.9,3.2,3.7,0,15.6,22.7,4.3,""));
    foods.push(newFood("Tofu",0.31,1/4,"block",88.2,0,5.5,8.1,2.2,1.4,9.4,98.6,0.1,121.8,6.2,""));
    foods.push(newFood("Roasted Chicken",0.84,1,"lb chicken",277.4,129.9,10.8,125.6,0,0,42.2,77.4,0,21.9,1.8,""));
    foods.push(newFood("Spaghetti W/ Sauce",0.78,1.5,"Cup",358.2,0,12.3,1237.1,58.3,11.6,8.2,3055.2,27.9,80.2,2.3,""));
    foods.push(newFood("Tomato,Red,Ripe,Raw",0.27,1,"Tomato, 2-3/5 In",25.8,0,0.4,11.1,5.7,1.4,1,766.3,23.5,6.2,0.6,""));
    foods.push(newFood("Apple,Raw,W/ Skin",0.24,1,"Fruit,3/Lb,Wo/Rf",81.4,0,0.5,0,21,3.7,0.3,73.1,7.9,9.7,0.2,""));
    foods.push(newFood("Banana",0.15,1,"Fruit,Wo/Sk &Seeds",104.9,0,0.5,1.1,26.7,2.7,1.2,92.3,10.4,6.8,0.4,""));
    foods.push(newFood("Grapes",0.32,10,"Fruits,Wo/Rf",15.1,0,0.1,0.5,4.1,0.2,0.2,24,1,3.4,0.1,""));
    foods.push(newFood("Kiwi fruit,Raw,Fresh",0.49,1,"Med Frt,Wo/Skin",46.4,0,0.3,3.8,11.3,2.6,0.8,133,74.5,19.8,0.3,""));
    foods.push(newFood("Oranges",0.15,1,"Frt,2-5/8 Diam",61.6,0,0.2,0,15.4,3.1,1.2,268.6,69.7,52.4,0.1,""));
    foods.push(newFood("Bagels",0.16,1,"Oz",78,0,0.5,151.4,15.1,0.6,3,0,0,21,1,""));
    foods.push(newFood("Wheat Bread",0.05,1,"Sl",65,0,1,134.5,12.4,1.3,2.2,0,0,10.8,0.7,""));
    foods.push(newFood("White Bread",0.06,1,"Sl",65,0,1,132.5,11.8,1.1,2.3,0,0,26.2,0.8,""));
    foods.push(newFood("Oatmeal Cookies",0.09,1,"Cookie",81,0,3.3,68.9,12.4,0.6,1.1,2.9,0.1,6.7,0.5,""));
    foods.push(newFood("Apple Pie",0.16,1,"Oz",67.2,0,3.1,75.4,9.6,0.5,0.5,35.2,0.9,3.1,0.1,""));
    foods.push(newFood("Chocolate Chip Cookies",0.03,1,"Cookie",78.1,5.1,4.5,57.8,9.3,0,0.9,101.8,0,6.2,0.4,""));
    foods.push(newFood("Butter,Regular",0.05,1,"Pat",35.8,10.9,4.1,41.3,0,0,0,152.9,0,1.2,0,""));
    foods.push(newFood("Cheddar Cheese",0.25,1,"Oz",112.7,29.4,9.3,173.7,0.4,0,7,296.5,0,202,0.2,""));
    foods.push(newFood("3.3% Fat,Whole Milk",0.16,1,"C",149.9,33.2,8.1,119.6,11.4,0,8,307.4,2.3,291.3,0.1,""));
    foods.push(newFood("2% Lowfat Milk",0.23,1,"C",121.2,18.3,4.7,121.8,11.7,0,8.1,500.2,2.3,296.7,0.1,""));
    foods.push(newFood("Skim Milk",0.13,1,"C",85.5,4.4,0.4,126.2,11.9,0,8.4,499.8,2.4,302.3,0.1,""));
    foods.push(newFood("Poached Eggs",0.08,1,"Lrg Egg",74.5,211.5,5,140,0.6,0,6.2,316,0,24.5,0.7,""));
    foods.push(newFood("Scrambled Eggs",0.11,1,"Egg",99.6,211.2,7.3,168,1.3,0,6.7,409.2,0.1,42.6,0.7,""));
    foods.push(newFood("Bologna,Turkey",0.15,1,"Oz",56.4,28.1,4.3,248.9,0.3,0,3.9,0,0,23.8,0.4,""));
    foods.push(newFood("Frankfurter, Beef",0.27,1,"Frankfurter",141.8,27.4,12.8,461.7,0.8,0,5.4,0,10.8,9,0.6,""));
    foods.push(newFood("Ham,Sliced,Extra lean",0.33,1,"Sl,6-1/4x4x1/16 In",37.1,13.3,1.4,405.1,0.3,0,5.5,0,7.4,2,0.2,""));
    foods.push(newFood("Kielbasa,Pork",0.15,1,"Sl,6x3-3/4x1/16 In",80.6,17.4,7.1,279.8,0.6,0,3.4,0,5.5,11.4,0.4,""));
    foods.push(newFood("Cap'N Crunch",0.31,1,"Oz",119.6,0,2.6,213.3,23,0.5,1.4,40.6,0,4.8,7.5,""));
    foods.push(newFood("Cheerios",0.28,1,"Oz",111,0,1.8,307.6,19.6,2,4.3,1252.2,15.1,48.6,4.5,""));
    foods.push(newFood("Corn Flakes, Kellogg's",0.28,1,"Oz",110.5,0,0.1,290.5,24.5,0.7,2.3,1252.2,15.1,0.9,1.8,""));
    foods.push(newFood("Raisin Bran, Kellog's",0.34,1.3,"Oz",115.1,0,0.7,204.4,27.9,4,4,1250.2,0,12.9,16.8,""));
    foods.push(newFood("Rice Krispies",0.32,1,"Oz",112.2,0,0.2,340.8,24.8,0.4,1.9,1252.2,15.1,4,1.8,""));
    foods.push(newFood("Special K",0.38,1,"Oz",110.8,0,0.1,265.5,21.3,0.7,5.6,1252.2,15.1,8.2,4.5,""));
    foods.push(newFood("Oatmeal",0.82,1,"C",145.1,0,2.3,2.3,25.3,4,6.1,37.4,0,18.7,1.6,""));
    foods.push(newFood("Malt-O-Meal,Chocolate",0.52,1,"C",607.2,0,1.5,16.5,128.2,0,17.3,0,0,23.1,47.2,""));
    foods.push(newFood("Pizza w/ Pepperoni",0.44,1,"Slice",181,14.2,7,267,19.9,0,10.1,281.9,1.6,64.6,0.9,""));
    foods.push(newFood("Taco",0.59,1,"Small Taco",369.4,56.4,20.6,802,26.7,0,20.7,855,2.2,220.6,2.4,""));
    foods.push(newFood("Hamburger w/ Toppings",0.83,1,"Burger",275,42.8,10.2,563.9,32.7,0,13.6,126.3,2.6,51.4,2.5,""));
    foods.push(newFood("Hotdog, Plain",0.31,1,"Hotdog",242.1,44.1,14.5,670.3,18,0,10.4,0,0.1,23.5,2.3,""));
    foods.push(newFood("Couscous",0.39,1/2,"Cup",100.8,0,0.1,4.5,20.9,1.3,3.4,0,0,7.2,0.3,""));
    foods.push(newFood("White Rice",0.08,1/2,"Cup",102.7,0,0.2,0.8,22.3,0.3,2.1,0,0,7.9,0.9,""));
    foods.push(newFood("Macaroni,Baked",0.17,1/2,"Cup",98.7,0,0.5,0.7,19.8,0.9,3.3,0,0,4.9,1,""));
    foods.push(newFood("Peanut Butter",0.07,2,"Tbsp",188.5,0,16,155.5,6.9,2.1,7.7,0,0,13.1,0.6,""));
    foods.push(newFood("Pork",0.81,4,"Oz",710.8,105.1,72.2,38.4,0,0,13.8,14.7,0,59.9,0.4,""));
    foods.push(newFood("Sardines in Oil",0.45,2,"Sardines",49.9,34.1,2.7,121.2,0,0,5.9,53.8,0,91.7,0.7,""));
    foods.push(newFood("White Tuna in Water",0.69,3,"Oz",115.6,35.7,2.1,333.2,0,0,22.7,68,0,3.4,0.5,""));
    foods.push(newFood("Popcorn,Air-Popped",0.04,1,"Oz",108.3,0,1.2,1.1,22.1,4.3,3.4,55.6,0,2.8,0.8,""));
    foods.push(newFood("Potato Chips,BBQ flavor",0.22,1,"Oz",139.2,0,9.2,212.6,15,1.2,2.2,61.5,9.6,14.2,0.5,""));
    foods.push(newFood("Pretzels",0.12,1,"Oz",108,0,1,486.2,22.5,0.9,2.6,0,0,10.2,1.2,""));
    foods.push(newFood("Tortilla Chip",0.19,1,"Oz",142,0,7.4,149.7,17.8,1.8,2,55.6,0,43.7,0.4,""));
    foods.push(newFood("Chicken noodle Soup",0.39,1,"C (8 Fl Oz)",150.1,12.3,4.6,1862.2,18.7,1.5,7.9,1308.7,0,27.1,1.5,""));
    foods.push(newFood("Split Pea&Hamsoup",0.67,1,"C (8 Fl Oz)",184.8,7.2,4,964.8,26.8,4.1,11.1,4872,7,33.6,2.1,""));
    foods.push(newFood("Vegetable beef Soup",0.71,1,"C (8 Fl Oz)",158.1,10,3.8,1915.1,20.4,4,11.2,3785.1,4.8,32.6,2.2,""));
    foods.push(newFood("New England Clam chowder",0.75,1,"C (8 Fl Oz)",175.7,10,5,1864.9,21.8,1.5,10.9,20.1,4.8,82.8,2.8,""));
    foods.push(newFood("Tomato Soup",0.39,1,"C (8 Fl Oz)",170.7,0,3.8,1744.4,33.2,1,4.1,1393,133,27.6,3.5,""));
    foods.push(newFood("New England Clam chowder,W/ Milk",0.99,1,"C (8 Fl Oz)",163.7,22.3,6.6,992,16.6,1.5,9.5,163.7,3.5,186,1.5,""));
    foods.push(newFood("Cream of Mushroom Soup,W/Milk",0.65,1,"C (8 Fl Oz)",203.4,19.8,13.6,1076.3,15,0.5,6.1,153.8,2.2,178.6,0.6,""));
    foods.push(newFood("Beanbacon Soup,W/Water",0.67,1,"C (8 Fl Oz)",172,2.5,5.9,951.3,22.8,8.6,7.9,888,1.5,81,2,""));

    for(var i=0;i<64;i++){
      foods[i].image="images/"+i+".jpg";
    }
    return foods;
}

function newFood(name,pricePerServing,servingSize,servingUnit,calories,cholesterol,totalFat,sodium,carbohydrates,dietaryFiber,protein,vitA,vitC,calcium,iron,image){
  var food={
    name:name,
    pricePerServing:pricePerServing,
    servingSize:servingSize,
    servingUnit:servingUnit,
    calories:calories,
    cholesterol:cholesterol,
    totalFat:totalFat,
    sodium:sodium,
    carbohydrates:carbohydrates,
    dietaryFiber:dietaryFiber,
    protein:protein,
    vitA:vitA,
    vitC:vitC,
    calcium:calcium,
    iron:iron,
    image:image
  };
  return food;
}
