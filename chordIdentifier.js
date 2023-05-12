// Get intervals of an array


//
function lengthCompare(array_x, array_y) {
    if (array_x.length === array_y.length) {
        return true }
    else {return false}
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

////////////////////////////////////////////////////////////////////////////

let fifth_circle = ["Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",      // 0 - 6
                    "F",  "C",  "G",  "D",  "A",  "E",  "B",       // 7 - 13
                    "F#", "C#", "G#", "D#", "A#", "E#", "B#"]      // 14 - 20

let chordLibrary = [[1,4],[3,4],[3,6],[4,8]]

////////////////////////////////////////////////////////////////////////////

let chord = {}
chord.stringnotes = ["C","E","G#"]

chord.notes = function getnotes () {
  let array_b = []
  for (step = 0; step < 20; step++) {
    if (chord.stringnotes.includes(fifth_circle[step]))
    array_b.push(step)
    else {}
  }
  return array_b
}

chord.intervals = function getIntervals() {
    array_b = []
    for (let step = 0; step < chord.notes().length - 1; step++) {
        array_b.push(chord.notes()[step + 1] - chord.notes()[0])
    }
    return array_b
}

chord.index = function librarySearch() {
  let index
  for (i = 0, end = false; i < chordLibrary.length; i++) {
    if (arrayCompare(chord.intervals(), chordLibrary[i]) && (end !== true)) {
      index = i
      end = true
    }
    else { index = null }
} return index
}
  


console.log(chord.notes())
console.log(chord.intervals())
console.log(chord.index())


