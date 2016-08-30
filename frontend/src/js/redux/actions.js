function submitAnswer (answer) {
    return {
        type: 'SUBMIT_ANSWER',
        answer: answer
    }
}

exports.submitAnswer = submitAnswer;