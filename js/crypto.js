const crypto = require('crypto');

function sha256(params) {
  const hmac = crypto.createHmac('sha256', params.secret);

  return hmac.update(params.data).digest(params.encoding ?? 'hex');
}

const token = sha256({ data: '123a', secret: 'haha' });
const token2 = sha256({ data: '123b', secret: 'haha' });

console.log(token);
console.log(token2);