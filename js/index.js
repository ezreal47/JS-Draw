class Draw {
  constructor() {
    this.canvas = document.querySelector('#canvas')
    this.context = this.canvas.getContext('2d')

    this.mousedown = false
    this.lastPoint = {x:null,y:null}
    this.newPoint = {x:null,y:null}

    this.setCanvasSize()
	  this.context.lineWidth = 10;
    this.context.strokeStyle = '#13c5f7';
    this.listen()

  }
  listen() {
    this.canvas.addEventListener('mousedown',(e) => {
      this.mousedown = true
      this.lastPoint = {x:e.clientX, y:e.clientY}
    })
    this.canvas.addEventListener('mousemove',(e) => {
      this.moveMouse(e)

      if(this.mousedown) {
        this.newPoint = {x: e.clientX, y:e.clientY}
        this.draw(this.lastPoint.x,this.lastPoint.y,this.newPoint.x,this.newPoint.y)
        this.lastPoint = this.newPoint
      }
    })
    this.canvas.addEventListener('mouseup',() => {
      this.mousedown = false
    })
    this.canvas.addEventListener('mouseout',() => {
      this.mousedown = false
    })
  }
  draw(x1,y1,x2,y2) {
    this.context.lineCap = 'round'
    this.context.lineJoin = 'round'

    this.context.beginPath()
    this.context.moveTo(x1,y1)  // 起点
    this.context.lineTo(x2,y2) // 终点
    this.context.closePath()
    this.context.stroke()
  }
  setCanvasSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight - 60
  }
  redrwa() { 
    this.context.clearRect(0,0,window.innerWidth,window.innerHeight - 60)
  }
  moveMouse(e){
		let x = e.offsetX;
		let y = e.offsetY;
		var cursor = document.getElementById('cursor');
		cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
	}
}

let draw = new Draw()


let startDraw = document.querySelector('.btn.fadeup')
let welcome = document.querySelector('.welcome-bg')
startDraw.onclick = () => {
  welcome.classList.add('disappear')
}

let back = document.querySelector('.backWelcome')
back.onclick = () => {
  welcome.classList.remove('disappear')
}

//清除画板
let clearRect = document.querySelector('.clearRect')
clearRect.onclick = function(){
  draw.redrwa()
}

//下载图片
let save = document.querySelector('.save')
let popupSave = document.querySelector('.popupSave')
save.onclick = function(){
  popupSave.classList.toggle('active')
}
let download = popupSave.querySelector('.btn')
download.onclick = function(){
  let fillname = popupSave.querySelector('.fillname')
  let value = fillname.value
  if(value.length > 0) {
    download.download = value
    download.href = draw.canvas.toDataURL()
  }
}


// 选画笔尺寸
let pencil = document.querySelector('.pencil')
let popupSize = document.querySelector('.popupSize')
pencil.onclick = () => {
  popupSize.classList.toggle('active')
  pencil
}

let sizeData = [
  {width:6, lineWidth: 3 },
  {width:12, lineWidth: 10 },
  {width:22, lineWidth: 18 },
  {width:30, lineWidth: 28 }
]
for( i=0,n=sizeData.length; i<n; i++) {
  let penSize = document.createElement('li')
  penSize.classList.add('penSize')
  penSize.style.width = sizeData[i].width + 'px'
  penSize.style.height = sizeData[i].width + 'px'
  penSize.dataset.lineWidth = sizeData[i].lineWidth
  penSize.addEventListener('click',setSize)
  document.getElementById('size').appendChild(penSize)
}
function setSize(e){
  let item = e.target
  draw.context.lineWidth = item.dataset.lineWidth
  for(i=0,n=item.parentNode.children.length;i<n;i++) {
    item.parentNode.children[i].classList.remove('active')
  }
  item.classList.add('active')
}
document.getElementById('size').children[1].classList.add('active')


// 选画笔颜色
let popupColor = document.querySelector('.popupColor')
let palette = document.querySelector('.palette')
palette.onclick = () => {
  popupColor.classList.toggle('active')
}

let colors = [
  '#d4f713','#13f7ab','#13f3f7','#13c5f7','#138cf7','#1353f7','#2d13f7','#7513f7',
  '#a713f7','#d413f7','#f713e0','#f71397','#f7135b','#f71313','#f76213','#f79413',
  '#f7e013'
]

for(i=0,n=colors.length; i<n; i++) {
  let swatch = document.createElement('li')
  swatch.className = 'swatch'
  swatch.style.backgroundColor = colors[i]
  swatch.addEventListener('click',setSwatch)
  document.getElementById('colors').appendChild(swatch)
}

function setSwatch(e) {
  let swatch = e.target
  setColor(swatch.style.backgroundColor)
  swatch.classList.add('active')
}

function setColor(color) {
  draw.context.strokeStyle = color
  let active = document.getElementById('colors').getElementsByClassName('active')[0]
  if(active) {
    active.classList.remove('active')
  }
}








































// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');

// var radius = 10;
// var dragging = false;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// var CleanBtn = document.getElementById('clear');

// context.lineWidth = radius*2;

// var putPoint = function(e){
// 	if(dragging == true){
//     context.lineCap = 'square';
// 		context.lineTo(e.clientX, e.clientY);
// 		context.stroke();
// 		context.beginPath();
// 		context.arc(0, 0, radius, 0, 2*Math.PI/2^2*5);
// 		context.fill();
// 		context.beginPath();
// 		context.moveTo(e.clientX, e.clientY);
// 	}
// }

// var engage = function(e){
// 	dragging = true;
// 	putPoint(e);
// }

// var disengage = function(){
// 	dragging = false;
// 	context.beginPath();
// }

// var CleanCanvas = function(){
// 	context.fillStyle = 'white';
// 	context.fillRect(0,0, window.innerWidth, window.innerWidth);
// 	setSwatch({target: document.getElementsByClassName("swatch")[0]});
// }

// CleanBtn.addEventListener('click', CleanCanvas);
// canvas.addEventListener('mousedown', engage);
// canvas.addEventListener('mouseout', disengage);
// canvas.addEventListener('mousemove', putPoint);
// canvas.addEventListener('mouseup', disengage);

// var setRadius = function(newRadius){
// 	if(newRadius<minRad){
// 		newRadius = minRad;
// 	}else if(newRadius>maxRad){
// 		newRadius = maxRad;
// 	}
// 	radius = newRadius;
// 	context.lineWidth = radius*2;

// 	radSpan.innerHTML = radius;
// }

// var minRad = 0.5,
// 	maxRad = 100,
// 	interval = 5,
// 	defaultRad = 20,
// 	radSpan = document.getElementById('radval'),
// 	decRad = document.getElementById('decrad'),
// 	incRad = document.getElementById('incrad');
// decRad.addEventListener('click', function(){
// 	setRadius(radius-interval);
// })

// incRad.addEventListener('click', function(){
// 	setRadius(radius+interval);
// })

// setRadius(defaultRad);

// var colors = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// for(var i=0, n=colors.length; i<n; i++){
// 	var swatch = document.createElement('div');
// 	swatch.className = "swatch";
// 	swatch.style.backgroundColor = colors[i];
// 	swatch.addEventListener('click', setSwatch);
// 	document.getElementById('colors').appendChild(swatch);
// }

// function setColor(color){
// 	context.fillStyle = color;
// 	context.strokeStyle = color;
// 	var active = document.getElementsByClassName("active")[0];
// 	if(active){
// 		active.className = "swatch";
// 	}
// }

// function setSwatch(e){
// 	var swatch = e.target;
// 	setColor(swatch.style.backgroundColor);
// 	swatch.className += " active";
// }

// setSwatch({target: document.getElementsByClassName("swatch")[0]});
