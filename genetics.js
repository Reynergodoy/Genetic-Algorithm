class Individual {
  constructor (quantity) {
    this.genes = [];
    this.target = [];
    this.fitness = 0;
    this.generation = 0;
    this.quantity = quantity;
  }
  init (canvas) {
    const quantity = this.quantity;
    const genes = this.genes;
    for (let i = 0; i < quantity; i++) {
      genes.push(new Genotype().init(canvas));
    }
    return this;
  }
  draw (canvas) {
    
  }
  mutate () {
    const times = Math.floor(Math.random() * this.genes.length);
    const genes = this.genes;
    const len = genes.length;
    for (let i = 0; i < times; i++) {
      genes[Math.floor(Math.random() * len)].mutate();
    }
  }
  compare (canvas) {
    
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
      points.push([Math.floor(Math.random() * canvas.length), Math.floor(Math.random() * canvas.height)]);
    }
    this.colors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    return this;
  }
  mutate () {
    const rand = Math.floor(Math.random() * 3);
    if (rand === 0) {
      this.move();
    } else if (rand === 1) {
      this.changePoint();
    } else if (rand === 2) {
      this.changeColor();
    }
  }
  move () {
    const points = this.points;
    const len = points.length;
    const deltaX = Math.floor(Math.random() * 11) - 5;
    const deltaY = Math.floor(Math.random() * 11) - 5;
    this.rollback[0] = [...points];
    for (let i = 0; i < len; i++) {
      points[i][0] += deltaX;
      points[i][1] += deltaY;
    }
  }
  changePoint () {
    const points = this.points;
    const rand = Math.floor(Math.random() * points.length);
    this.rollback[0] = [...points];
    points[rand][0] += Math.floor(Math.random() * 11) - 5;
    points[rand][0] += Math.floor(Math.random() * 11) - 5;
  }
  changeColor () {
    const colors = this.colors;
    const rand = Math.floor(Math.random() * 4);
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
