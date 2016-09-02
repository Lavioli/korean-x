function spacedAlg() {

  if (testArr[0].answer === answer) {
    testArr[0].mValue *= 2;
  } else {
    testArr[0].mValue = 1;
  }

  const currentQuest = testArr.shift();
  testArr.splice(currentQuest.mValue, 0, currentQuest);

  return testArr;
}

module.exports = spacedAlg;
