/**
 * This script will be added on every page to minimalize the delay in some cases
 * where the script isn't being run
 * Reference: https://stackoverflow.com/questions/54492245/javascript-only-being-called-once-in-squarespace
 */
/**
 * The div element with the class loading will only be present if
 * the javascript hasn't removed it
 */
let loadingDiv = $(".loading");
/**
 * If the loading div element is present, i.e. loadingDiv.length >0,
 * reload the page after 3 seconds
 */
if (loadingDiv.length > 0) {
  setTimeout(function () {
    if (!loadingDiv[0].classList.contains("loaded")) {
      loadingDiv[0].classList.add("loaded");
      location.reload();
    }
  }, 3000);
}

let clubsDiv = $("#clubs")[0];

loadingDiv[0].classList.add("loaded");
// removing the loading element
loadingDiv[0].innerHTML = "";
// remove the styling for the loading element
loadingDiv[0].style.height = 0;
loadingDiv[0].style.paddingTop = 0;

$(document).ready(function () {
  /**
   * Get the data from the clubs api.
   * Find info about the api here: https://github.com/lbugasu/cifc-api
   */
  const clubs = fetch("https://cifc-api.herokuapp.com/clubs", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
  });
  /**
   * Parse the results which are returned as an array of json objects
   */
  clubs.then((data) => {
    data
      .json() // parse the result to a json object
      .then((res) => {
        console.log(res.data);
        const listOfTags = [];
        res.data.map((club) => {
          /**
           * For each club, create a div element to place it in
           */
          const ele = document.createElement("div");

          /**
           * If a club has a website listed, return a link image that links to the website
           * else, return an empty span
           */
          function checkWebsite() {
            if (club[8]) {
              return `<a href=${club[8]} target="_blank">
              <img class="icon" src="https://raw.githubusercontent.com/lbugasu/cifcapps/master/images/link_icon.png"/>
            </a>`;
            } else {
              return `<span></span>`;
            }
          }

          /**
           * If a club has it's facebook page listed, return a facebook logo with a link to the FB page
           * else return an empty span
           */
          function checkFB() {
            if (club[9]) {
              return `<a href="${club[9]}" target="_blank">
                      <img class="icon"/ src= "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/1200px-Facebook_circle_pictogram.svg.png">
                    </a>`;
            } else {
              return `<span></span>`;
            }
          }

          /**
           * create the tags listed for each club
           */
          // get the string of tags and split on comma
          let tagList = club[1].split(", ");
          // initialize a tagSection element to append html
          let tagSection = ``;
          // initialize a string to hold the tag class string that will be appended to the club element
          let tags = ``;
          tagList.map((tag) => {
            if (listOfTags.indexOf(tag.trim()) === -1) {
              listOfTags.push(tag.trim());
            }
            const tagClass = tag.trim().replace(" ", "_");
            tags += ` ${tagClass}`;
            tagSection += `
          <span class="${tagClass} tag" >
          ${tag}
          </span>`;
          });
          const fillerImage = 'https://mcdn.wallpapersafari.com/medium/36/29/9hlsuO.png); height: 175px'
          // Add the class names and the tags associated with the club to the club element
          ele.className = "clubItem" + tags;
          ele.innerHTML = `
                <h2 class="clubName">${club[0]}</h2>
                    <div class="tagList">${tagSection}</div>
                    <div class="placeImageHere clubCoverImage" 
                      style="background-image: url(${!!club[10]?club[10]:fillerImage}); height: 175px"
                      
                    >

                    </div>
                    <p class="clubDescription">${club[2]}</p>
                    <h4>Meeting Time & Location:</h4>
                    <p class="meetingPlace"><b>Time:</b> ${club[4]}</p>
                    <p class="meetingPlace"><b>Location:</b> ${club[5]}</p>

                    <h4>Contact:</h4>
                    <p class="contactPerson">${
                      club[6]
                    }<br/><a href="mailto:${club[7]}">${
            club[7]
          } ✉ <a></p>
                    <div class="links">
                    ${checkFB()}
                    ${checkWebsite()}
                    
                    
                </div>`;
          clubsDiv.appendChild(ele);
        });
        /**
         * Color the tags ->> If you'd like to change the colors,
         * just add different colors here!
         */
        let colors = [
          "#DC965A",
          "#5C9EAD",
          "#D4AFB9",
          "#809848",
          "#FAA381",
          "#F6AE2D",
          "#F26419",
          "#9FD356",
          "#FA824C",
          "#BBC7A4",
          "#FFFC31",
          "#A69CAC",
          "#5688C7",
          "#86BBD8",
          "#E8DB7D",
          "#FF8CC6",
        ];
        /**
         * create a color map object and map each tag to a color
         */
        const colorMap = {};
        for (let x = 0; x < listOfTags.length; x++) {
          colorMap[listOfTags[x].trim()] = colors[x];
        }

        /**
         * Create a style element to add the colors to the css
         */
        const style = document.createElement("style");
        let styleString = ``;
        let tagString = ``;
        for (tag in colorMap) {
          const tagClass = tag.trim().replace(" ", "_");
          let tagColor = hexToRGB(colorMap[tag]);
          styleString += `span.${tagClass}{
              background-color: rgba(${tagColor.red},${tagColor.green},${tagColor.blue},0.6);
              border: 1px solid rgba(${tagColor.red},${tagColor.green},${tagColor.blue},0.9);
            }
            `;
          const thisTag = `
            <span class="${tagClass} tag selected button">
            ${tag}
            </span>`;
          // Add the tag to the tag string
          tagString += thisTag;
        }
        /**
         * Site color is the color of the CIFC Logo
         * This will be the default color of tags when a tag is not selected
         */
        const siteColor = hexToRGB("#265062");
        styleString += `span.selected{
            background-color: rgba(${siteColor.red},${siteColor.green},${siteColor.blue},0.2);
            border: 1px solid rgba(${siteColor.red},${siteColor.green},${siteColor.blue},0.2);
          }
          `;
        // select the tags div
        const tagDiv = document.getElementById("tags");
        // Add the tags to the tags div
        tagDiv.innerHTML = `<span class="tagGuide">Filter by tag</span>: ${tagString}`;
        style.innerHTML = styleString;
        // Add the style to the document
        document.head.appendChild(style);

        /**
         * Function for when a tag is clicked
         */
        $(".button").click(function (e) {
          /**
           * Remove clubs that contain this tag
           */
          if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");

            $(`div.clubItem`).css("display", "none");
          } else {
            /**
             * Include clubs that contain this tag
             */
            $(this).addClass("selected");
          }

          /**
           * Add the functionality for removing div elements based on the selected tag
           */
          let buttons = [...$(".button")].filter(
            (tag) => !tag.classList.contains("selected")
          );
          /**
           * If no element is selected, display all clubs
           */
          if (buttons.length === 0) {
            $(`div.clubItem`).css("display", "inline-block");
          } else {
            // hide the elements
            $(`div.clubItem`).css("display", "none");

            /**
             * only display the selected elements that fit the selected element
             */
            // Generate classlist
            let list = [];
            let str = "";
            buttons.map((btn) => {
              list.push(btn.classList[0]);
              str += `.${btn.classList[0]}`;
            });
            $(`div${str}`).css("display", "inline-block");
          }
        });
      })
  });
});

/**
 * A function to change values from hex codes to RGB
 */
const hexToRGB = (hex) => {
  let r = 0,
    g = 0,
    b = 0;
  // handling 3 digit hex
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
    // handling 6 digit hex
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  return {
    red: +r,
    green: +g,
    blue: +b,
  };
};
