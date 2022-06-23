const canvas = document.querySelector('#can');
const ctx = canvas.getContext('2d')
var hsl =0
var particleArray =[]
var mouseActive = false

window.addEventListener('load',()=>{
    canvas.width = document.width;
    canvas.height = document.height;
})
window.addEventListener('resize',()=>{
    canvas.width = document.width;
    canvas.height = document.height;
})
const mouse = {
    x: undefined,
    y: undefined
}
canvas.addEventListener('mousemove',(e)=>{
    if(mouseActive){

        mouse.x = e.x;
        mouse.y = e.y;
        for (let index = 0; index < 1000; index++) {
            particleArray.push(new Particles)
        }
    }
})
canvas.addEventListener('mousedown',()=>{
    mouseActive = true;
    // console.log(mouseActive);
   
})
canvas.addEventListener('mouseup',()=>{
    mouseActive = false
})

class Particles{
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `hsl(${hsl},100%,50%)`
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY
        if(this.size < 0.2){
            this.size -=0.1
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
    }
    
}
function handleParticle(){
    for (let index = 0; index < particleArray.length; index++) {
        particleArray[index].update()
        particleArray[index].draw()
        
        for(let j = index; j<particleArray.length;j++){
            const dx = particleArray[index].x - particleArray[j].x
            const dy = particleArray[index].y - particleArray[j].y
            const distace = Math.sqrt(dx*dx + dy*dy)
            if(distace < 100){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[index].color
                ctx.lineWidth = 0.5
                ctx.moveTo(particleArray[index].x,particleArray[index].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke()
            }
        }
        if(particleArray[index].size <=0.3){
            particleArray.splice(index,1)
            index--
        }
    }
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    handleParticle()
    hsl++
    requestAnimationFrame(animate)
}
animate()
