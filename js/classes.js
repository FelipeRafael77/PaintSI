
var figura;
var Figura = Class.create({
	setPoint: function(x, y) {
		if (this.x1 == undefined) {
			this.x1 = x;
			this.y1 = y;
		} else {
			this.x2 = x;
			this.y2 = y;
		}
	},
	clear: function() {
		this.x1 = undefined;
		this.x2 = undefined;
		this.y1 = undefined;
		this.y2 = undefined;
	}
});

var Linha = Class.create(Figura, {
	draw: function(canvas) {
		canvas.beginPath();
		canvas.moveTo(this.x1, this.y1);
		canvas.lineTo(this.x2, this.y2);
		canvas.stroke();
	}
});

var LinhaGrossa = Class.create(Figura, {
	draw: function(canvas) {
		canvas.beginPath();
		canvas.moveTo(this.x1, this.y1);
		canvas.lineTo(this.x2, this.y2);
		canvas.stroke();
	}
});

var Retangulo = Class.create(Figura, {
	draw: function(canvas) {
		canvas.strokeRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
	}
});

var RetanguloCheio = Class.create(Figura, {
	draw: function(canvas) {
		canvas.fillRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
	}
});

var Circulo = Class.create(Figura, {
	draw: function(canvas){
		let radius = Math.sqrt(Math.pow((this.x1-this.x2), 2)+Math.pow((this.y1-this.y2), 2));
		canvas.beginPath();
		canvas.arc(this.x1, this.y1, radius, 0, 2 * Math.PI);
		canvas.stroke();
	}
});


var CirculoCheio = Class.create(Figura, {
	draw: function(canvas){
		let radius = Math.sqrt(Math.pow((this.x1-this.x2), 2)+Math.pow((this.y1-this.y2), 2));
		canvas.beginPath();
		canvas.arc(this.x1, this.y1, radius, 0, 2 * Math.PI);
		canvas.fill();
		canvas.stroke();
	}
});

var Triangulo = Class.create(Figura, {
	draw: function(canvas){
		
    canvas.beginPath();
    canvas.moveTo(300,150);
    canvas.lineTo(300,300);
    canvas.lineTo(150,300);
    canvas.closePath();
    canvas.stroke();
	}
});

var TrianguloCheio = Class.create(Figura, {
	draw: function(canvas){
		
		canvas.beginPath();
		canvas.moveTo(300,300);
		canvas.lineTo(150,300);
		canvas.lineTo(300,150);
		canvas.fill(); 
	}
});

Element.prototype.leftTopScreen = function() {
	var x = this.offsetLeft;
	var y = this.offsetTop;

	var element = this.offsetParent;

	while (element !== null) {
		x = parseInt(x) + parseInt(element.offsetLeft);
		y = parseInt(y) + parseInt(element.offsetTop);

		element = element.offsetParent;
	}

	return new Array(x, y);
}

function drawLine() {
	figura = new Linha();

}

function drawLineWidth() {
	figura = new LinhaGrossa();

	var ctx = document.getElementById('canvas').getContext('2d');

	ctx.lineWidth=10;

}

function drawStrokeRect() {
	figura = new Retangulo();
}

function drawFillRect() {
	figura = new RetanguloCheio();
}

function drawCircle(){
	figura = new Circulo();
}

function drawFillCircle(){
	figura = new CirculoCheio(); 
}

function drawTriangle(){
	figura = new Triangulo();

}

function drawFillTriangle(){
	figura = new TrianguloCheio();
}

function palcores(){
	var cores = ["#003366", "#336699", "#3366CC", "#003399", "#000099", "#0000CC", "#000066", "#006666", "#006699", "#0099CC", "#0066CC", "#0033CC", "#0000FF", "#3333FF", "#333399", "#669999", "#009999", "#33CCCC", "#00CCFF", "#0099FF", "#0066FF", "#3366FF", "#3333CC", "#666699", "#339966", "#00CC99", "#00FFCC", "#00FFFF", "#33CCFF", "#3399FF", "#6699FF", "#6666FF", "#6600FF", "#6600CC", "#339933", "#00CC66", "#00FF99", "#66FFCC", "#66FFFF", "#66CCFF", "#99CCFF", "#9999FF", "#9966FF", "#9933FF", "#9900FF", "#006600", "#00CC00", "#00FF00", "#66FF99", "#99FFCC", "#CCFFFF", "#CCCCFF", "#CC99FF", "#CC66FF", "#CC33FF", "#CC00FF", "#9900CC", "#003300", "#009933", "#33CC33", "#66FF66", "#99FF99", "#CCFFCC", "#FFFFFF", "#FFCCFF", "#FF99FF", "#FF66FF", "#FF00FF", "#CC00CC", "#660066", "#336600", "#009900", "#66FF33", "#99FF66", "#CCFF99", "#FFFFCC", "#FFCCCC", "#FF99CC", "#FF66CC", "#FF33CC", "#CC0099", "#993399", "#333300", "#669900", "#99FF33", "#CCFF66", "#FFFF99", "#FFCC99", "#FF9999", "#FF6699", "#FF3399", "#CC3399", "#990099", "#666633", "#99CC00", "#CCFF33", "#FFFF66", "#FFCC66", "#FF9966", "#FF6666", "#FF0066", "#CC6699", "#993366", "#999966", "#CCCC00", "#FFFF00", "#FFCC00", "#FF9933", "#FF6600", "#FF5050", "#CC0066", "#660033", "#996633", "#CC9900", "#FF9900", "#CC6600", "#FF3300", "#FF0000", "#CC0000", "#990033", "#663300", "#996600", "#CC3300", "#993300", "#990000", "#800000", "#993333"];

	var visualizar = document.getElementById('visualizar');
	var escolhas = document.getElementById('escolhas');

	cores.forEach(function(cor) {
		var button = document.createElement('button');
		button.value = cor;
		button.type = 'button';
		button.style.backgroundColor = cor;
		button.addEventListener('click', handler(button));
		escolhas.appendChild(button);
	});

	function handler(el) {
		return function() {
			visualizar.style.backgroundColor = el.value;
		}
	}
}

function createFigure(event) {
	console.log("X do mouse: " + event.clientX);
	console.log("Y do mouse: " + event.clientY);
	var xy = document.querySelector("#canvas").leftTopScreen();
	var x = event.clientX;
	var y = event.clientY;

	figura.setPoint(x - xy[0], y - xy[1]);
}

function closeFigure(event) {
	createFigure(event);
	var ctx = document.querySelector("#canvas").getContext('2d');
	figura.draw(ctx);
	figura = Object.clone(figura);
	figura.clear();
}

function toggleShadow() {
	var ctx = document.querySelector("#canvas").getContext('2d');
	if (ctx.shadowBlur == 10) {
		ctx.shadowColor = "transparent";
		ctx.shadowBlur = 0;
		document.querySelector("#toggle").value = "Ligar Sombra";
	} else {
		ctx.shadowColor = "blue";
		ctx.shadowBlur = 10;
		document.querySelector("#toggle").value = "Desligar Sombra";
	}
}

function save() {
	
	var img = document.createElement('a');
	img.download = "download.png";
	img.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	img.click();

}