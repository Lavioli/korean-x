import actions from './actions';

function reducer (state, action) {
    console.log(action.type, 'ACTION.type');
    state = state || {
            userAnswer: 'spam'
        };

    if (action.type === actions.submitAnswer) {
        console.log('WORKING');
        return Object.assign({}, state, {
            userAnswer: action.answer,
        });
    }
    return state;
};

export default reducer;