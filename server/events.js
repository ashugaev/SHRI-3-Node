const fs = require("fs");
const util = require("util");

const getFile = util.promisify(fs.readFile);

async function getEvents(page, type, amount) {
  const data = await getFile("./server/events.json", "utf8");
  let events = JSON.parse(data).events;
  let maxPages;
  let error;

  console.log("событий изначально", events.length);

  if (type) events = events.filter(item => item.type === type);

  if (!events.length) error = "Incorrect type";

  console.log("после фильтра по типу", events.length);

  if (amount) {
    maxPages = Math.ceil(events.length / amount);
    if (maxPages < 1) maxPages = 1;

    console.log(
      "максимум стр.",
      maxPages,
      "при кол-ве",
      amount,
      " и длине ",
      events.length
    );

    const pageInt = parseInt(page);
    if (pageInt < 1 || pageInt > maxPages) error = "Incorrect page";

    const from = amount * page - amount;
    const to = from + parseInt(amount);
    events = events.slice(from, to);

    console.log(
      "прослайсили массив ",
      from,
      to,
      "теперь элементов",
      events.length
    );
  }

  return { events, error };
}

module.exports.getEvents = getEvents;
