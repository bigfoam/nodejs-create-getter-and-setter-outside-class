const Test = require('./Test');

// run `node index.js` in the terminal
const test = new Test();
console.log(test.valueOf());

console.log(test.var1);
console.log(test.var2);

test.var1 = true;
test.var2 = 1;

console.log(test.var1);
console.log(test.var2);
