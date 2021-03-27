let number = 2147483647;
number = 6620830889;
let factors = 2;
let os = require('os-utils');

os.cpuUsage(function(v){
  console.log( 'CPU Usage (%): ' + v );
});

console.time('prime calculation');

for (let index = 2; index < number / 2 && factors == 2; index += 1) {
  if (number % index == 0) {
    factors += 1;''
  }
}

console.timeEnd('prime calculation');

if (factors == 2) {
  console.log(number, 'is prime!');
} else {
  console.log(number, 'is not prime!')
}