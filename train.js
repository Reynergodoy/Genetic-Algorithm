const _canvas = document.createElement('canvas');
const ctx = _canvas.getContext('2d');
const hidden = document.getElementById('hidden');
const img = document.createElement('img');
const ind = new Individual(50, 0.5);
hidden.appendChild(_canvas);

function setup (src) {
  ind.init(canvas);
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0);
    ind.target = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  });
  img.src = src;
}

function train (iterations) {
  const context = canvas.getContext('2d');
  for (let i = 0; i < iterations; i++) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ind.mutate();
    ind.draw(context);
    const newFitness = ind.compare(context);
    if (newFitness < ind.fitness) { // low fitness means better
      ind.fitness = newFitness;
    } else {
      ind.rollback();
    }
  }
}
