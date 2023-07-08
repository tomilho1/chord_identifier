// chordForge.js is the module used to registrate chords in
// the chord library.txt. Use it if you want to play around
// and add your own chords and stuff.

console.clear()
const readlineSync = require('readline-sync');
const fs = require('fs');
const musician = require('./chordTool');

let intervalLibrary = fs.readFileSync('interval-library.json');
intervalLibrary = JSON.parse(intervalLibrary);
intervalLibrary = new Map(Object.entries(intervalLibrary));

while (true) {
    console.clear();
    let userNotes = readlineSync.question("Notes in root position: ");
    userChord = musician.generateChord(userNotes);

    console.log(userChord.graph);
    console.log("\n" + userChord.stringNotes);

    let newIntervalName = readlineSync.question('\nname it: ')
    if (newIntervalName != 'cancel') {
        intervalLibrary.set(
            userChord.orderedIntervals,
            newIntervalName);
    
        console.log(`${newIntervalName} was added to the library!`)
    }

    if (readlineSync.keyInYN('\nName another interval?')) {
    } else {
        intervalLibrary = Object.fromEntries(intervalLibrary);
        intervalLibrary = JSON.stringify(intervalLibrary, null, 2);
        fs.writeFileSync('interval-library.json', intervalLibrary)
        break
    }
}