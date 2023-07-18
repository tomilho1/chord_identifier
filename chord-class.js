const fs = require('fs');
const path = require('path')

let chordLibrary = fs.readFileSync(path.join(__dirname, './lib/chord-library.json'));
chordLibrary = JSON.parse(chordLibrary);
let intervalLibrary = fs.readFileSync(path.join(__dirname, './lib/interval-library.json'));
intervalLibrary = JSON.parse(intervalLibrary);
intervalLibrary = new Map(Object.entries(intervalLibrary));

const circleOfFifths = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]

function arrayCompare(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

class Chord {
    constructor(notes) {
        const parsedNotes = notes.replaceAll(","," ").split(" ");
        this.bass = parsedNotes[0]

        this.orderedNotes = []
        this.stringNotes = []
        
        parsedNotes.forEach((note, index) => {
            if (circleOfFifths.includes(note) && !this.stringNotes.includes(note)) {
              this.orderedNotes.push(circleOfFifths.indexOf(note));
              this.stringNotes.push(note);
            }
        });

        this.orderedIntervals = this.orderedNotes.map((note, inc) => {
            return this.orderedNotes[inc + 1] - this.orderedNotes[0]
        })
        this.orderedIntervals.pop();

        this.looseNotes = []
        circleOfFifths.forEach((note, inc) => {
            if (parsedNotes.includes(circleOfFifths[inc]))
                this.looseNotes.push(inc)
        })

        this.looseIntervals = this.looseNotes.map((note, inc) => {
            return this.looseNotes[inc + 1] - this.looseNotes[0]
        })
        this.looseIntervals.pop();

        for (let i = 0; i < chordLibrary.length; i++) {
            let currentChord
            if (arrayCompare(this.looseIntervals, chordLibrary[i].looseIntervals)) {
                currentChord = chordLibrary[i]
                this.tonic = circleOfFifths[this.looseNotes[currentChord.tonicIndex]];
                if (this.tonic === this.bass) {
                    this.symbol = `${this.bass}${currentChord.symbol}`
                } else {
                    this.symbol = `${this.tonic}${currentChord.symbol}/${this.bass}`
                }
                this.name = `${this.tonic} ${currentChord.formalName}`
                break
            }
        }
    };

    getInversion(inversionIndex) {
        let invertedChord = {...this}

        if ((typeof inversionIndex) === 'string') {
            inversionIndex = invertedChord.stringNotes.indexOf(inversionIndex)
        }
        if (inversionIndex < 0) {
            return invertedChord
        }

        inversionIndex = inversionIndex % invertedChord.orderedNotes.length

        function rearrange (array, invIdx) {
            let size = array.length
            array = array.concat(array);
            return array.splice(invIdx, size);
        }
        invertedChord.orderedNotes = rearrange(invertedChord.orderedNotes, inversionIndex)
        invertedChord.stringNotes = rearrange(invertedChord.stringNotes, inversionIndex)

        invertedChord.orderedIntervals = invertedChord.orderedNotes.map((note, inc) => {
            return invertedChord.orderedNotes[inc + 1] - invertedChord.orderedNotes[0]
        })
        invertedChord.orderedIntervals.pop()

        invertedChord.bass = circleOfFifths[invertedChord.orderedNotes[0]]

        if (invertedChord.symbol === undefined) {
            return invertedChord
        }

        if (invertedChord.tonic == invertedChord.bass) {
            invertedChord.symbol = invertedChord.symbol.split("/")[0]
        } else {
            invertedChord.symbol = invertedChord.symbol.split("/")[0] + "/" + invertedChord.bass
        }
        return invertedChord
    }

    getGraphics() {
        let graph =
`---------------------------
Fbb Cbb Gbb Dbb Abb Ebb Bbb
Fb  Cb  Gb  Db  Ab  Eb  Bb 
F   C   G   D   A   E   B  
F#  C#  G#  D#  A#  E#  B# 
F## C## G## D## A## E## B##
---------------------------`

        for (let i = 0; i < this.stringNotes.length; i++) {
            let chordNotes = this.stringNotes[i].concat("  ").slice(0, 3)
            graph = graph.replace(chordNotes, "\x1b[48;5;236m" + chordNotes + "\x1b[40m")
        }

        let rootNote = this.bass.concat("  ").slice(0, 3) // "T "
        graph = graph.replace(rootNote, "\x1b[48;5;241m" + rootNote + "\x1b[40m")

        return graph
    }
};

module.exports = {
    Chord,
    chordLibrary,
    intervalLibrary
}