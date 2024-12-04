const CLOUD_NAME = "daayhy7z8";
const UPLOAD_PRESET = "g12-chat-app";

const uploadImageToCloudinary = async (imageUri) => {
  if (!imageUri) {
    throw new Error("Image URI is undefined");
  }

  try {
    const data = new FormData();
    const fileType = imageUri.split(".").pop();
    const file = {
      uri: imageUri,
      type: `image/${fileType}`,
      name: `upload.${fileType}`,
    };

    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    const result = await response.json();
    if (!result.secure_url) {
      throw new Error("No URL in response");
    }

    return result.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export { uploadImageToCloudinary };
