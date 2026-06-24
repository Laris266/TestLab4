
const pianoKeys = [ //objekt array elementid stimmt mit html überein
    {note: "C", key: "a", elementId: "keyC"},
    {note: "Csharp", key: "w", elementId: "keyCsharp"},
    {note: "D", key: "s", elementId: "keyD"},
    {note: "Dsharp", key: "e", elementId: "keyDsharp"},
    {note: "E", key: "d", elementId: "keyE"},
    {note: "F", key: "f", elementId: "keyF"},
    {note: "Fsharp", key: "t", elementId: "keyFsharp"},
    {note: "G", key: "g", elementId: "keyG"},
    {note: "Gsharp", key: "z", elementId: "keyGsharp"},
    {note: "A", key: "h", elementId: "keyA"},
    {note: "Asharp", key: "u", elementId: "keyAsharp"},
    {note: "B", key: "j", elementId: "keyB"},
    {note: "C2", key: "k", elementId: "keyC2"}
];

let notes = []; //json reinladne
let timeouts = []; //timeouts fürs stoppen

fetch('notes.json')
    .then(response => response.json()) //parsen von json in ein js obj
    .then(data => {
        notes = data; //speichert die daten von json in notes[]
        //playNotes();
    });

function playNotes(array) {
    let currentTime = 0;
    stopNotes(); //vorherige sequenz stop
    array.forEach(noteObj => { 
        const timeout = setTimeout(() => {
            playSound(noteObj.note, noteObj.length); //hier length weil sonst cluster
        }, currentTime);
        timeouts.push(timeout); //speichert timeout fürs stoppen wieder
        currentTime += noteObj.duration; //neuer zeitpunkt "berechnet" für nächsten ton
    });
}

function stopNotes() { 
    timeouts.forEach(timeout => clearTimeout(timeout)); // alle timeouts "löschen"
    timeouts = []; //noten wissen sozusagen nimma wann sie abgepsielt werden sollten
}

document.getElementById("stopButton").addEventListener("click", stopNotes); //stop button

document.querySelectorAll(".mode-btn").forEach(button => { //alle buttons der klasse holen
    button.addEventListener("click", function() { //eventlistener hinzfg
        const mode = this.getAttribute("data-mode"); //data mode auslesen zb dorisch loksrisch usw
        playNotes(notes[mode]);
        //playNotes();
    });
});

function playSound(note, length = 0)
{
    let audio = new Audio(`mysounds/${note}.mp3`); //audio obj
    audio.play();

    if(length) {
        setTimeout(() => {
            audio.pause(); //stoppt sund und setzt zurück
            audio.currentTime = 0;
        }, length);
    }
}

pianoKeys.forEach(key => {
    document.getElementById(key.elementId).addEventListener("click", function() { playSound(key.note); });
});

document.addEventListener("keydown", function(event) {
    if(event.repeat) return; //wenn man gedrückt hält wirds ned gespamt
    
    if(event.code === "Space") {
        event.preventDefault(); //damits nicht runterscrollt
        stopNotes();
        return;
    }

    const key = pianoKeys.find(k => k.key === event.key); //key mit taste abgleichen
    if(key) {
        playSound(key.note); //dementsprechend ton spielen
    }
});
    
