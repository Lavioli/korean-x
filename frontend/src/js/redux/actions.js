const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
function submitAnswer (answer) {
    return {
        type: 'SUBMIT_ANSWER',
        answer: answer
    }
}

exports.SUBMIT_ANSWER = SUBMIT_ANSWER;
exports.submitAnswer = submitAnswer;
