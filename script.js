const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const writeStream = fs.createWriteStream("result.csv");

fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (data) => {
    // Ajout ID auto-incrémenté
    data.id = results.length + 1;
    results.push(data);
  })
  .on("end", () => {
    console.log(
      results.map((element) => {
        // console.log("ELEMENT ===========", element);
        return {
          id: element.id,
          Period: element.Period,
          Data_value: element.Data_value,
          Series_title_2: element.Series_title_2,
        };
      })
    );
  });

function sendMessage(message, writableStream) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(message, { stream: true });
  encoded.forEach((chunk) => {
    writableStream.ready
      .then(() => writableStream.write(chunk))
      .then(() => console.log("Chunk written to sink."))
      .catch((err) => console.error("Chunk error:", err));
  });
  // check
  // before closing the writer.
  writableStream.ready
    .then(async () => await writableStream.close())
    .then(() => console.log("All chunks written"))
    .catch((err) => console.error("Stream error:", err));
}

