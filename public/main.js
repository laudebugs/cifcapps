// eslint-disable-next-line no-undef
$(document).ready(function () {
  const clubs = fetch(
    "https://cors-anywhere.herokuapp.com/https://nyucifc.herokuapp.com/clubs",
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    }
  );

  clubs.then((result) =>
    result.json().then((items) => {
      // eslint-disable-next-line no-undef
      let cal = $("#nyucifc-calendar")[0];
      let clubList = items
        .map((item) => {
          let div = document.createElement("div");
          div.innerHTML = `<h1>${item["name"]}</h1>`;
          return `
          <div
            class= "clubItem"
          >
            <h2 class="clubName">${item["name"]}</h2>
            <p>${item["description"]}</p>
            <h3>Meeting Place</h3>
            <p>${item["meeting place"]}</p>

            <h3>Contact</h3>
            <p>${item["main contact person "]}</p>
            
          </div>`;
        })
        .join("");
      console.log(clubList);
      // The Monthly View
      let clubsDiv = $("#clubs")[0];
      clubsDiv.innerHTML = clubList;
      console.log(clubsDiv);
      //   cal.innerHTML = events;
    })
  );
});
