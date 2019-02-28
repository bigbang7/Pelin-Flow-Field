
let inc = 0.1;
let scl = 20;
let cols,rows;

let fr;
let zoff = 0;

let particles = [];

let flowfield;


function setup(){
   let canvas = createCanvas(300, 300);
   canvas.parent('canvas');
   background(30);
   cols = floor(width/scl);
   rows = floor(height/scl);
   fr = createP();

    flowfield = new Array(cols * rows);

   for(let i = 0; i < 200; i++){

        particles[i] = new Particle();
        
   }
    
}

function draw(){
    
    let yoff = 0;
    for(let y = 0; y < rows; y++){
        let xoff = 0;
        for(let x = 0; x < cols; x++){
            var index = x + y * cols;
        
            let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowfield[index] = v;

            xoff += inc;

            // stroke(255,20);

            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // line(0,0,scl,0);
            // pop();
        }

        yoff += inc;
        zoff += 0.0004;
    }
    for(let i = 0; i < particles.length; i++){

        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
        
    }
    fr.html(floor(frameRate()));
   
}