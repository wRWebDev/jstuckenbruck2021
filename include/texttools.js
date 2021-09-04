import reactStringReplace from 'react-string-replace'
import { nanoid } from 'nanoid'

const bolden = string =>
    reactStringReplace(string, /\*+(.*?)\*+/mg, (match, i) => (
        <strong key={i}>{match}</strong>
    ))
const emphasise = string =>
    reactStringReplace(string, /\_+(.*?)\_+/mg, (match, i) => (
        <em key={nanoid()}>{match}</em>
    ))

const formatText = string => {
    return bolden(emphasise(string))
}

export {
    bolden,
    emphasise,
    formatText
}

