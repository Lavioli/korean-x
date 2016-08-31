const testArr = [
  {
    question: 'question 1',
    answer: 'blah',
    mValue: 1,
  },
  {
    question: 'question 2',
    answer: 'blah',
    mValue: 1,
  },
  {
    question: 'question 3',
    answer: 'blah',
    mValue: 1,
  },
  {
    question: 'question 4',
    answer: 'blah',
    mValue: 1,
  },
  {
    question: 'question 5',
    answer: 'blah',
    mValue: 1,
  },
  {
    question: 'question 6',
    answer: 'blah',
    mValue: 1,
  },
  {
    question: 'question 7',
    answer: 'blah',
    mValue: 1,
  },
];

function spacedAlg(answer) {
  if (testArr[0].answer === answer) {
    testArr[0].mValue *= 2;
  } else {
    testArr[0].mValue = 1;
  }

  const currentQuest = testArr.shift();
  testArr.splice(currentQuest.mValue, 0, currentQuest);

  return testArr;
}

console.log('1', spacedAlg('blah'));
console.log('2', spacedAlg('blah'));
console.log('3', spacedAlg('hi'));
console.log('4', spacedAlg('blah'));
console.log('5', spacedAlg('blah'));
console.log('6', spacedAlg('monkey'));

// add order
