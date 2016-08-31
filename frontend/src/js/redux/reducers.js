import actions from './actions';

function reducer (state, action) {
    state = state || {
            userAnswer: null, // --> action.answer
            questions: {} // --> action.questions
        };

    if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
        return Object.assign({}, state, {
            userAnswer: null,
            questions: action.questions
        });
    } else if (action.type === actions.FETCH_QUESTIONS_ERROR) {
        return state;
    } else if (action.type === actions.SUBMIT_ANSWER_SUCCESS) {
        return Object.assign({}, state, {
            questions: action.answer
        });
    }
    return state;
}

export default reducer;