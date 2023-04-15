export const ignoreSearchSpace = store => next => action => {

    if (action.type === 'search/toggleSearch') {
        action.payload = action.payload.replaceAll(' ', '')
    }
    next(action)
}



export const ignoreAllCapitalSize = store => next => action => {
    if (action.type === 'search/toggleSearch') {
        action.payload = action.payload.toLowerCase()
    }

    next(action)
}
