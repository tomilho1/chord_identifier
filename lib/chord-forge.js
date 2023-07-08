console.clear()
const readlineSync = require('readline-sync');
const fs = require('fs');
const Chord = require('../chord-class');

let chordLibrary = fs.readFileSync('chord-library.json');
chordLibrary = JSON.parse(chordLibrary);

while (true) {
    console.clear();
    let userNotes = readlineSync.question("Notes in root position: ");
    userChord = new Chord (userNotes, {dev: true});

    for (let i = 0; i < userChord.orderedNotes.length; i++) {
        if (userChord.bass === [
            "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
            "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
            "F", "C", "G", "D", "A", "E", "B",
            "F#", "C#", "G#", "D#", "A#", "E#", "B#",
            "F##", "C##", "G##", "D##", "A##", "E##", "B##"][userChord.looseNotes[i]]) {
            userChord.tonicIndex = i
            break
        }
    }

    console.log(userChord.getGraphics() + "\n");
    console.log(userChord);

    if (readlineSync.keyInYN('\nProceed with this?')) {
        let newChord = {
            formalName: readlineSync.question('formal name: '),
            symbol: readlineSync.question('symbol: '),
            looseIntervals: userChord.looseIntervals,
            orderedIntervals: userChord.orderedIntervals,
            tonicIndex: userChord.tonicIndex
        };

        chordLibrary.push(newChord);
        console.log(`${newChord.formalName} chord was added to the library!`);
    };

    if (readlineSync.keyInYN('\nName another chord?')) {
    } else {
        chordLibrary = JSON.stringify(chordLibrary, null, 2);
        fs.writeFileSync('chord-library.json', chordLibrary)
        break
    }
}