import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useConfirmUserMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const ConfirmEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [, confirmUser] = useConfirmUserMutation();
  let resp;
  useEffect(() => {
    (async () => {
      resp = await confirmUser({ token: token as string });
      if (resp.data) {
        router.push("/");
      }
    })();
  }, [confirmUser]);

  return <Box>Redirecting ...</Box>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ConfirmEmail);
