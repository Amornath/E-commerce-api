const path = require("path");
const fs = require("fs");

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response: any, request: any, context: any) => {
  const { record, uploadImage } = context;

  if (record.isValid() && uploadImage) {
    const filePath = path.join(
      "uploads",
      record.id().toString(),
      uploadImage.name
    );
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadImage.path, filePath);

    // TODO: add Backend base url
    await record.update({ source: `/${filePath}` });
  } else {
    // await record.update({ source: null });
    console.log("Image Upload Eror:", record.errors);
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request: any, context: any) => {
  if (request.method === "post") {
    const { uploadImage, ...otherParams } = request.payload;

    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };
