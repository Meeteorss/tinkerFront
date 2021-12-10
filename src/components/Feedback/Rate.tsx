import React, { useMemo, useState } from "react";

import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import { useRateMutation } from "../../generated/graphql";

const defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  },
};
const colors = {
  filled: "#f5eb3b",
  unfilled: "#DCDCDC",
};

const Rate = ({ worker }: any) => {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [{ data }, rate] = useRateMutation();
  let errorMsg = null;
  const onClick = (value: any) => {
    setCurrentValue(value);
    rate({ rateWorkerId: worker.id, rateValue: value });

    if (!data) {
      errorMsg = (
        <Box textColor={"red"}>you have already rated this worker</Box>
      );
    }
  };

  const onMouseOver = (value: any) => {
    setHoverValue(value);
  };
  const onMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box>
          {stars.map((_, index) => {
            return (
              <StarIcon
                key={index}
                _hover={{ cursor: "pointer" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.filled
                    : colors.unfilled
                }
                onClick={() => onClick(index + 1)}
                onMouseOver={() => onMouseOver(index + 1)}
                onMouseLeave={onMouseLeave}
              />
            );
          })}
        </Box>
      </Flex>
      {errorMsg}
    </>
  );
};

export default Rate;
