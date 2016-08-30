var actions = require('./actions');

var reducer = function(state, action) {
    console.log(action.type, 'ACTION.type');
    state = state || {
            userAnswer: 'spam'
        };

    if (action.type === 'SUBMIT_ANSWER') {
        console.log('WORKING');
        return Object.assign({}, state, {
            userAnswer: action.answer,
        });
    }
    return state;
};

module.exports = reducer;