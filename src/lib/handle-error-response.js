import {anyPass, ifElse} from 'ramda'

export const createHandleErrorResponse = response => error => {
    ifElse(
        ({name, code}) => anyPass([() => name === 'ValidationError', () => code && code === 11000]),
        error => response.status(400).json(error),
        error => response.status(500).json(error)
    )(error)
}