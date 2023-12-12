"use strict";

// Dichiarazioni
const wordsToGenerate = document.getElementById("words-to-generate");
const randomGenerate = document.getElementById("random-generate");
const btnSentence = document.getElementById("btn-sentence");
let callSuccessful = true;

// Funzione per la chiamata axios che genera una parola casuale
function generateRandomWord(wordsToGenerateValue, arrayRandomWords) {
  let url = "https://flynn.boolean.careers/exercises/api/random/word";

  axios
    .get(url)
    .then((response) => {
      arrayRandomWords[arrayRandomWords.length] = response.data.response;

      // Verifico se ho generato tutte le parole randomiche, se no richiamo nuovamente la funzione
      if (arrayRandomWords.length < wordsToGenerateValue) {
        generateRandomWord(wordsToGenerateValue, arrayRandomWords);
      } else {
        console.log("Parole generate:", arrayRandomWords);
        callSuccessful = true;
        // Richiamo la funzione che stampa a schermo il risultato della chiamata axios
        printsResultsOnScreen(arrayRandomWords);
      }
    })
    .catch((error) => {
      console.log(error.message);
      callSuccessful = false;
      // Richiamo la funzione che stampa a schermo il risultato della chiamata axios
      printsResultsOnScreen();
    });
}

// L'utente imposta quante parole vuole generare
btnSentence.addEventListener("click", function () {
  const wordsToGenerateValue = wordsToGenerate.value;
  const arrayRandomWords = [];
  const errorForm = document.getElementById("error-form");

  // Verifico che l'utente abbia inserito un dato valido nel form
  if (
    !isNaN(parseInt(wordsToGenerateValue)) &&
    parseInt(wordsToGenerateValue) > 0
  ) {
    // Nascondo il messaggio di errore
    errorForm.classList.add("d-none"); 
    errorForm.classList.remove("d-block");

    // Richiamo la funzione che genera una parola casuale
    generateRandomWord(wordsToGenerateValue, arrayRandomWords);
  } else {
    // Mostro il messaggio di errore
    errorForm.textContent = "Inserisci un numero valido maggiore di 0";
    errorForm.classList.add("d-block"); 
    errorForm.classList.remove("d-none");
  }
});

// L'utente ricarica la pagina
function reloadPage() {
  location.reload();
}

// Funzione che stampa a schermo il risultato della chiamata axios
function printsResultsOnScreen(arrayRandomWords) {
  // Disabilito il pulsante per generare le parole randomiche
  btnSentence.disabled = true;

  // Verifico se la chiamata axios ha avuto successo
  if (callSuccessful === true) {
    let sentence = document.createElement("p");
    sentence.textContent = arrayRandomWords.join(" ");
    randomGenerate.appendChild(sentence);
  } else {
    let error = document.createElement("p");
    error.textContent = "An error occurred";
    randomGenerate.appendChild(error);
  }

  // Creo un pulsante e richiamo la funzione per ricaricare la pagina
  randomGenerate.innerHTML += `<button class="btn btn-primary" id="btn-reload">Reload page</button>`;
  const btnReload = document.getElementById("btn-reload");
  btnReload.addEventListener("click", reloadPage);
}