import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useMeQuery, useWorkerByIdQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UserDetails } from "../components/UserDetails/UserDetails";
import { Flex } from "@chakra-ui/react";
import { SideBar } from "../components/SideBar/Sidebar";
import { RegularUserDetails } from "../components/UserDetails/RegularUserDetails";
import Head from "next/head";

const Profile = () => {
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
  const imgSrc = dataMe?.me?.profilePicture as string;
  const suffix = "?random=".concat(new Date().toString());
  let newImgSrc = "";
  if (imgSrc) {
    newImgSrc = imgSrc?.concat(suffix);
  }

  useEffect(() => {
    if ((!fetchingMe && !dataMe?.me) || (dataMe?.me?.id !== id && !fetching)) {
      router.replace("/");
    }
  }, [fetching, fetchingMe, dataMe, router]);
  if (fetching) {
    return <Box>loading</Box>;
  }
  if (!data) {
    return <Box>no data</Box>;
  }
  if (!dataMe || !dataMe.me) {
    return <Box>no data</Box>;
  }

  return (
    <Layout>
      <Head>
        <title>Mon profil</title>
      </Head>
      <Box py="12">
        <Flex bg="white" mx={"auto"} w={{ base: "100%", xl: 1400 }}>
          <SideBar
            src={newImgSrc}
            worker={dataMe.me.isWorker ? data.workerById : dataMe?.me}
            action={action}
          />
          {dataMe?.me?.isWorker ? (
            <UserDetails worker={data?.workerById} />
          ) : (
            <RegularUserDetails user={dataMe?.me} />
          )}
        </Flex>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Profile);
