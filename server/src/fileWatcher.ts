import chokidar from "chokidar";

chokidar.watch('./docs').on('all', (event, path) => {
  console.log(`Detected ${event} in ${path}`);
});

// const watcher = watch(
//   './docs',
//   { recursive: true },
//   (event, filename) => {
//     console.log(`Detected ${event} in ${filename}`);
//     // created or delete --> rebuild navigation (after delay, so we can wait till all events are finished)
//   },
// )

// process.on("SIGINT", () => {
//   // close watcher when Ctrl-C is pressed
//   console.log("Closing watcher...");
//   watcher.close();

//   process.exit(0);
// });