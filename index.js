const images = document.getElementsByClassName("image");

var globalIndex = 0,
    last = { x: 0, y: 0 };

let frameNum = globalIndex;

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;
  image.dataset.status = "active";

  last = { x, y };
}

/*Calculating the distance mouse has moved onscreen*/
const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

/*window.innerWidth/x is distance required to move to the next image*/
const handleOnMove = e => {
  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 18)) {
    /*Determining length of the image snake*/
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 6) % images.length];
    
    /*changing the lead image after proper mmouse distance*/
    activate(lead, e.clientX, e.clientY);
    /*making the last image in the snake disappear from view*/
    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
    
    /*Frame counter increments at the same rate as globalIndex but resets when it reaches the last frame of the fightscene*/
    frameNum++;
    document.getElementById("frame").innerHTML = frameNum;
    if (frameNum>20) frameNum-=21
  }  
}

window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);