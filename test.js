function drawPage2() {
  showText("Click on where you want to go- more than two locations",30,0);
  showText("Taxi fees is $1.2 per meter!",30,40);
  //frameRate(10);
  
  if (generatingDone){


    // Draw the shortest path
    stroke(184,134,11);
    strokeWeight(50);
    noFill();
    beginShape();
    for (let i = 0; i < bestEver.length; i++) {
      let n = bestEver[i];
      let x = cities[n].x + 40;
      let y = cities[n].y + 40;
      vertex(x, y);
  
    }
    endShape();

    // Animate the car along the path
    if (carStep < bestEver.length) {
      let targetCity = cities[bestEver[carStep]];
      let stepSize = 0.05;
      carPosition.x += (targetCity.x - carPosition.x) * stepSize;
      carPosition.y += (targetCity.y - carPosition.y) * stepSize;
      if (dist(carPosition.x, carPosition.y, targetCity.x, targetCity.y) < 1) {
        carStep++;
      }
    }
    else {
      noLoop();
    }

    showText("Shortest Distance: " + recordDistance.toFixed(2)+ " meters",30,450);
    showText("Minimum Cost: $" + (recordDistance*1.2).toFixed(2),30,500);

    
  }
  
  if (isGeneratingTSP){
    // Draw the cities as home icons
    for (let i = 0; i < cities.length; i++) {
        image(homeIcon, cities[i].x - 12, cities[i].y - 12, 100, 100);
    }
    // Draw the path
    stroke(255);
    strokeWeight(0.5);
    noFill();
    beginShape();
    for (var i=0; i<order.length; i++){
       var n = order[i];
       let x = cities[n].x + 10;
       let y = cities[n].y + 10;
       vertex(x, y);
    }
    endShape();
    
    nextOrder();
  }
  else{
    // Draw the cities as home icons
    for (let i = 0; i < cities.length; i++) {
        image(homeIcon, cities[i].x - 12, cities[i].y - 12, 100, 100);  
    }
  }

  // Draw the car
  image(carIcon, carPosition.x - 12, carPosition.y - 12, 150, 120);

  }

