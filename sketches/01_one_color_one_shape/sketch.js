let sharedNormal, u1, u2, vertices
let dz = 2, rw = 50, rh = 30;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  let rw2 = rw/2
  let rh2 = rh/2
  vertices = [
    createVector(rw2, rh2),
    createVector(rw2, -rh2),
    createVector(-rw2, -rh2),
    createVector(-rw2, rh2)
  ]
}
let globalZ = 3
let t = 0
function draw() {
  background(0);
  noFill()
  stroke(255, 0, 0)
  strokeWeight(4)
  globalZ = 3*sin(t/10)
  sharedNormal = createVector(cos(t), .8*sin(t*5), -cos(t)).normalize()
  u1 = createVector(1, 0, 0).cross( sharedNormal ).normalize()
  u2 = u1.cross( sharedNormal ).normalize()
  t+=deltaTime/1000
  for(let i=-15; i<0; i++){
    let x0 = p5.Vector.mult(sharedNormal, i/abs (sin (t))).add( width/2, height/2, globalZ )//.add( createVector( noise((i+t))*100*sin(t), -noise((i+t))*100*sin(t) ) )
    let z = x0.z
    beginShape()
    vertices.forEach( vert => {
      let k = ( 7 + i )
      let u = lincom( [u1, vert.x*k], [u2, vert.y*k] ).add(x0)
      vertex( u.x / z, u.y / z )
    } )
    endShape(CLOSE)
  }


  for(let i=0; i<14; i++){
    let x0 = p5.Vector.mult(sharedNormal, i/abs (sin (t))).add( width/2, height/2, globalZ )
    let z = x0.z
    beginShape()
    vertices.forEach( vert => {
      let k = ( 7 - i )
      let u = lincom( [u1, vert.x*k], [u2, vert.y*k] ).add(x0)
      vertex( u.x / z, u.y / z )
    } )
    endShape(CLOSE)
  }
}

function lincom(...vecsc){
  let u = createVector(0)
  for(let [v, t] of vecsc){
    u.add( p5.Vector.mult( v, t ) )
  }
  return u
}