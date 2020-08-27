const result = Array.prototype.map.call([1, 2, 3], (item) => {
  return item.toFixed(1);
});

// result: ['1.0', '2.0', '3.0']
