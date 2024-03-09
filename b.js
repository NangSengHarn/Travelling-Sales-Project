let currentPage = 1; // Variable to store the current page/state
let cities = [];
let totalCities;
let distance;
let recordDistance;
let bestEver;
let order = [];
var totalPermutations;
var count = 0;
var mapImage;
let canvasWidth = 1400;
let canvasHeight = 2500;
let isGeneratingTSP = false;
let generatingDone = false;
let percentLoading = true;
let textElement;
let carPosition;
let carStep = 0;
let hidden = false;
let button;

function preload() {
  mapImage = loadImage('grass.jpg'); // Replace 'map.jpg' with your image path
  carIcon = loadImage('car.png'); // Load the image for the car
  childIcon = loadImage('child.png');
  bg = loadImage('bg.png');
  homeIcon = loadImage('home.png'); // Load the image for the home/city icon
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //image(mapImage, 0, 0, canvasWidth, canvasHeight); 

 
  //create button
   button = createButton('Generate!');
   button.style("font-size","28px");
   button.style("color","darkgoldenrod");
   button.style("border-color","darkgoldenrod");
   button.style("background-color","cornsilk");
   button.style("font-family","Dekko");
   button.style("text-shadow","-1px -1px 0 sandybrown,1px -1px 0 sandybrown,-1px 1px 0 sandybrown,1px 1px 0 sandybrown");
   button.size(150,50);
   button.style("border-radius","12px");
   //button.position (30,120);
   button.style("position","fixed");
   button.mouseClicked(()=>{
   generateTSP();
   })

  // Initially, there are no cities
  totalCities = 0;
  recordDistance = Infinity;
  
  // Listen for mouse clicks on the canvas
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.mouseClicked(addCity);
    
  let v = createVector(100, 200);
  carPosition = v.copy();
}

function draw() {
  if (!hidden) {
    image(bg, 0, 0, 1400, 600);
    
  }else{
    for(let y=0; y<canvasHeight; y+=mapImage.height){
      image(mapImage, 0, y,canvasWidth);
    }
    button.position (30,120);
    drawPage2();
  }
}

// Function to toggle pages
function keyPressed() {
  // If Enter key is pressed and current page is 1, switch to page 2
  if (keyCode === ENTER) {
    hidden = !hidden;
  }
}
