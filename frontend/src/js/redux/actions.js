import fetch from 'isomorphic-fetch';

const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
function submitAnswer(answer) {
    return {
        type: SUBMIT_ANSWER,
        answer: answer
    }
}

const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
function fetchQuestionsSuccess(questions) {
    return {
        type: FETCH_QUESTIONS_SUCCESS,
        questions: questions
    }
}

const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
function fetchQuestionsError(error) {
    return {
        type: FETCH_QUESTIONS_ERROR,
        questions: error
    }
}

function fetchQuestion() {
    return (dispatch) => {
        let url = 'http://localhost:8080/questions';
        return fetch(url).then((response) => {
            if (response.state < 200 || response.status >= 300) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        }).then((questions) => {
            console.log(questions, '<---QS');
            return dispatch(fetchQuestionsSuccess(questions));
        }).catch((error) => {
            return dispatch(fetchQuestionsError(error));
        })
    };
}

exports.SUBMIT_ANSWER = SUBMIT_ANSWER;
exports.submitAnswer = submitAnswer;
exports.FETCH_QUESTIONS_SUCCESS = FETCH_QUESTIONS_SUCCESS;
exports.fetchQuestionsSuccess = fetchQuestionsSuccess;
exports.FETCH_QUESTIONS_ERROR = FETCH_QUESTIONS_ERROR;
exports.fetchQuestionsError = fetchQuestionsError;
exports.fetchQuestion = fetchQuestion;