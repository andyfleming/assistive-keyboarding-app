const synth = window.speechSynthesis
const allVoices = synth.getVoices()
const maleVoice = allVoices.filter(v => v.name === 'Alex')[0]
const femaleVoice = allVoices.filter(v => v.name === 'Samantha')[0]

const dingAudio = new Audio('correct.mp3');

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
    '|': 'veritcal bar',
    ':': 'colon',
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

function getDisplayValue(e) {
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

function displayKey(e) {
    const displayEl = document.getElementById('key')
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

/**
 * 
 * @param {KeyboardEvent} e 
 */
function getVerablDescription(e) {
    if (e.key === 'Meta') {
        return 'Command'
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

function announceKey(e) {
    const text = getVerablDescription(e)
    const utterance = new SpeechSynthesisUtterance(text)
    //utterance.pitch = pitch.value; // 0-2 (by 0.1)
    //utterance.rate = rate.value; // 0.5-2 (by 0.1)
    
    synth.speak(utterance)
}

function logKeyboardEvent(e) {
    console.log('---')
    console.log(e)
    console.log(`Key: ${e.key}     | Code: ${e.code}     | KeyCode: ${e.keyCode}`)
}

function playDing() {
    dingAudio.play()
}

function runKeyboardExplorer() {
    window.addEventListener('keydown', e => e.preventDefault())
    window.addEventListener('keydown', logKeyboardEvent)
    window.addEventListener('keydown', displayKey)
    window.addEventListener('keydown', announceKey)    
}

function runKeyQuizzer() {

}
