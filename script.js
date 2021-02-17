let textarea = document.querySelector(".textarea");
let checkButton = document.querySelector(".checkButton");
let clearButton = document.querySelector(".clearButton");
let clearAllButton = document.querySelector(".clearAllButton");
let result = document.querySelector(".result-wrap");
let stateNumber;
checkButton.onclick = function () {
  let str = textarea.value;

  let regexp1 = /(\d+(\.\d+)?(-\d+)*:)|(\s{4,}-\s[^|].+)/gi;
  let regexp2 = /\s*-\s.+/gi;
  //Разбиваем весь введенный текст на строки, где номера стейтов и вопросы
  let arr = str.match(regexp1);
  let matchesArr = [];
  let questionsNumberArr = [];


  for (let i = 0; i < arr.length; i++) {
    // console.log(i + '   ' + arr[i]);
    let arrOfOneQuestion = arr[i].toLowerCase().match(regexp2);

    if (arrOfOneQuestion) {
      let question = arrOfOneQuestion[0];

      //Удаляем "?", где они есть
      if (question[question.length - 1] == '?') {
        question = question.substring(0, question.length - 1);
      }

      matchesArr.push(question);
      //Массив, в котором седержится номер вопроса в массиве arr.
      questionsNumberArr.push(i);
    }

  }
  //Когда идёт последний
  compareStrings(matchesArr, questionsNumberArr, arr);
  result.innerHTML += '<br>' + 'Проверка окончена.' + '<br>' + '<br>';
};


clearButton.onclick = function () {
  textarea.value = "";
};

clearAllButton.onclick = function () {
  textarea.value = "";
  result.innerHTML = "";
};




function compareStrings(stringsArr, qNA, A) {
  if (stringsArr !== undefined && stringsArr.length > 1) {
    for (let j = 0; j < stringsArr.length - 1; j++) {
      for (let k = j + 1; k < stringsArr.length; k++) {
        if (stringsArr[j].trim() === stringsArr[k].trim()) {
          //Одинаковые вопросы в одном стейте игнорируем
          if (getState(j, qNA, A) !== getState(k, qNA, A)) {
            result.innerHTML += 'state ' + getState(j, qNA, A).substring(0, getState(j, qNA, A).length - 1)
                + ', ' + getState(k, qNA, A) + '<br>';
            result.innerHTML += stringsArr[k] + '<br>';
          }
        }
      }
    }
  }
}

function getState(j, qNA, A) {
  for (let i = j; i >= 0; i--) {
    if (qNA[i] !== qNA[i-1] + 1) {
      return A[qNA[i]-1];
    }
  }
}