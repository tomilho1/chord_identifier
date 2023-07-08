let circleOfFifths = [
    "Fbb", "Cbb", "Gbb", "Dbb", "Abb", "Ebb", "Bbb",
    "Fb", "Cb", "Gb", "Db", "Ab", "Eb", "Bb",
    "F", "C", "G", "D", "A", "E", "B",
    "F#", "C#", "G#", "D#", "A#", "E#", "B#",
    "F##", "C##", "G##", "D##", "A##", "E##", "B##"]


class Chord {
    constructor(notes) {
        notes = notes.replaceAll(" ","").split(",");
        
        this.bass = notes[0]

        this.looseNotes = []
        circleOfFifths.forEach((note, inc) => {
            if (notes.includes(circleOfFifths[inc]))
                this.looseNotes.push(inc)
        })

        this.orderedNotes = []
        this.stringNotes = []
        notes.forEach((note, index) => {
            if (circleOfFifths.includes(note)) {
                if (this.stringNotes.includes(note)) { }
                else {
                    this.orderedNotes.push(circleOfFifths.indexOf(note))
                    this.stringNotes.push(note)
                }
            }
            else { }
        });

        this.looseIntervals = []
        this.looseNotes.forEach((note, inc) => {
            this.looseIntervals.push(this.looseNotes[inc + 1] - this.looseNotes[0])
        })
        this.looseIntervals.pop()

        this.orderedIntervals = []
        this.orderedNotes.forEach((note, inc) => {
            this.orderedIntervals.push(this.orderedNotes[inc + 1] - this.orderedNotes[inc])
        })
        this.orderedIntervals.pop()

        // Chord.tonicIndex corresponds to which note of Chord.looseNotes is the tonic
        for (let i = 0; i < notes.length; i++) {
            if (this.bass === circleOfFifths[this.looseNotes[i]]) {
                this.tonicIndex = i
                break
            }
        }
    }

    getGraphics() {
        const circle =
`---------------------------
Fbb Cbb Gbb Dbb Abb Ebb Bbb
Fb  Cb  Gb  Db  Ab  Eb  Bb 
F   C   G   D   A   E   B  
F#  C#  G#  D#  A#  E#  B# 
F## C## G## D## A## E## B##
---------------------------`

        let graph = circle

        for (let i = 0; i < this.stringNotes.length; i++) {
            let chordNotes = this.stringNotes[i].concat("  ").slice(0, 3)
            graph = graph.replace(chordNotes, "\x1b[48;5;236m" + chordNotes + "\x1b[40m")
        }

        let rootNote = this.bass.concat("  ").slice(0, 3) // "T "
        graph = graph.replace(rootNote, "\x1b[48;5;241m" + rootNote + "\x1b[40m")

        return graph
    }
};

let a = new Chord("C, E, G")

console.log(a.getGraphics())
console.log(a)