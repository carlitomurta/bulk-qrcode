const QR = require("qrcode-base64");
const fs = require("fs");

const dir = "./codes";
let from = 0;
let to = 1;

var args = require("minimist")(process.argv.slice(2));

from = args.from;
to = args.to;

const bulkCodes = () => {
  if (!fs.existsSync(dir)) {
    console.log("folder created");
    fs.mkdirSync(dir);
  } else {
    console.log("folder removed");
    fs.rmSync(dir, { recursive: true, force: true });
    bulkCodes();
    return;
  }
  for (let index = from; index < to; index++) {
    var imgData = QR.drawImg((index + 1).toString(), {
      typeNumber: 1,
      errorCorrectLevel: "M",
      size: 200,
    });
    const base64Data = imgData.replace(/^data:image\/gif;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    fs.writeFile(`./codes/${index + 1}.jpg`, imageBuffer, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Image saved locally.");
      }
    });
  }
};

bulkCodes();
