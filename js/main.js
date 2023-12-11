"use strict";

// Dichiarazioni
const wordsToGenerate = 10;
const arrayRandomWords = [];

// Funzione per la chiamata axios che genera una parola casuale
function generateRandomWord() {
  let url = "https://flynn.boolean.careers/exercises/api/random/word";

  axios
    .get(url)
    .then((response) => {
      console.log(response.data.response);
      arrayRandomWords[arrayRandomWords.length] = response.data.response;

      // Verifico se ho generato tutte le parole randomiche, se no richiamo nuovamente la funzione
      if (arrayRandomWords.length < wordsToGenerate) {
        generateRandomWord();
      } else {
        console.log("Parole generate:", arrayRandomWords);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Richiamo la funzione che genera una parola casuale
generateRandomWord();