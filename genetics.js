class Individual {
  constructor (quantity, alpha) {
    this.genes = [];
    this.target = [];
    this.fitness = 0;
    this.generation = 0;
    this.quantity = quantity;
    this.alpha = alpha;
  }
  init (canvas) {
    const quantity = this.quantity;
    const genes = this.genes;
    for (let i = 0; i < quantity; i++) {
      genes.push(new Genotype().init(canvas));
    }
    return this;
  }
  draw (context) {
    const genes = this.genes;
    const len = genes.length;
    context.globalAlpha = this.alpha;
    for (let i = 0; i < len; i++) {
      const gene = genes[i];
      const points = gene.points;
      const pLen = points.length;
      const fPoint = points[0];
      context.fillStyle = 'rgb(' + gene.colors.toString() + ')';
      context.beginPath();
      context.moveTo(fPoint[0], fPoint[1]);
      for (let i = 1; i < pLen; i++) {
        const point = points[i];
        context.lineTo(point[0], point[1]);
      }
      context.closePath();
      context.fill();
    }
  }
  mutate (canvas) {
    const times = Math.floor(Math.random() * this.genes.length);
    const genes = this.genes;
    const len = genes.length;
    for (let i = 0; i < times; i++) {
      genes[Math.floor(Math.random() * len)].mutate(canvas);
    }
  }
  compare (context) {
    const target = this.target;
    const data = context.getImageData(0, 0, context.canvas.width, context.canvas.height).data;
    let fitness = 0;
    for (const piece in data) {
      fitness += Math.abs(data[piece] - target[piece]); 
    }
    return fitness;
  }
  rollback () {
    const genes = this.genes;
    const len = genes.length;
    for (let i = 0; i < len; i++) {
      genes[i].rollBack();
    }
  }
}

class Genotype {
  constructor () {
    this.points = [];
    this.colors = [];
    this.rollback = [null, null];
  }
  init (canvas) {
    const points = this.points;
    for (let i = 0; i < 3; i++) {
      points.push([Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)]);
    }
    this.colors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    return this;
  }
  mutate (canvas) {
    const rand = Math.floor(Math.random() * 4);
    if (rand === 0) {
      this.move();
    } else if (rand === 1) {
      this.changePoint();
    } else if (rand === 2) {
      this.changeColor();
    } else if (rand ===3) {
      this.randomPoint(canvas);
    }
  }
  move () {
    const points = this.points;
    const len = points.length;
    const deltaX = Math.floor(Math.random() * 11) - 5;
    const deltaY = Math.floor(Math.random() * 11) - 5;
    this.rollback = [null, null];
    this.rollback[0] = [...points];
    for (let i = 0; i < len; i++) {
      points[i][0] += deltaX;
      points[i][1] += deltaY;
    }
  }
  changePoint () {
    const points = this.points;
    const rand = Math.floor(Math.random() * points.length);
    this.rollback = [null, null];
    this.rollback[0] = [...points];
    points[rand][0] += Math.floor(Math.random() * 11) - 5;
    points[rand][1] += Math.floor(Math.random() * 11) - 5;
  }
  randomPoint (canvas) {
    const points = this.points;
    const rand = Math.floor(Math.random() * points.length);
    this.rollback = [null, null];
    this.rollback[0] = [...points];
    points[rand][0] = Math.floor(Math.random() * canvas.width);
    points[rand][1] = Math.floor(Math.random() * canvas.height);
  }
  changeColor () {
    const colors = this.colors;
    const rand = Math.floor(Math.random() * 3);
    this.rollback = [null, null];
    this.rollback[1] = [...colors];
    colors[rand] = Math.abs(colors[rand] + Math.floor(Math.random() * 11) - 5) % 255;
  }
  rollBack () {
    if (this.rollback[0] !== null) {
      this.points === this.rollback[0];
      this.rollback[0] = null;
    }
    if (this.rollback[1] !== null) {
      this.colors === this.rollback[1];
      this.rollback[1] = null;
    }
  }
}
