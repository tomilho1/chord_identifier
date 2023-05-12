//
function arrayCompare(array_x, array_y) {
    let bool
    if (array_x.length === array_y.length) {
        for (let step = 0, end = false; (step < array_x.length); step++) {
            if (array_x[step] === array_y[step]) {
                bool = true
            }
            else {
                bool = false
                break
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
  for (i = 0; i < chordLibrary.length; i++) {
    if (arrayCompare(chord.intervals(), chordLibrary[i])) {
      break
    }
} return i
}
  


console.log(chord.notes())
console.log(chord.intervals())
console.log(chord.index())


