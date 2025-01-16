interface IAsyncFn {
  (index: number): Promise<any>
}

export async function bulkGetDataInChunk(total: number, chunk: number, asyncFn: IAsyncFn) {
  let i = 1;
  let chain = Promise.resolve();

  while (i <= total) {

    const pr = asyncFn(i);

    chain = chain.then(() => pr);

    if (i % chunk === 0) {
      await chain
        .then(() => output('complete chunk ' + i / chunk));
      chain = Promise.resolve();
    }

    i++;
  }
}

export function bulkGetDataOnce(total: number, asyncFn: IAsyncFn, jobName = 'job') {
  let i = 0;
  let chain = Promise.resolve();

  while (i <= total) {

    const pr = asyncFn(i);
    chain = chain.then(() => pr.catch(output));

    i++;
  }

  return chain
    .then(() => output(jobName + ' completed!'));
}

function output(arg) {
  const result = arg.toString();
  console.log('output:', result);
  return result;
}