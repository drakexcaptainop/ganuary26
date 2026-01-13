let lp
var lpModel 
async function setup() {
  lpModel = await loadModel('./lp.obj')
  createCanvas(400, 400, WEBGL );
  background(220);
  lp = new LightPole( 120  )
}

function draw() {
  background(0)
  noStroke()
  orbitControl()
  lights ()
  ambientLight(1)
  lp.draw()
  
  push ()
  translate (0, 120, 0)
  rotateX (PI/2)
  fill (80)
  plane (1000, 1000)
  pop ()
}

class Timer{
  constructor(duration){
    this.currentTime = 0
    this.duration = duration
    this.hasEnded = false
  }
  static new(duration){
    return new Timer(duration)
  }
  step(){
    if(this.currentTime >= this.duration){
      this.hasEnded = true
      return 
    }
    this.currentTime += deltaTime / 1000
  }
  reset(){
    this.currentTime = 0
  }
}

class LightPole{
  constructor(planeY){
    this.time = 0
    this.planeY = planeY
    this.model = lpModel
    this.offInterval = 0
    this.offTimer = null 
    this.turnOff = false
    this.pOff = 0.1
  }

  draw(){
    if(this.offTimer){
      this.offTimer.step()
      if(this.offTimer.hasEnded){
        this.offTimer = null
      }
    }else{
      spotLight(color(255, 0, 0), createVector( 50, -120, 0 ), createVector(0, 1, 0), PI, 20 )
    }
    if(random() < this.pOff){
      this.offTimer = Timer.new( random(0.05, 0.5) )
    }
    this.time += deltaTime/1000
    push ()
    fill (0, 255, 0)
    translate(0, this.planeY, 0)
    scale (30)
    rotateX(PI)
    model(this.model)
    translate(0, -this.planeY, 0)
    pop ()
  }
}
