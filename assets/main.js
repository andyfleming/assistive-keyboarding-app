const synth = window.speechSynthesis
let allVoices = []

const displayEl = document.getElementById('key')

const dingAudio = new Audio('assets/correct.mp3');

const uppercaseKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const lowercaseKeys = 'abcdefghijklmnopqrstuvwxyz'.split('')
const digits = '0123456789'.split('')
const nonDigitSymbolKeys = '`-=\;,./\''.split('')
const nonDigitShiftSymbolKeys = '~_+{}|:"<>?'
const specialPronunciations = {
    '~': 'tilde',
    '_': 'underscore',
    '+': 'plus',
    '[': 'left square bracket',
    ']': 'right square bracket',
    '{': 'left french bracket',
    '}': 'right french bracket',
    '|': 'vertical bar',
    ':': 'colon',
    "'": 'apostrophe',
    '"': 'double quote',
    '<': 'less than',
    '>': 'greater than',
    '?': 'question mark',
    '!': 'Exclamation point',
    '@': 'At symbol',
    '#': 'pound',
    '$': 'dollar sign',
    '%': 'percent',
    '^': 'caret',
    '&': 'ampersand',
    '*': 'asterisk',
    '(': 'left parenthesis',
    ')': 'right parenthesis',
}

const keysToRequest = [{"altKey":false,"code":"KeyA","ctrlKey":false,"key":"a","keyCode":65,"shiftKey":false,"which":65},{"altKey":false,"code":"KeyB","ctrlKey":false,"key":"b","keyCode":66,"shiftKey":false,"which":66},{"altKey":false,"code":"KeyC","ctrlKey":false,"key":"c","keyCode":67,"shiftKey":false,"which":67},{"altKey":false,"code":"KeyD","ctrlKey":false,"key":"d","keyCode":68,"shiftKey":false,"which":68},{"altKey":false,"code":"KeyE","ctrlKey":false,"key":"e","keyCode":69,"shiftKey":false,"which":69},{"altKey":false,"code":"KeyF","ctrlKey":false,"key":"f","keyCode":70,"shiftKey":false,"which":70},{"altKey":false,"code":"KeyG","ctrlKey":false,"key":"g","keyCode":71,"shiftKey":false,"which":71},{"altKey":false,"code":"KeyH","ctrlKey":false,"key":"h","keyCode":72,"shiftKey":false,"which":72},{"altKey":false,"code":"KeyI","ctrlKey":false,"key":"i","keyCode":73,"shiftKey":false,"which":73},{"altKey":false,"code":"KeyJ","ctrlKey":false,"key":"j","keyCode":74,"shiftKey":false,"which":74},{"altKey":false,"code":"KeyK","ctrlKey":false,"key":"k","keyCode":75,"shiftKey":false,"which":75},{"altKey":false,"code":"KeyL","ctrlKey":false,"key":"l","keyCode":76,"shiftKey":false,"which":76},{"altKey":false,"code":"KeyM","ctrlKey":false,"key":"m","keyCode":77,"shiftKey":false,"which":77},{"altKey":false,"code":"KeyN","ctrlKey":false,"key":"n","keyCode":78,"shiftKey":false,"which":78},{"altKey":false,"code":"KeyO","ctrlKey":false,"key":"o","keyCode":79,"shiftKey":false,"which":79},{"altKey":false,"code":"KeyP","ctrlKey":false,"key":"p","keyCode":80,"shiftKey":false,"which":80},{"altKey":false,"code":"KeyQ","ctrlKey":false,"key":"q","keyCode":81,"shiftKey":false,"which":81},{"altKey":false,"code":"KeyR","ctrlKey":false,"key":"r","keyCode":82,"shiftKey":false,"which":82},{"altKey":false,"code":"KeyS","ctrlKey":false,"key":"s","keyCode":83,"shiftKey":false,"which":83},{"altKey":false,"code":"KeyT","ctrlKey":false,"key":"t","keyCode":84,"shiftKey":false,"which":84},{"altKey":false,"code":"KeyU","ctrlKey":false,"key":"u","keyCode":85,"shiftKey":false,"which":85},{"altKey":false,"code":"KeyV","ctrlKey":false,"key":"v","keyCode":86,"shiftKey":false,"which":86},{"altKey":false,"code":"KeyW","ctrlKey":false,"key":"w","keyCode":87,"shiftKey":false,"which":87},{"altKey":false,"code":"KeyX","ctrlKey":false,"key":"x","keyCode":88,"shiftKey":false,"which":88},{"altKey":false,"code":"KeyY","ctrlKey":false,"key":"y","keyCode":89,"shiftKey":false,"which":89},{"altKey":false,"code":"KeyZ","ctrlKey":false,"key":"z","keyCode":90,"shiftKey":false,"which":90},{"altKey":false,"code":"Backquote","ctrlKey":false,"key":"`","keyCode":192,"shiftKey":false,"which":192},{"altKey":false,"code":"Digit1","ctrlKey":false,"key":"1","keyCode":49,"shiftKey":false,"which":49},{"altKey":false,"code":"Digit2","ctrlKey":false,"key":"2","keyCode":50,"shiftKey":false,"which":50},{"altKey":false,"code":"Digit3","ctrlKey":false,"key":"3","keyCode":51,"shiftKey":false,"which":51},{"altKey":false,"code":"Digit4","ctrlKey":false,"key":"4","keyCode":52,"shiftKey":false,"which":52},{"altKey":false,"code":"Digit5","ctrlKey":false,"key":"5","keyCode":53,"shiftKey":false,"which":53},{"altKey":false,"code":"Digit6","ctrlKey":false,"key":"6","keyCode":54,"shiftKey":false,"which":54},{"altKey":false,"code":"Digit7","ctrlKey":false,"key":"7","keyCode":55,"shiftKey":false,"which":55},{"altKey":false,"code":"Digit8","ctrlKey":false,"key":"8","keyCode":56,"shiftKey":false,"which":56},{"altKey":false,"code":"Digit9","ctrlKey":false,"key":"9","keyCode":57,"shiftKey":false,"which":57},{"altKey":false,"code":"Digit0","ctrlKey":false,"key":"0","keyCode":48,"shiftKey":false,"which":48},{"altKey":false,"code":"Minus","ctrlKey":false,"key":"-","keyCode":189,"shiftKey":false,"which":189},{"altKey":false,"code":"Equal","ctrlKey":false,"key":"=","keyCode":187,"shiftKey":false,"which":187},{"altKey":false,"code":"BracketLeft","ctrlKey":false,"key":"[","keyCode":219,"shiftKey":false,"which":219},{"altKey":false,"code":"BracketRight","ctrlKey":false,"key":"]","keyCode":221,"shiftKey":false,"which":221},{"altKey":false,"code":"Backslash","ctrlKey":false,"key":"\\","keyCode":220,"shiftKey":false,"which":220},{"altKey":false,"code":"Semicolon","ctrlKey":false,"key":";","keyCode":186,"shiftKey":false,"which":186},{"altKey":false,"code":"Quote","ctrlKey":false,"key":"'","keyCode":222,"shiftKey":false,"which":222},{"altKey":false,"code":"Comma","ctrlKey":false,"key":",","keyCode":188,"shiftKey":false,"which":188},{"altKey":false,"code":"Period","ctrlKey":false,"key":".","keyCode":190,"shiftKey":false,"which":190},{"altKey":false,"code":"Slash","ctrlKey":false,"key":"/","keyCode":191,"shiftKey":false,"which":191},{"altKey":false,"code":"ControlLeft","ctrlKey":true,"key":"Control","keyCode":17,"shiftKey":false,"which":17},{"altKey":true,"code":"AltLeft","ctrlKey":false,"key":"Alt","keyCode":18,"shiftKey":false,"which":18},{"altKey":false,"code":"MetaLeft","ctrlKey":false,"key":"Meta","keyCode":91,"shiftKey":false,"which":91},/*{"altKey":false,"code":"ShiftLeft","ctrlKey":false,"key":"Shift","keyCode":16,"shiftKey":true,"which":16},*/{"altKey":false,"code":"ArrowLeft","ctrlKey":false,"key":"ArrowLeft","keyCode":37,"shiftKey":false,"which":37},{"altKey":false,"code":"ArrowUp","ctrlKey":false,"key":"ArrowUp","keyCode":38,"shiftKey":false,"which":38},{"altKey":false,"code":"ArrowDown","ctrlKey":false,"key":"ArrowDown","keyCode":40,"shiftKey":false,"which":40},{"altKey":false,"code":"ArrowRight","ctrlKey":false,"key":"ArrowRight","keyCode":39,"shiftKey":false,"which":39},{"altKey":false,"code":"Backquote","ctrlKey":false,"key":"~","keyCode":192,"shiftKey":true,"which":192},{"altKey":false,"code":"Digit1","ctrlKey":false,"key":"!","keyCode":49,"shiftKey":true,"which":49},{"altKey":false,"code":"Digit2","ctrlKey":false,"key":"@","keyCode":50,"shiftKey":true,"which":50},{"altKey":false,"code":"Digit3","ctrlKey":false,"key":"#","keyCode":51,"shiftKey":true,"which":51},{"altKey":false,"code":"Digit4","ctrlKey":false,"key":"$","keyCode":52,"shiftKey":true,"which":52},{"altKey":false,"code":"Digit5","ctrlKey":false,"key":"%","keyCode":53,"shiftKey":true,"which":53},{"altKey":false,"code":"Digit6","ctrlKey":false,"key":"^","keyCode":54,"shiftKey":true,"which":54},{"altKey":false,"code":"Digit7","ctrlKey":false,"key":"&","keyCode":55,"shiftKey":true,"which":55},{"altKey":false,"code":"Digit8","ctrlKey":false,"key":"*","keyCode":56,"shiftKey":true,"which":56},{"altKey":false,"code":"Digit9","ctrlKey":false,"key":"(","keyCode":57,"shiftKey":true,"which":57},{"altKey":false,"code":"Digit0","ctrlKey":false,"key":")","keyCode":48,"shiftKey":true,"which":48},{"altKey":false,"code":"Minus","ctrlKey":false,"key":"_","keyCode":189,"shiftKey":true,"which":189},{"altKey":false,"code":"Equal","ctrlKey":false,"key":"+","keyCode":187,"shiftKey":true,"which":187},{"altKey":false,"code":"BracketLeft","ctrlKey":false,"key":"{","keyCode":219,"shiftKey":true,"which":219},{"altKey":false,"code":"BracketRight","ctrlKey":false,"key":"}","keyCode":221,"shiftKey":true,"which":221},{"altKey":false,"code":"Backslash","ctrlKey":false,"key":"|","keyCode":220,"shiftKey":true,"which":220},{"altKey":false,"code":"Semicolon","ctrlKey":false,"key":":","keyCode":186,"shiftKey":true,"which":186},{"altKey":false,"code":"Quote","ctrlKey":false,"key":"\"","keyCode":222,"shiftKey":true,"which":222},{"altKey":false,"code":"Comma","ctrlKey":false,"key":"<","keyCode":188,"shiftKey":true,"which":188},{"altKey":false,"code":"Period","ctrlKey":false,"key":">","keyCode":190,"shiftKey":true,"which":190},{"altKey":false,"code":"Slash","ctrlKey":false,"key":"?","keyCode":191,"shiftKey":true,"which":191}]

function getDisplayValue(e) {

    // Ignore characters that we may not be able to display correctly
    if (e.altKey && e.key !== 'Alt') {
        return ''
    }
    
    if (e.key === 'Meta') {
        return 'Cmd'
    }

    if (e.key === 'Control') {
        return 'Ctrl'
    }

    return e.key
}

function displayKey(ignoreShift = false) {
    return e => {
        if (ignoreShift && e.key === 'Shift') {
            return
        }
        const displayValue = getDisplayValue(e)    
        displayEl.innerText = displayValue
        displayEl.classList.remove('s')
        displayEl.classList.remove('xs')
        if (displayValue.length > 4) {
            displayEl.classList.add('xs')
        } else if (displayValue.length > 2) {
            displayEl.classList.add('s')
        }
    }
}

/**
 * 
 * @param {KeyboardEvent} e 
 */
function getVerablDescription(e) {
    if (e.key === 'Meta') {
        return 'Command'
    }

    // Ignore characters that we may not be able to pronounced
    if (e.altKey && e.key !== 'Alt') {
        return ''
    }

    // if (digits.includes(e.key)
    //     || uppercaseKeys.includes(e.key)
    //     || lowercaseKeys.includes(e.key)
    //     || e.key === 'Control'
    //     || e.key === 'Shift'
    //     || e.key === 'Alt'
    // ) {
    //     return e.key
    // }

    if (uppercaseKeys.includes(e.key)) {
        return 'Capital ' + e.key
    }

    if (nonDigitSymbolKeys.includes(e.key)) {
        return e.code
    }

    if (e.key in specialPronunciations) {
        return specialPronunciations[e.key]
    }

    return e.key
}

function announceKey(ignoreShift = false, voice = 'male') {
    return e => {
        if (ignoreShift && e.key === 'Shift') {
            return
        }
        const nameOfVoiceToUse = (voice === 'male') ? 'Alex' : 'Samantha'
        const voiceToUse = allVoices.filter(v => v.name === nameOfVoiceToUse)[0]    
        const text = getVerablDescription(e)
        const utterance = new SpeechSynthesisUtterance(text)
        
        // Set the utterance parameters (aka style)
        utterance.voice = voiceToUse

        // Pitch is default 1 (and supports range 0 - 2.0)
        //utterance.pitch = pitch.value;
        
        // Rate is default 1 (and supports range 0.5 - 2.0)
        utterance.rate = (voice === 'male') ? 0.9 : 0.7;
    
        synth.speak(utterance)
    }
}

function logKeyboardEvent(e) {
    console.log('---')
    console.log(e)
    console.log(`Key: ${e.key}     | Code: ${e.code}     | KeyCode: ${e.keyCode}`)
}

function playDing() {
    if (dingAudio.paused) {
        dingAudio.play()
    } else {
        dingAudio.currentTime = 0
    }
}

function selectRandomKeyRequest() {
    const numOptions = keysToRequest.length
    const randomIndex = Math.floor(Math.random() * numOptions) - 1

    return keysToRequest[randomIndex]
}

function runKeyboardExplorer() {
    speechSynthesis.onvoiceschanged = function() {
        allVoices = synth.getVoices()
    }

    window.addEventListener('keydown', e => e.preventDefault())
    window.addEventListener('keydown', logKeyboardEvent)
    window.addEventListener('keydown', displayKey())
    window.addEventListener('keydown', announceKey())    
}

function runKeyQuizzer() {
    speechSynthesis.onvoiceschanged = function() {
        allVoices = synth.getVoices()
    }

    window.addEventListener('keydown', e => e.preventDefault())
    window.addEventListener('keydown', logKeyboardEvent)    
    window.addEventListener('keydown', announceKey(true))

    // TODO: set up game state
    let requestedKey

    function setAndAnnounceNewRequestedKey() {
        requestedKey = selectRandomKeyRequest()
        announceKey(false, 'female')(requestedKey)
        displayKey(true)(requestedKey)
    }

    // set up key listener to process again game state
    window.addEventListener('keydown', function handleKeyPressForQuiz(e) {

        // If they got it correct...
        if (e.key === requestedKey.key) {

            // Change the display to green temporarily
            document.body.classList.add('correct')

            // Play the ding to indicate the asnwer was correct
            // (but wait 400 ms to ensure the key announcement is done)
            setTimeout(() => {
                playDing()
            }, 600)

            setTimeout(() => {

                // remove the green correct state
                document.body.classList.remove('correct')

                // After another X ms, request a new key
                setTimeout(setAndAnnounceNewRequestedKey, 200)
            }, 1200)                
            
            // TODO: bonus: cancel the timer if a new key has been set correct

            return
        }

        // Otherwise, notify the user that the input was incorrect?
        // If they've missed the key 5 times, reannounce?
    })

    // "start" the game (after a second)
    setTimeout(() => {
        setAndAnnounceNewRequestedKey()        
    }, 1000)
    
}
