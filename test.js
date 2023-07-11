const {Chord} = require('./chord-class')

let a = new Chord("G Bb D")

const circleOfFifths = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]

a.orderedNotes = a.orderedNotes.map((value, index, array) => {
    if (index != 0) {
        return array[0] - (a.orderedIntervals[index - 1])
    }
    return value
})

a.stringNotes = a.stringNotes.map((value, index) => {
    return circleOfFifths[a.orderedNotes[index]]
})

a.stringNotes.unshift(a.stringNotes[a.stringNotes.length - 1])
a.stringNotes = a.stringNotes.toString()

let n = new Chord(a.stringNotes);

console.log(n.getGraphics())
console.log(n)