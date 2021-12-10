import { useState } from "react";
import {
  useUploadProfilePictureMutation,
  useAddProfilePictureMutation,
  Worker,
} from "../generated/graphql";

export const handleImageUpload = async (file: File, worker: Worker) => {
  const [, uploadProfilePicture] = useUploadProfilePictureMutation();
  const [, addProfilePicture] = useAddProfilePictureMutation();

  if (file) {
    const { type } = file;
    const response = await uploadProfilePicture({
      uploadProfilePictureFileName: `${worker.id}}.jpg`,
      uploadProfilePictureFileType: type,
    });
    if (
      response.data?.uploadProfilePicture.signedS3Url &&
      response.data.uploadProfilePicture.objectUrl
    ) {
      try {
        await fetch(response.data.uploadProfilePicture.signedS3Url, {
          method: "PUT",
          body: file,
        });
        await addProfilePicture({
          addProfilePicturePictureUrl:
            response.data.uploadProfilePicture.objectUrl,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
