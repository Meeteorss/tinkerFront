import { Avatar } from "@chakra-ui/avatar";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import router from "next/router";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import {
  useUploadProfilePictureMutation,
  useAddProfilePictureMutation,
  useDeleteProfilePictureMutation,
} from "../../generated/graphql";

export const UploadField = ({ worker }: any) => {
  const [, uploadProfilePicture] = useUploadProfilePictureMutation();
  const [, addProfilePicture] = useAddProfilePictureMutation();
  const [, deleteProfilePicture] = useDeleteProfilePictureMutation();
  let { id } = router.query;
  if (!id) {
    id = router.asPath.split("profile/")[1].replace("?", "");
  }

  const [file, setFile] = useState([] as any);
  const imgSrc = worker.profilePicture as string;
  const time = new Date().toString();
  const suffix = "?random=".concat(time);

  let newImgSrc = "";
  if (imgSrc) {
    newImgSrc = imgSrc?.concat(suffix);
  }
  return (
    <Dropzone
      accept="image/jpeg, image/png"
      multiple={false}
      onDrop={async ([file]) => {
        setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
        if (file) {
          const { type } = file;
          const response = await uploadProfilePicture({
            uploadProfilePictureFileName: `${worker.id}.jpg`,
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
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
        >
          <Box {...getRootProps()}>
            <Avatar
              size={"2xl"}
              src={file.preview ? file.preview : newImgSrc}
              _hover={{ cursor: "pointer" }}
            >
              <input {...getInputProps()} />
            </Avatar>
          </Box>
          <Box {...getRootProps()}>
            <Button
              leftIcon={<BsCloudUpload />}
              mt={{ base: "2", md: "0" }}
              ml={{ base: "0", md: "8" }}
              bg={"gray.200"}
              _hover={{ bg: "gray.600", color: "white" }}
            >
              Change photo
            </Button>
          </Box>
          <Button
            border={"1px"}
            leftIcon={<DeleteIcon />}
            mt={{ base: "2", md: "0" }}
            ml={{ base: "0", md: "2" }}
            bg={"transparent"}
            color={"red.300"}
            _hover={{ bg: "red.500", color: "white" }}
            onClick={async () => {
              await deleteProfilePicture();
              setFile({
                preview: "",
              });
            }}
          >
            Delete photo
          </Button>
        </Flex>
      )}
    </Dropzone>
  );
};
