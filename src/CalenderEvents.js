import React, { useState, useEffect } from "react";
const GSheetReader = require("g-sheets-api");

const CalendarEvents = () => {
  const [loaded, setLoaded] = useState(false);

  let [stuff, setStuff] = useState([]);
  useEffect(() => {
    const options = {
      sheetId: "1i1BEQL3iehSZiMcL11Xz6g90xz3O7XU7lplrFTiDDH4",
      sheetNumber: 1,
      returnAllResults: true,
    };
    GSheetReader(
      options,
      (results) => {
        setLoaded(true);
        setStuff(results);
        // do something with the results here
      },
      (error) => {
        // OPTIONAL: handle errors here
      }
    );
  }, []);

  if (loaded) {
    return <pre>{JSON.stringify(stuff, null, 2)}</pre>;
  } else {
    return <div></div>;
  }
};
export default CalendarEvents;
// React.render(<PrettyPrintJson />, document.getElementById("container"));
