// Get intervals of an array
function getIntervals(array_a) {
    array_b = []
    for (let step = 0; step < array_a.length - 1; step++) {
        array_b.push(array_a[step + 1] - array_a[0])
    }
    return array_b
}

//
function lengthCompare(array_x, array_y) {
    if (array_x.length === array_y.length)
        return true

    else return false
}

//
function arrayCompare(array_x, array_y) {
    let bool
    let end
    if (lengthCompare(array_x, array_y) === true) {
        for (let step = 0, end = false; (step < array_x.length) && (end !== true) ; step++) {
            if (array_x[step] === array_y[step]) {
                bool = true
            }
            else {
                end = true
                bool = false
            }
        }
    }

    else { bool = false }
    return bool
}

// Transforms an array of strings (notes) in an array of indexes for fifth_circle
function getNoteValues (str) {
  let array_b = []
  for (step = 0; step < 20; step++) {
    if (str.includes(fifth_circle[step]))
    array_b.push(step)
    else {}
  }
  return array_b
}

////////////////////////////////////////////////////////////////////////////

let fifth_circle = ["Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",      // 0 - 6
                    "F",  "C",  "G",  "D",  "A",  "E",  "B",       // 7 - 13
                    "F#", "C#", "G#", "D#", "A#", "E#", "B#"]      // 14 - 20

let chordLibrary = [[1,4],[3,1],[3,6]]





noteChord = ["C", "Eb", "Gb"] //  7, 8, 11



console.log(getNoteValues(noteChord))
console.log(getIntervals(getNoteValues(noteChord)))










