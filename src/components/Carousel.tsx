import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  ResponsiveValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = ({
  images,
  width,
  height,
}: {
  images: string[];
  width: ResponsiveValue<number | string>;
  height: ResponsiveValue<number | string>;
}) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  images = (images as string[]).filter((image) => {
    return !(
      image == "" ||
      !image.includes(
        "https://projecta-profile-pictures.s3.amazonaws.com/publicPic"
      )
    );
  });

  const Cards = images.map((image: string) => ({
    text: "Tinker.ma",
    image: image,
  }));

  return (
    <Box
      position={"relative"}
      height={height}
      width={width}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {Cards.map((card, index) => (
          <Box
            key={index}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundImage={card.image}
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container
              height={height}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack
                maxW={"lg"}
                // position="absolute"
                // top={"50%"}
                // left={"50%"}
                // transform="translate(0, -50%)"
              >
                {/* <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  {card.title}
                </Heading> */}
                <Text
                  opacity={"0.5"}
                  fontWeight={"semibold"}
                  fontSize={{ base: "4xl", sm: "5xl" }}
                  color="gray.500"
                  transform="rotate(15deg)"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
      {/* Left Icon */}
      {/* <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton> */}
      <IconButton
        display={images.length ? "flex" : "none"}
        size={"lg"}
        aria-label="left-arrow"
        borderRadius="full"
        opacity={"80%"}
        bgColor={"gray.300"}
        _hover={{ bgColor: "gray.400" }}
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        // zIndex={1}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size={"32px"} />
      </IconButton>
      {/* Right Icon */}
      {/* <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton> */}
      <IconButton
        display={images.length ? "flex" : "none"}
        size={"lg"}
        aria-label="right-arrow"
        opacity={"80%"}
        bgColor={"gray.300"}
        _hover={{ bgColor: "gray.400" }}
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        // zIndex={1}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size={"32px"} />
      </IconButton>
      {/* Slider */}
    </Box>
  );
};
export default Carousel;
