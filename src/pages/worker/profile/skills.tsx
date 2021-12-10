import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { SideBar } from "../../../components/SideBar/Sidebar";
import { SkillsDetails } from "../../../components/UserDetails/SkillsDetails";
import { useMeQuery, useWorkerByIdQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const Skills = () => {
  const router = useRouter();
  const { action } = router.query;
  let { id } = router.query;
  if (!id) {
    id = router.asPath.split("id=")[1];
  }
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery();

  const [{ data, fetching }] = useWorkerByIdQuery({
    variables: { workerByIdId: id as string },
  });
  const imgSrc = data?.workerById?.profilePicture as string;
  const suffix = "?random=".concat(new Date().toString());
  const newImgSrc = imgSrc?.concat(suffix);
  useEffect(() => {
    if ((!fetchingMe && !dataMe?.me) || (dataMe?.me?.id !== id && !fetching)) {
      router.replace("/");
    }
  }, [fetching, fetchingMe, dataMe, router]);
  if (!data) {
    return <Box>404 not found</Box>;
  }
  return (
    <Layout>
      <Box py={12}>
        <Flex bg="white" mx={"auto"} w={{ base: "100%", xl: 1400 }}>
          <SideBar src={newImgSrc} worker={data.workerById} action={action} />
          <SkillsDetails worker={data.workerById} />
        </Flex>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Skills);
