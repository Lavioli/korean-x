import fetch from 'isomorphic-fetch';

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
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${AUTH_TOKEN}`);
    let url = 'http://localhost:8080/questions';
    return fetch(url, {
      headers,
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      // console.log(response, '<---just response');
      // console.log(response.json(), '<----with json');
      return response.json();
    }).then((questions) => {
      return dispatch(fetchQuestionsSuccess(questions));
    }).catch((error) => {
      return dispatch(fetchQuestionsError(error));
    })
  };
}

const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';

function submitAnswerSuccess(answer) {
  return {
    type: SUBMIT_ANSWER_SUCCESS,
    answer: answer
  }
}

const SUBMIT_ANSWER_ERROR = 'SUBMIT_ANSWER_ERROR';

function submitAnswerError(error) {
  return {
    type: SUBMIT_ANSWER_ERROR,
    answer: error
  }
}

function submitAnswer(answer) {
  return (dispatch) => {
    let init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(answer)
    };
    let url = 'http://localhost:8080/questions';
    return fetch(url, init).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    }).then((answer) => {
      return dispatch(submitAnswerSuccess(answer));
    }).catch((error) => {
      return dispatch(submitAnswerError(error));
    })
  };
}

exports.FETCH_QUESTIONS_SUCCESS = FETCH_QUESTIONS_SUCCESS;
exports.fetchQuestionsSuccess = fetchQuestionsSuccess;
exports.FETCH_QUESTIONS_ERROR = FETCH_QUESTIONS_ERROR;
exports.fetchQuestionsError = fetchQuestionsError;
exports.fetchQuestion = fetchQuestion;

exports.SUBMIT_ANSWER_SUCCESS = SUBMIT_ANSWER_SUCCESS;
exports.submitAnswerSuccess = submitAnswerSuccess;
exports.SUBMIT_ANSWER_ERROR = SUBMIT_ANSWER_ERROR;
exports.submitAnswerError = submitAnswerError;
exports.submitAnswer = submitAnswer;
