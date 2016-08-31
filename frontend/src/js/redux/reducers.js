import actions from './actions';

function reducer (state, action) {
    state = state || {
            userAnswer: null
        };

    if (action.type === actions.SUBMIT_ANSWER) {
        return Object.assign({}, state, {
            userAnswer: action.answer
        });
    }
    return state;
}

export default reducer;