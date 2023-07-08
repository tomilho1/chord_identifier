console.clear()
const readlineSync = require('readline-sync');
const fs = require('fs');
const Chord = require('../chord-class');

let intervalLibrary = fs.readFileSync('interval-library.json');
intervalLibrary = JSON.parse(intervalLibrary);
intervalLibrary = new Map(Object.entries(intervalLibrary));

while (true) {
    console.clear();
    let userNotes = readlineSync.question("Notes in root position: ");
    userChord = new Chord(userNotes, {dev: true});

    console.log(userChord.getGraphics());
    console.log("\n" + userChord.stringNotes);

    let newIntervalName = readlineSync.question('\nName it: ')
    if (newIntervalName != 'cancel') {
        intervalLibrary.set(
            userChord.orderedIntervals,
            newIntervalName);
    
        console.log(`${newIntervalName} was added to the interval library!`)
    }

    if (readlineSync.keyInYN('\nName another interval?')) {
    } else {
        intervalLibrary = Object.fromEntries(intervalLibrary);
        intervalLibrary = JSON.stringify(intervalLibrary, null, 2);
        fs.writeFileSync('interval-library.json', intervalLibrary)
        break
    }
}