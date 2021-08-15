const {anyPass, ifElse} = require('ramda')

exports.createHandleErrorResponse = response => error => {
    console.log(error)
    ifElse(
        ({name, code}) => anyPass([() => name === 'ValidationError', () => code && code === 11000]),
        error => response.status(400).json(error),
        error => response.status(500).json(error)
    )(error)
}