export default (id = -1, action) => {
    switch (action.type) {
        case 'GET_ID':
            return action.payload
        default:
            return id   
    }
}