// eslint-disable-next-line no-undef
$(document).ready(function () {
  const clubs = fetch(
    "https://lbugasu-cors-proxy.herokuapp.com/https://nyucifc.herokuapp.com/clubs",
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    }
  );
  clubs.then((result) => {
    result.json().then((items) => {
      let clubList = items
        .map((item) => {
          console.log(item.coverImageLink);
          return `
          <div
            class= "clubItem"
          >
            <h2 class="clubName">${item["Name"]}</h2>
          <img class="clubCoverImage" src="${item["coverImageLink"]}"/>
            <p class="clubDescription">${item["Description"]}</p>
            <h3>Meeting Place:</h3>
            <p class="meetingPlace">${item["Meeting Place"]}</p>

            <h3>Contact:</h3>
            <p class="contactPerson">${item["Main Contact person "]}</p>
            
          </div>`;
        })
        .join("");
      // The Monthly View
      let clubsDiv = $("#clubs")[0];
      clubsDiv.innerHTML = clubList;
      //   cal.innerHTML = events;

      /**
       * Add the styles
       */
      // var style = document.createElement("style");
      // style.innerHTML = `
      //     div.clubItem {
      //     width: 18%;
      //     display: inline-block;
      //     vertical-align: top;
      //   }
      //   h2.clubName {
      //     font-family: "Archivo Black", sans-serif;
      //     font-size: 18pt;
      //     text-align: center;
      //   }

      //   `;
      // document.head.appendChild(style);
    });
  });
});
