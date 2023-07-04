// Generates a chord through a string of notes separated by "," or " ".
// Invalid notes are discarded.

let fifth_circle = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]

/**
 * @param {string} notes Generate a chord object through a string of notes separated by commas ("C, E, G").
 * 
 */
function generateChord(notes) { //generates a chord
    notes = notes.replaceAll(",", " ").split(" ")
    let chord = {}

    chord.bass = notes[0]

    chord.looseNotes = []
    fifth_circle.forEach((note, inc) => {
        if (notes.includes(fifth_circle[inc]))
            chord.looseNotes.push(inc)
    })

    chord.orderedNotes = []
    chord.stringNotes = []
    notes.forEach((note, index) => {
        if (fifth_circle.includes(note)) {
            if (chord.stringNotes.includes(note)) { }   // Skips if it already has this note...
            else {
                chord.orderedNotes.push(fifth_circle.indexOf(note))
                chord.stringNotes.push(note)
            }
        }
        else { }
    });



    chord.looseIntervals = []
    chord.looseNotes.forEach((note, inc) => {
        chord.looseIntervals.push(chord.looseNotes[inc + 1] - chord.looseNotes[0])
    })
    chord.looseIntervals.pop()
    // pop() ensures chord.intervals's
    // length is always the same as
    // chord.looseNotes - 1.

    chord.orderedIntervals = []
    chord.orderedNotes.forEach((note, inc) => {
        chord.orderedIntervals.push(chord.orderedNotes[inc + 1] - chord.orderedNotes[inc])
    })
    chord.orderedIntervals.pop()


    // chord.tonicIndex corresponds to which note of chord.looseNotes is the tonic
    for (i = 0; i < notes.length; i++) {
        if (chord.bass === fifth_circle[chord.looseNotes[i]]) {
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

    // chord.graph is the string above but with
    // the notes of the input chord and its root highlighted.
    chord.graph = circle

    for (i = 0; i < chord.stringNotes.length; i++) {
        let chordNotes = chord.stringNotes[i].concat("  ").slice(0, 3)
        chord.graph = chord.graph.replace(chordNotes, "\x1b[48;5;236m" + chordNotes + "\x1b[40m")
    }

    let rootNote = chord.bass.concat("  ").slice(0, 3) // "T "
    chord.graph = chord.graph.replace(rootNote, "\x1b[48;5;241m" + rootNote + "\x1b[40m")

    return chord
}

module.exports = {
    generateChord
}