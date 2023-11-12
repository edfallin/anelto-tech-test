
# %cruft : finish code and revive


pm2 start node ./src/run-scripts/StartWriter.js
pm2 start node ./src/run-scripts/StartReader.js
pm2 start node ./src/run-scripts/StartManager.js
#pm2 start node src/run-scripts/StartWatcher.js

## Path to ts-node here may need adjustment for run environment.
#pm2 start /usr/local/lib/node_modules/pm2/node_modules/.bin/ts-node ./src/index.ts
pm2 start nodemon --exec ts-node ./run-ts/index.ts


