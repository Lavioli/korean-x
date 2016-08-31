import actions from './actions';

function reducer (state, action) {
    state = state || {
            userAnswer: ''
        };

    if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
        return Object.assign({}, state, {
            userAnswer: '',
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