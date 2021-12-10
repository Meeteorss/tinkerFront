import { Avatar } from "@chakra-ui/avatar";
import { AddIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import {
  useAddPictureMutation,
  useDeletePictureMutation,
  useUploadPictureMutation,
} from "../../generated/graphql";

export const PicturesField = ({ worker, skill, skillId, index }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const imagePlaceholder =
    "https://projecta-profile-pictures.s3.eu-west-3.amazonaws.com/staticImages/imagePlaceholder.png";
  const previewImagePlaceholder = `${imagePlaceholder}?random=123`;

  const onDelete = () => {
    deletePicture({ index: index, skillId: skillId });
    setFile({
      preview: previewImagePlaceholder,
    });
    setImgSrc("");
    setIsOpen(false);
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const cancelRef: any = useRef();
  const [, uploadPicture] = useUploadPictureMutation();
  const [, addPicture] = useAddPictureMutation();
  const [, deletePicture] = useDeletePictureMutation();

  const [file, setFile] = useState([] as any);

  // let imgSrc: string;
  let newImgSrc: string;
  // if (worker.pictures) {
  //   imgSrc = worker.pictures[index];
  //   newImgSrc = imgSrc.concat("?random=".concat(new Date().toString()));
  // }
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (skill && skill.pictures) {
      setImgSrc(skill.pictures[index]);
      newImgSrc = imgSrc.concat("?random=".concat(new Date().toString()));
    }
  }, []);

  return (
    <>
      <Dropzone
        accept="image/jpeg, image/png"
        multiple={false}
        onDrop={async ([file]) => {
          setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));

          if (file) {
            const { type } = file;
            console.log("skillId", skillId);

            const response = await uploadPicture({
              fileName: `${skillId}-num:${index}.jpg`,
              fileType: type,
              skillId: skillId,
            });
            if (
              response.data?.uploadPicture.signedS3Url &&
              response.data.uploadPicture.objectUrl
            ) {
              try {
                await fetch(response.data.uploadPicture.signedS3Url, {
                  method: "PUT",
                  body: file,
                });
                await addPicture({
                  pictureUrl: response.data.uploadPicture.objectUrl,
                  index: index,
                  skillId: skillId,
                });
              } catch (error) {
                console.log(error);
              }
            }
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            mr={"2"}
            rounded={"md"}
            bg="beta"
            boxSize={"32"}
            position={"relative"}
            src={file.preview ? file.preview : newImgSrc}
            _hover={{ cursor: "pointer" }}
          >
            <DeleteIcon
              display={
                imgSrc || (file.preview && file.preview.includes("blob"))
                  ? "flex"
                  : "none"
              }
              position={"absolute"}
              color={"white"}
              top={0}
              right={0}
              boxSize={"5"}
              onClick={() => {
                setIsOpen(true);
              }}
              _hover={{ boxSize: "6" }}
            />

            <Box w={"full"} h={"full"} {...getRootProps()}>
              <Image
                display={file.preview || imgSrc ? "none" : "flex"}
                minH={"full"}
                src={imagePlaceholder}
              />

              <Image
                display={file.preview || imgSrc ? "flex" : "none"}
                minH={"full"}
                src={
                  file.preview
                    ? file.preview
                    : imgSrc.concat("?random=".concat(new Date().toString()))
                }
              />

              {/* <Image
                minH={"full"}
                src={file.preview ? file.preview : newImgSrc}
              /> */}
              <input {...getInputProps()} />
            </Box>
          </Box>
        )}
      </Dropzone>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"white"}>
            <AlertDialogHeader
              bgColor={"alpha"}
              fontSize="lg"
              fontWeight="bold"
            >
              Delete Picture
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                mr={2}
                bgColor={"red.400"}
                onClick={onDelete}
                ml={3}
                _hover={{ bgColor: "red.500" }}
              >
                Delete
              </Button>
              <Button
                border={"2px"}
                borderColor={"alpha"}
                ref={cancelRef}
                onClick={onCancel}
                _hover={{ bgColor: "alpha" }}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
