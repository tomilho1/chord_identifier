const {Chord} = require('./chord-class')
let a = new Chord("D F Ab")

for (let i = 0; i < a.stringNotes.length; i++) {
    if (i !== 0) {
        a.invert(1)
    }
    console.log(a.stringNotes);
    console.log(a.bass);
    console.log(a.symbol);
    console.log(a.orderedNotes);
    console.log(a.orderedIntervals);
    console.log("\n")
}