const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path')
let {Chord, intervalLibrary} = require('../chord-class');

while (true) {
    console.clear();
    let userNotes = readlineSync.question("Insert two notes: ");
    while (true) {
        userChord = new Chord(userNotes);
        if (userChord.orderedNotes.length !== 2) {
            userNotes = readlineSync.question("Please insert only two different valid notes! ")
        } else { break }
    }

    console.log(userChord.getGraphics());
    console.log("\n" + userChord.stringNotes);

    let newIntervalName = readlineSync.question('\nName it (or type "cancel"): ')
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
        fs.writeFileSync(path.join(__dirname,'../lib/interval-library.json'), intervalLibrary)
        break
    }
}