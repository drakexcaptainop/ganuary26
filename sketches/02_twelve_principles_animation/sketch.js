const Time = {
  MIN: 0,
  MAX: 10
}

let sm 

function setup() {
  createCanvas(400, 400);
  background(220);
  
  sm = new smile( 10 )
}



function draw() {
  background(255)
  ellipse( width * .25, height * .25, 120 )
  ellipse( width * .75, height * .25, 120 )

  let n = 10
  let rmax = 120

  for(let i=0; i<n; i++){
    let r1 = Math.abs(Math.sin((sm.time-i)/10)) * (rmax)
    let r2 = Math.abs(Math.cos((sm.time-i))) * (rmax)
    ellipse( width * .25, height * .25, r1 )
    ellipse( width * .75, height * .25, r2 )
  }
  sm.update()
  sm.draw()
}

class smile{
  constructor(nSamplePoints){
    this.time = 0
    this.transitionTime = 2 // seconds
    this.sampleT = [0]
    this.dt = 1/nSamplePoints
    for(let i=0; i<nSamplePoints; i++){
      this.sampleT.push( this.dt * (i+1) )
    }
  }

  update(){
    this.time += deltaTime / 5000
  } 

  draw(){
    beginShape()
    for(let t of this.sampleT){
      let y1 = -this.target( t )
      let y2 = this.target( t )
      let yi = this.lerp( y1, y2, this.time )
      let x = t * width 
      let y = -yi * height 
      vertex(x, y+height*.8)
    }
    noFill()
    endShape()


    beginShape()
    for(let t of this.sampleT){
      let z1 = -this.target2( t )
      let z2 = this.target2( t )
      
      let zi = this.lerp( z1, z2, this.time )
      let x = t * width 
      let y = -zi * height 
      vertex(x, y+height*.9)
    }
    noFill()
    endShape()
  }

  lerp(x1, x2, u){
    u = Math.min( 1, Math.max( u, 0 ) )
    return x1 + (x2 - x1) * u
  }

  target(t){
    return Math.pow (1.2, 2) * pow((t - .5), 2)
  }

  target2(t){
    return Math.pow (1.35, 2) * pow((t - .5), 2)
  }
  initial(t){
    return 0 
  }
}
