// // Simulated function to fetch files from a "remote" source
// async function getFilesFromSource(page, limit) {
//   // Simulated data source
//   const allFiles = [
//     { Key: "file1.json" },
//     { Key: "file2.json" },
//     { Key: "file3.json" },
//     { Key: "file4.json" },
//     { Key: "file5.json" },
//     { Key: "file6.json" },
//     { Key: "file7.json" },
//     { Key: "file8.json" },
//     { Key: "file9.json" },
//     { Key: "file10.json" },
//   ];

//   // Simulate pagination
//   const start = page * limit;
//   const end = start + limit;
//   const files = allFiles.slice(start, end);

//   // Simulate delay
//   await new Promise((resolve) => setTimeout(resolve, 100));

//   return files;
// }

// // Asynchronous generator to yield chunks of files
// async function* fileListGenerator(limit) {
//   let page = 0;
//   while (true) {
//     const files = await getFilesFromSource(page, limit);
//     if (files.length === 0) break; // No more files to process
//     yield files;
//     page++;
//   }
// }

// // Function to process files using the generator
// async function processFiles() {
//   const limit = 3; // Number of files per chunk
//   const fileList = fileListGenerator(limit);

//   for await (const files of fileList) {
//     console.log("Processing chunk:", files);
//     // Simulate processing each file
//     for (const file of files) {
//       console.log("Processing file:", file.Key);
//     }
//   }
// }

// // Run the processFiles function
// processFiles().catch(console.error);

// Simulated function to fetch files from a "remote" source
async function getFilesFromSource(page, limit) {
  // Simulated data source
  const allFiles = [
    { Key: "file1.json", timestamp: 1 },
    { Key: "file2.json", timestamp: 2 },
    { Key: "file3.json", timestamp: 3 },
    { Key: "file4.json", timestamp: 4 },
    { Key: "file5.json", timestamp: 5 },
    { Key: "file6.json", timestamp: 6 },
    { Key: "file7.json", timestamp: 7 },
    { Key: "file8.json", timestamp: 8 },
    { Key: "file9.json", timestamp: 9 },
    { Key: "file10.json", timestamp: 10 },
    { Key: "file11.json", timestamp: 11 },
    { Key: "file12.json", timestamp: 12 },
    { Key: "file13.json", timestamp: 13 },
    { Key: "file14.json", timestamp: 14 },
    { Key: "file15.json", timestamp: 15 },
    { Key: "file16.json", timestamp: 16 },
    { Key: "file17.json", timestamp: 17 },
    { Key: "file18.json", timestamp: 18 },
    { Key: "file19.json", timestamp: 19 },
    { Key: "file20.json", timestamp: 20 },
  ];

  // Simulate pagination
  const start = page * limit;
  const end = start + limit;
  const files = allFiles.slice(start, end);

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return files;
}

// Asynchronous generator to yield chunks of files
async function* fileListGenerator(limit, chunkSize, jobStartTime) {
  let page = 0;
  while (true) {
    const files = await getFilesFromSource(page, limit);
    console.log("getFilesFromSource", files);
    if (files.length === 0) break; // No more files to process

    // Chunk and filter files
    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize);
      const filesToProcess = chunk.filter(
        (file) => file.timestamp < jobStartTime,
      );

      if (filesToProcess.length < chunk.length) {
        yield filesToProcess;
        return;
      }

      yield filesToProcess;
    }

    page++;
  }
}

// Function to process files using the generator
async function processFiles() {
  const limit = 5; // Number of files per page
  const chunkSize = 2; // Number of files per chunk
  const jobStartTime = 20; // Example job start time
  const fileList = fileListGenerator(limit, chunkSize, jobStartTime);

  for await (const files of fileList) {
    console.log("Processing chunk:", files);
    // Simulate processing each file
    for (const file of files) {
      console.log("Processing file:", file.Key);
    }
  }
}

// Run the processFiles function
processFiles().catch(console.error);
