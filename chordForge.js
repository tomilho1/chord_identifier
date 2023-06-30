let fifth_circle = ["Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]

//

console.clear()

const readlineSync = require('readline-sync')
let chord = {}

//

let userNotes = readlineSync.question("Notes in root position: ").replaceAll(","," ").split(" ")

chord.root = userNotes[0]

// The difference between chord.looseNotes and chord.orderedNotes is, of course, the order
// in which the notes are in.

// chord.looseNotes
{
let array_a = []
for (inc_a = 0; inc_a < 35; inc_a++) {
    if (userNotes.includes(fifth_circle[inc_a]))
        array_a.push(inc_a)
    else { }
}
chord.looseNotes = array_a

// chord.orderedNotes
let array_b = []
userNotes.forEach((note, index) => {
    if (fifth_circle.includes(note)) {
        if (array_b.includes(note)) {}   // Skips if it already has this note...
        else {
        array_b.push(note)
    }
    }
    else {}
});
chord.orderedNotes = array_b
}

// This block calculates the intervals for each type of note order.
{
let array_a = []
for (let inc_b = 0; inc_b < chord.looseNotes.length - 1; inc_b++) {
    array_a.push(chord.looseNotes[inc_b + 1] - chord.looseNotes[0])
}
chord.intervals = array_a

//

}

// chord.tonicIndex corresponds to which note of chord.notes is the tonic
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
// the notes of the chord and its root highlighted.
let modcircl = circle
for (i = 0; i < userNotes.length; i++) {
    let a = userNotes[i].concat("  ").slice(0, 3)

    modcircl = modcircl.replace(a,"\x1b[48;5;236m"+a+"\x1b[40m")
}

{
    let b = chord.root.concat("  ").slice(0, 3) // "T "
    modcircl = modcircl.replace(b,"\x1b[48;5;241m"+b+"\x1b[40m")
}

console.clear()
console.log(modcircl+"\x1b[0m")

console.log(`
Notes:       ${chord.orderedNotes}
Notes:       ${chord.looseNotes}
Tonic:       ${chord.root}
Tonic Index: ${chord.tonicIndex}
Intervals:   ${chord.intervals}`)

if (readlineSync.keyInYN(`
Is this correct?`)) {
    chord.symbol = readlineSync.question("Music notation: ")
    chord.formalName = readlineSync.question("Formal name: ")
} else {
    console.log("Chord was canceled.")
    setTimeout(() => {
        console.clear()
    }, "1000");
}