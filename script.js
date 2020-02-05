let textarea = document.querySelector(".textarea");
let button = document.querySelector(".button");
let result = document.querySelector(".result-wrap");
let stateNumber;
button.onclick = function () {
  let str = textarea.value;

  let regexp1 = /(\d+(\.\d+)?(-\d+)*:)|(\s{4,}-\s[^|].+)/gi;
  let regexp2 = /\s*-\s.+/gi;
  // let regexp3 = /\d+(\.\d+)?(-\d+)*:/gi;
  let arr = str.match(regexp1);
  let matchesArr = [];


  for (let i = 0; i < arr.length; i++) {
    console.log(i + '   ' + arr[i]);
    let arrOfOneQuestion = arr[i].toLowerCase().match(regexp2);

    //Удаляем "?", где они есть
    if (arrOfOneQuestion) {
      let question = arrOfOneQuestion[0];
      if (question[question.length - 1] == '?') {
        question = question.substring(0, question.length - 1);
      }

      if (matchesArr.length == 0) {
        stateNumber = arr[i - 1];
      }
      matchesArr.push(question);
    }

    //Если у нас цифра
    else {
      compareStrings(matchesArr);
      matchesArr = [];
    }
  }
  //Когда идёт последний
  compareStrings(matchesArr);
  result.innerHTML += '<br>' + 'Проверка окончена.'

};




function compareStrings(stringsArr) {
  if (stringsArr !== undefined && stringsArr.length > 1) {
    for (let j = 0; j < stringsArr.length - 1; j++) {
      for (let k = j + 1; k < stringsArr.length; k++) {
        if (stringsArr[j] == stringsArr[k]) {
          result.innerHTML += 'state ' + stateNumber + '<br>';
          result.innerHTML += stringsArr[k] + '<br>';
        }
      }
    }
  }
}

