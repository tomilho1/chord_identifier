const {Chord} = require('./chord-class')
const circleOfFifths = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]

let a = new Chord("C E G")

let newBass = "D"
a.stringNotes.unshift(newBass)
a.bass = newBass

newBass = circleOfFifths.indexOf(newBass)
a.orderedNotes.unshift(newBass)

a.orderedIntervals.unshift(a.orderedNotes[1] - a.orderedNotes[0])

for (let i = 0, c = a.looseNotes.length; i < c; i++) {
    if (a.looseNotes[i] > newBass) {
        a.looseNotes.splice(i, 0, newBass)
        a.looseIntervals.splice(i - 1, 0, (a.looseNotes[i] - a.looseNotes[0]))
        break
    }
}

a.symbol = a.symbol.split("/")[0] + "/" + a.bass

a.name = a.name + " slash " + a.bass

a.slashChord = true

console.log(a)