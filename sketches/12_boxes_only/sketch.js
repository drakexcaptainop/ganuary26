let bf 
let flyers = []
const FLYER_DIM = 20


async function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  background(220);
  bf = new BoxFlyer(createVector(0, 0, 0), createVector(0, 0, 20), createVector(-10, 5, 5))
  let img = await loadImage('./rigby.gif');
  let n = 10
  let bx0 = createVector( 0, 0, 100 )
  let imwidth = img.width 
  let imgheight = img.height
  let sw = imwidth / n 
  let sh = imgheight / n 

  let scx = p5.Vector.sub( bx0, createVector( 1,1,1 ).mult(n*FLYER_DIM*.5) ) 
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if(k==0){
          var tex = img.get( sw * i, sh * j, sw, sh )
        }
        let x0 = createVector(random(-5000, 5000), random(-5000, 5000), random(-5000, 5000))
        let X = createVector( i * FLYER_DIM, j * FLYER_DIM, k * FLYER_DIM ).add(scx)
        let flyer = new BoxFlyer( x0, X, createVector( random (20), random (20), random (20) ), tex )
        flyers.push(flyer)
      }
    }
  }
}

let t=0
function draw() {
  background(0)
  flyers.forEach(f => { f.draw(); f.update();  })
}

function mousePressed(){
  noLoop()
}

class BaseFlyer{
  constructor(x0, xf, v0){
    this.x0 = x0
    this.xf = xf
    this.xt = createVector( x0.x, x0.y, x0.z )
    this.time = 0
    this.v = v0
    this.basesf = (x, xt) => xt - x
    this.pix = new KVarPI_cont( x0.x, 0.1, this.basesf, 1e-8, 1e-8 )
    this.piy = new KVarPI_cont( x0.y, 0.1, this.basesf, 1e-8, 1e-8 )
    this.piz = new KVarPI_cont( x0.z, 0.1, this.basesf, 1e-8, 1e-8 )
  }

  update(){
    this.time += deltaTime/1000
    this.pix.update( this.xt.x, this.xf.x )
    this.piy.update( this.xt.y, this.xf.y )
    this.piz.update( this.xt.z, this.xf.z )
    let piv = createVector( this.pix.u(), this.piy.u(), this.piz.u() )
    this.xt.add( this.v )
    this.xt.add( piv )
  }
}

class BoxFlyer extends BaseFlyer{
  constructor(x0, xf, v0, tex){
    super( x0, xf, v0 )
    this.alpha = 0
    this.tex = tex 
  }

  draw(){
    push ()
    if(this.tex)
      texture (this.tex )
    translate(this.xt.x, this.xt.y, this.xt.z)
    box(FLYER_DIM)
    pop ()
  }
}

class PI_cont{
  constructor(x0, dt, subFunc, ki, kp){
    this.history=[[x0, x0]] 
    this.t = 0
    this.dt = dt
    this.subf = subFunc
    this.ki = ki
    this.kp = kp
  }
  
  update(x, xt){
    this.t += deltaTime/1000
    if(this.t > this.dt){
      this.t = 0
      this.history.push( [x, xt] )
    }
  }
    
  e(t){
    if(t!=undefined){
      let ht = this.history[t]
      return this.subf(...ht)
    }
    return this.history.map( v_i => this.subf(...v_i) ).slice(1)
  }
  
  I(){ // sum_{ e(t_i) * dt_i }
    return this.ki * (this.e().map( e_i => e_i * this.dt )).reduce((c, p)=>c+p, 0)
  }
  
  P(){
    return this.kp * this.e(this.history.length-1)
  }
  
  u(){ // kp * e(t) + ki * sum_( e(t_i) * dt_i )
    return this.P() + this.I()
  }
  
}


class KVarPI_cont extends PI_cont{
  constructor(x0, dt, subFunc, ki0, kp0){
    super(x0, dt, subFunc, 0, 0)
    this.kp0 = kp0
    this.ki0 = ki0
    this.cf = 0
  }
  // k2 = k1 + 0.0001 + 0.00001
  // k3 = k0 + t * 0.0001
  update(x, xt){
    this.cf += deltaTime/1000
    this.ki = Math.min( 0.1, this.ki0 + Math.pow( this.cf/50, 2  ) )
    this.kp = Math.min( 0.1, this.kp0 + Math.pow( this.cf/50 , 2 )  )
    super.update(x, xt)
  }
}