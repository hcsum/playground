const dns = require('dns');
const dnsPromises = dns.promises;

// function dnsLookup(domain, value) {
//   return new Promise((resolve, reject) => {
//     dns.resolveTxt(domain, (err, result) => {
//       if (err) reject('error');
//       else resolve(Boolean(result.map((it) => it[0]).find((it) => it === value)));
//     });
//   });
// }

function dnsLookup() {
  return dnsPromises.resolveTxt('mememe.digimon.one').then(console.log)
    .catch(console.error);
}

dnsLookup();


const task = () => dnsLookup('82caab88-08bf-46af-a9ad-33d0d01d5be8.digimon.one', '90007b45-ddcc-4401-b6d0-87e4385c35e4');
// .then(res => console.log(res))
// .catch(err => console.error('task1', err));

// const result = Promise.race([ task(), new Promise((resolve) => setTimeout(() => {resolve('timeout');}, 3000)) ]).then(console.log)
//   .catch(err => console.log('race', err));

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3000, 'one');
// });

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(reject, 100, 'two');
// });

// Promise.race([ promise1, promise2 ]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// })
//   .catch(err => console.log(err));

