const circleOfFifths = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]


class Chord {
    constructor(notes, options) {
        notes = notes.split(" ");
        this.bass = notes[0]

        let orderedNotes = []
        this.stringNotes = []
        notes.forEach((note, index) => {
            if (circleOfFifths.includes(note)) {
                if (this.stringNotes.includes(note)) { }
                else {
                    orderedNotes.push(circleOfFifths.indexOf(note))
                    this.stringNotes.push(note)
                }
            }
            else { }
        });

        let orderedIntervals = []
        orderedNotes.forEach((note, inc) => {
            orderedIntervals.push(orderedNotes[inc + 1] - orderedNotes[0])
        })
        orderedIntervals.pop()

        let looseNotes = []
        circleOfFifths.forEach((note, inc) => {
            if (notes.includes(circleOfFifths[inc]))
                looseNotes.push(inc)
        })

        let looseIntervals = []
        looseNotes.forEach((note, inc) => {
            looseIntervals.push(looseNotes[inc + 1] - looseNotes[0])
        })
        looseIntervals.pop()

        if (options.dev) {
            this.orderedNotes = orderedNotes;
            this.looseNotes = looseNotes;
            this.looseIntervals = looseIntervals;
            this.orderedIntervals = orderedIntervals;
        }
    };

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

module.exports = Chord;