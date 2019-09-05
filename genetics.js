class Individual {
  constructor (quantity) {
    this.genes = [];
    this.target = [];
    this.fitness = 0;
    this.generation = 0;
    this.quantity = quantity;
  }
  draw (canvas) {
    
  }
  mutate () {
  }
  compare () {
    
  }
  rollback () {
  }
  init () {
    return this;
  }
}

class Genotypes {
  constructor (points, colors) {
    this.points = points;
    this.colors = colors;
    this.rollback = [null, null];
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
      this.points[i][0] += deltaX;
      this.points[i][1] += deltaY;
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
}
