"use strict";
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".form");
const input = document.querySelector("#inputText");
const list = document.querySelector("ul");
const title = document.querySelector("h1");
const listWrapper = document.querySelector("#listWrapper");

async function getCountOfWords() {
  list.innerHTML = "";   // получаем данные из text area
  const inputText = input.value.trim();  // убираем пробелы по бокам

  if (inputText === "") {
    input.value = "";
  }

  try {
    const resp = await fetch("/", {       // отправляем текст на сервер
      method: "POST",
      body: inputText,
    });

    if (resp.ok) {         // если вернулся норм ответ, записываем его в data и эту data возвращаем
      const data = await resp.json();
      return data;
    } else {
      throw new Error("Не вийшло відправити форму");
    }
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const objOfWords = await getCountOfWords();  // получаем данные из промиса getCountOfWords()
  for (const word in objOfWords) {             // отрисовка происходит на стороне клиента, т.к. в задании надо было только логику перенести на сервер
    const countOfWords = objOfWords[word];
    const item = document.createElement("li");
    item.className = "item";
    item.textContent = `${word}: ${countOfWords}`;
    list.append(item);
  }

  listWrapper.classList.add("list__wrapper");
  title.textContent = `Унікальних слів - ${Object.keys(objOfWords).length}`;
});
