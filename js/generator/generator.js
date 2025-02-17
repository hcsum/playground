const { chunk } = require('lodash');

function *s3FileList() {
  const files = new Array(100).fill()
    .map((_, i) => {
      return i;
    });

  if (files.length === 0) return;

  for (const chunked of chunk(files, 10)) {
    if (chunked.includes(30)) {
      yield chunked;
      return;
    }
    yield chunked;
  }

  yield* s3FileList();
}

const fileList = s3FileList();

for (let chunk of fileList) {
  console.log('chunk', chunk);
}

/**
output:
[
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]
[
  10, 11, 12, 13, 14,
  15, 16, 17, 18, 19
]
[
  20, 21, 22, 23, 24,
  25, 26, 27, 28, 29
]
 */

let isDone = false;
while (!isDone) {
  const list = fileList.next();
  console.log(list.value);
  isDone = list.done;
}

/**
output:
[
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]
[
  10, 11, 12, 13, 14,
  15, 16, 17, 18, 19
]
[
  20, 21, 22, 23, 24,
  25, 26, 27, 28, 29
]
[
  30, 31, 32, 33, 34,
  35, 36, 37, 38, 39
]
 */





