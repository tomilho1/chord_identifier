// chordForge.js is the module used to registrate chords in
// the chord library.txt. Use it if you want to play around
// and add your own chords and stuff.

console.clear()
const readlineSync = require('readline-sync')
const fs = require('fs');

const musician = require('./chordTool')

// let libraryData = fs.readFileSync('chord-library.json');
// let chordLibrary = JSON.parse(libraryData);

let userNotes = readlineSync.question("Notes in root position: ")
userChord = musician.generateChord(userNotes)

console.log(userChord.graph)
console.log("\n"+userChord.stringNotes)

if (readlineSync.keyInYN("Proceed with this?")) {
    let chordData = {
        name: readlineSync.question("Name:"),
        symbol: readlineSync.question("Symbol:"),
        looseIntervals: userChord.looseIntervals,
        tonicIndex: userChord.tonicIndex,
    }
    
    chordData = JSON.stringify(chordData);
    fs.writeFileSync('chord-library.json', chordData);
}