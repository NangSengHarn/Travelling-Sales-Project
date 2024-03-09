function addCity() {
  
  if (!isGeneratingTSP) {
    let newCity = createVector(mouseX, mouseY);
    cities.push(newCity);
    totalCities++;
    
  }
}

function start(){
  starting = true;
}

function generateTSP() {
  if (!isGeneratingTSP && totalCities > 2) {
      isGeneratingTSP = true;
      order = Array.from(Array(totalCities).keys());
      bestEver = order.slice();
      totalPermutations = factorial(totalCities);
      generatePermutations();
  } else if (totalCities <= 2) {
      alert("Please add at least 3 locations.");
  }
}

function generatePermutations() {
  let count = 0;
  while (count < totalPermutations) {
      let i = floor(random(totalCities));
      let j = floor(random(totalCities));
      swap(order, i, j);
      distance = calcDistance(cities, order);
      
      textSize(16);
      fill(255);
      let no = count+1;
      let p = no*40;
      showWay("Way -"+no+": " + distance.toFixed(2) + " meters",900,p);
      
      if (distance < recordDistance) {
          recordDistance = distance;
          bestEver = order.slice();
      }
      count++;
  }
}

function showWay(show,w,h){
  textElement = createP(show);
  textElement.position (w,h);
  textElement.style("font-size","30px");
  textElement.style("color","darkgoldenrod");
  textElement.style("font-family","Dekko");
  textElement.style("text-shadow","-1px -1px 0 sandybrown,1px -1px 0 sandybrown,-1px 1px 0 sandybrown,1px 1px 0 sandybrown");
}

function showText(show,w,h){
  textElement = createP(show);
  textElement.position (w,h);
  textElement.style("position","fixed");
  textElement.style("font-size","34px");
  textElement.style("font-weight","bold");
  textElement.style("color","sandybrown");
  textElement.style("font-family","Dekko");
  textElement.style("text-shadow","-2px -2px 0 darkgoldenrod,2px -2px 0  darkgoldenrod,-2px 2px 0  darkgoldenrod,2px 2px 0  darkgoldenrod");
 }

 function swap(a, i, j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
 }

 function calcDistance(points, order){
    var sum = 0;
    for (var i=0; i<order.length-1; i++){
        var cityAIndex = order[i];
        var cityA = points[cityAIndex];
        var cityBIndex = order[i+1];
        var cityB = points[cityBIndex];

        var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
        sum += d;
    }
    return sum;
 }

 function swapCities(){
  let fcity=cities[bestEver[0]];
  let lcity=cities[bestEver[bestEver.length-1]];
  var firstd = dist(carPosition.x, carPosition.y, fcity.x, fcity.y);
  var lastd = dist(carPosition.x, carPosition.y, lcity.x, lcity.y);
  if(firstd>lastd){
    bestEver.reverse();
  }

 }

 function factorial(n) {
  if (n==1){
      return 1;
  }else{
      return n*factorial(n-1);
  }
  
}

function nextOrder() {
  count ++;
 //step 1 of the algorithm
 var largestI = -1;
 for (var i = 0; i < order.length-1; i++){
   if (order[i] < order[i+1]) {
     largestI = i;
   }
 }
 
 if (largestI == -1){
  //make the first city is the nearest city to the car
  swapCities();
  isGeneratingTSP = false;
  generatingDone = true;
  console.log('finished');
 }
//step 2
 var largestJ = -1;
 for (var j = 0; j < order.length; j++){
   if (order[largestI] < order[j]){
     largestJ = j;
   }
 }
//step3
 swap(order, largestI, largestJ);

//step4: reverse from largestI + 1 to the end
 var endArray = order.splice(largestI + 1);
 endArray.reverse();
 order = order.concat(endArray);
}

function showT(show,w,h){
  textElement = createP(show);
  textElement.position (w,h);
  textElement.style("text-align","center");
  textElement.style("font-size","34px");
  textElement.style("font-weight","bold");
  textElement.style("color","darkgoldenrod");
  textElement.style("font-family","Dekko");
  textElement.style("text-shadow","-2px -2px 0 sandybrown,2px -2px 0  sandybrown,-2px 2px 0  sandybrown,2px 2px 0  sandybrown");
 }