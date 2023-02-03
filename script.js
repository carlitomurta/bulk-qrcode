const QR = require("qrcode-base64");
const fs = require("fs");

const dir = "./codes";
const howMany = 1000;

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
  for (let index = 0; index < howMany; index++) {
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
