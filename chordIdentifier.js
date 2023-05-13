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
 [1,2],[1,2,4],[3,4,5],[1,2,3],[1,4,6],[1,4,5,6],[2,3,6,8],[3,4,8],
 [1,3,4], [1,2]]

let chordnames =
["","m","dim","7","maj7","min7","+","5",
 "sus4", "maj7(add9)","min7(add9)","7sus4","lyd","lyd7","7lyd","m(maj7)",
 "6", "sus2"]

tonicIndex =
[0, 1, 2, 1, 0, 2, 0, 0,
 1, 0, 1, 2, 0, 0, 1, 1,
 0, 0]

////////////////////////////////////////////////////////////////////////////

let chord = {}
chord.stringnotes = ["Eb","A","C","F"]

function updateChordData () {

// chord.bass
chord.bass = chord.stringnotes[0]

// chord.notes
let array_a = []
for (inc_a = 0; inc_a < 20; inc_a++) {
  if (chord.stringnotes.includes(fifth_circle[inc_a]))
    array_a.push(inc_a)
  else {}
  }
chord.notes = array_a

// chord.intervals
let array_b = []
  for (let inc_b = 0; inc_b < chord.notes.length - 1; inc_b++) {
    array_b.push(chord.notes[inc_b + 1] - chord.notes[0])
  }
chord.intervals = array_b

// chord.index
let idx = []
for (inc_c = 0; inc_c < chordLibrary.length; inc_c++) {
  if (arrayCompare(chord.intervals, chordLibrary[inc_c])) {
    idx.push(inc_c)
  } else {}
}
chord.index = idx

// chord.tonic
let idx_b = []
for (inc_d = 0; inc_d < chord.index.length; inc_d++) {
  idx_b.push(fifth_circle[chord.notes[tonicIndex[chord.index[inc_d]]]])
}
chord.tonic = idx_b

// chord.name
let idx_c = []
for (inc_e = 0; inc_e < chord.index.length; inc_e++) {
  if (chord.bass === chord.tonic[inc_e]) {
  idx_c.push(`${chord.tonic[inc_e]}${chordnames[chord.index[inc_e]]}`)}
  else {
  idx_c.push(`${chord.tonic[inc_e]}${chordnames[chord.index[inc_e]]}/${chord.bass}`)
  }
}
chord.name = idx_c

}

////////////////////////////////////////////////////////////////////////////
// Logs

updateChordData()

for (inc = 0; inc < chord.name.length; inc++) {
console.log(chord.name[inc])
}

if (chord.index[0] === undefined){
  console.log("Não possível identificar este acorde")
}


