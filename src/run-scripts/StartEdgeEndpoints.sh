
# %cruft : finish code and revive


pm2 start node ./src/run-scripts/StartWriter.js
pm2 start node ./src/run-scripts/StartReader.js
pm2 start node ./src/run-scripts/StartManager.js
#pm2 start node src/run-scripts/StartWatcher.js

echo ""
echo ""
echo "How to use:"
echo ""

echo "    Add a patient at POST http://localhost:31001/add-patient."
echo "        A patient POST body consists of { firstName, lastName, patientId }."

echo ""

echo "    Add readings at POST http://localhost:31003/add-reading."
echo "        A reading POST body consists of { patientId, timestamp, systolic, diastolic }."

echo ""

echo "    Request past readings at GET http://localhost:31005/get-readings/id/from/to."

echo ""

echo "    Request current readings at GET http://localhost:31007/get-current/id."

echo ""

echo "    Remove a patient at DELETE http://localhost:31001/remove-patient/id."

echo ""
echo ""
