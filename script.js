"use strict";

function getLyrics(artist, title) {
  let url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

  console.log(`Looking up ${title} by ${artist}`);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $("#js-error-message").text(`Something went wrong:${error.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $("#results").empty();
  $("#results").append(`<article><h4>${responseJson.lyrics}</h4></article>`);
  $("#results").removeClass("hidden");
}

function watchForm() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    console.log("button clicked");

    let artist = $(".js-query-artist").val();
    let title = $(".js-query-title").val();

    getLyrics(artist, title);
  });
}

$(watchForm);
