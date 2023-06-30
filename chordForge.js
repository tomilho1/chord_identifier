let fifth_circle = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]

//

console.clear()

const readlineSync = require('readline-sync')
let chord = {}

//

let userNotes = readlineSync.question("Notes in root position: ").replaceAll(",", " ").split(" ")
chord.root = userNotes[0]

// chord.looseNotes are the notes in the order in which they show
// in the circle of fifths. This information which will later let
// the program easily identify chords no matter the order the user
// types the notes.

// chord.orderedNotes are the notes of the chord ordered in its root,
// closed position.

{
    chord.looseNotes = []
    fifth_circle.forEach((note, inc) => {
        if (userNotes.includes(fifth_circle[inc]))
            chord.looseNotes.push(inc)
    })

    chord.orderedNotes = []
    chord.stringNotes = []
    userNotes.forEach((note, index) => {
        if (fifth_circle.includes(note)) {
            if (chord.stringNotes.includes(note)) { }   // Skips if it already has this note...
            else {
                chord.orderedNotes.push(fifth_circle.indexOf(note))
                chord.stringNotes.push(note)
            }
        }
        else { }
    });
}

// This block calculates the intervals for each type of note order.
{
    chord.intervals = []
    chord.looseNotes.forEach((note, inc) => {
        chord.intervals.push(chord.looseNotes[inc + 1] - chord.looseNotes[0])
    })
    chord.intervals.pop()
    // pop() ensures chord.intervals's
    // length is always the same as
    // chord.looseNotes - 1.

    chord.orderedIntervals = []
    chord.orderedNotes.forEach((note, inc) => {
        chord.orderedIntervals.push(chord.orderedNotes[inc + 1] - chord.orderedNotes[inc])
    })
    chord.orderedIntervals.pop()
}

// chord.tonicIndex corresponds to which note of chord.looseNotes is the tonic
for (i = 0; i < userNotes.length; i++) {
    if (chord.root === fifth_circle[chord.looseNotes[i]]) {
        chord.tonicIndex = i
        break
    }
}

let circle =
`---------------------------
Fbb Cbb Gbb Dbb Abb Ebb Bbb
Fb  Cb  Gb  Db  Ab  Eb  Bb 
F   C   G   D   A   E   B  
F#  C#  G#  D#  A#  E#  B# 
F## C## G## D## A## E## B##
---------------------------`

// modcircl is the circle of fifths string but with
// the notes of the input chord and its root highlighted.
let modcircl = circle

for (i = 0; i < userNotes.length; i++) {
    let chordNotes = userNotes[i].concat("  ").slice(0, 3)

    modcircl = modcircl.replace(chordNotes, "\x1b[48;5;236m" + chordNotes + "\x1b[40m")
}

{
    let rootNote = chord.root.concat("  ").slice(0, 3) // "T "
    modcircl = modcircl.replace(rootNote, "\x1b[48;5;241m" + rootNote + "\x1b[40m")
}

console.clear()
console.log(modcircl + "\x1b[0m")
console.log("\n", chord)

// if (readlineSync.keyInYN(`
// Is this correct?`)) {
//     chord.symbol = readlineSync.question("Music notation: ")
//     chord.formalName = readlineSync.question("Formal name: ")
// } else {
//     console.log("Chord was canceled.")
//     setTimeout(() => {
//         console.clear()
//     }, "1000");
// }