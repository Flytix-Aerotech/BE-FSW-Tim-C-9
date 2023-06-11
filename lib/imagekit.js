const ImageKit = require("imagekit");

let imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
  privateKey: process.env.PRIVATE_KEY,
});

const uploadToImagekit = async (request) => {
  const file = request.file;
  const split = file.originalname.split(".");
  const ext = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG_${Date.now()}.${ext}`,
  });
  return img;
};

module.exports = { uploadToImagekit };
