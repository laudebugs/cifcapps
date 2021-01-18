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
            <div class="links">
              <a href="${item["Facebook"]}" target="_blank">
              <img class="icon"/ src= "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/1200px-Facebook_circle_pictogram.svg.png">
              </a>
              <a href="${item["Website"]}">
              <img class="icon" src="https://raw.githubusercontent.com/lbugasu/cifcapps/master/src/link.svg"/>
              </a>
            </div>
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
      var style = document.createElement("style");
      style.innerHTML = `
         div.clubItem h3 {
          font-size: 18pt;
          margin: 0;
          padding: 0;
          color: #49326b;
        }
        div.clubItem p {
          margin: 1% 0.5% 1.5% 0.5%;
        }

        div.clubItem {
          width: 22%;
          display: inline-block;
          vertical-align: top;
          border: 0;
          padding: 0.5%;
          margin: 0.5%;
          border-radius: 5%;
          border: 1px solid #49326b;
        }
        h2.clubName {
          font-family: "Archivo Black", sans-serif;
          font-size: 24pt;
          text-align: center;
          color: #49326b;
        }
        p.clubDescription {
          font-size: 18pt;
        }
        p.meetingPlace {
          font-size: 16pt;
          padding: 0 5% 0 5%;
        }
        p.contactPerson {
          width: 90%;
          display: inline-block;
          padding: 0 5% 0 5%;
          font-size: 16pt;
        }
        img.clubCoverImage {
          width: 100%;
        }
        img.icon {
          width: 30px;
        }
        div.links {
          text-align: center;
        }


        `;
      document.head.appendChild(style);
    });
  });
});
