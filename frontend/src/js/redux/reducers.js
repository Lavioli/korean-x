import actions from './actions';

function reducer (state, action) {
    state = state || {
            userAnswer: null, // --> action.answer
            questions: null // --> action.questions
        };

    if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
        return Object.assign({}, state, {
            userAnswer: null,
            questions: action.questions
        });
    } else if (action.type === actions.FETCH_QUESTIONS_ERROR) {
        return state;
    } else if (action.type === actions.SUBMIT_ANSWER) {
        return Object.assign({}, state, {
            userAnswer: action.answer
        });
    }
    return state;
}

export default reducer;