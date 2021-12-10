import { Box } from "@chakra-ui/layout";
import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

export const ImageSlider = ({ images, width, height }: any) => {
  // images.map((image: any, index: any) => {
  //   if (
  //     image == "" ||
  //     !image.includes(
  //       "https://projecta-profile-pictures.s3.amazonaws.com/publicPic"
  //     )
  //   ) {
  //     images.splice(index, 1);
  //   }
  // });

  images = (images as any[]).filter((image) => {
    return !(
      image == "" ||
      !image.includes(
        "https://projecta-profile-pictures.s3.amazonaws.com/publicPic"
      )
    );
  });

  images = images.map((image: string) => ({ url: image }));

  // console.log("--", images);
  // console.log("--", images[0]);
  if (images[0] == undefined) {
    return <Box bgColor={"gray.200"} width={width} height={height}></Box>;
  }
  return (
    <Box>
      <SimpleImageSlider
        width={width}
        height={height}
        images={images}
        showNavs={images[0] && images[0].url == "" ? false : true}
        showBullets={images[0] && images[0].url == "" ? false : true}
        navStyle={2}
        navMargin={0}
        style={{ backgroundSize: "cover" }}
      />
    </Box>
  );
};
