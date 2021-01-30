// https://medium.com/technofunnel/javascript-function-chaining-8b2fbef76f7f

var Obj = {
  result: 0,
  addNumber: function (a, b) {
    this.result = a + b;
    return this;
  },

  multiplyNumber: function (a) {
    this.result = this.result * a;
    return this; // important to return 'this'
  },

  divideNumber: function (a) {
    this.result = this.result / a;
    return this;
  },
};

Obj.addNumber(10, 20).multiplyNumber(10).divideNumber(10);
