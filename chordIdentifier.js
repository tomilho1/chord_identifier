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

let chordLibrary =
[[1,4],[3,4],[3,6],[2,3,6],[1,4,5],[1,3,4],[4,8],[1],
 [1,2],[1,2,4],[3,4,5]]

let chordnames =
["","m","dim","7","maj7","min7","+","5",
 "sus4", "maj7(add9)","min7(add9)"]

tonicIndex =
[0, 1, 2, 1, 0, 2, 0, 0,
 1, 0, 1]

////////////////////////////////////////////////////////////////////////////

let chord = {}
chord.stringnotes = ["Eb","C","G","D"]

chord.bassnote = chord.stringnotes[0]

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
      return i
      break
    }
} return null
}

chord.tonic = fifth_circle[chord.notes()[tonicIndex[chord.index()]]]
  
////////////////////////////////////////////////////////////////////////////
// Logs

console.log(chord.intervals())
console.log(chord.notes())

if (chord.index() !== null) {
  if (chord.bassnote === chord.tonic) {
    console.log(chord.tonic + chordnames[chord.index()])
  }
  else {
    console.log(chord.tonic + chordnames[chord.index()]+"/"+chord.bassnote)
  }
} else {
  console.log("Não foi possível identificar acorde")
}


