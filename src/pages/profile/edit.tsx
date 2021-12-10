import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { SideBar } from "../../components/SideBar/Sidebar";
import { EditRegularUserDetails } from "../../components/UserDetails/EditRegularUserDetails";
import { EditUserDetails } from "../../components/UserDetails/EditUserDetails";
import {
  useMeQuery,
  useUploadProfilePictureMutation,
  useAddProfilePictureMutation,
  useWorkerByIdQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Edit = () => {
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
      <Head>
        <title>Modifier le profil</title>
      </Head>
      <Box py="12">
        <Flex bg="white" mx={"auto"} w={{ base: "100%", xl: 1400 }}>
          <SideBar
            src={newImgSrc}
            worker={dataMe?.me?.isWorker ? data.workerById : dataMe?.me}
            action={action}
          />
          {dataMe?.me?.isWorker ? (
            <EditUserDetails worker={data?.workerById} />
          ) : (
            <EditRegularUserDetails user={dataMe?.me} />
          )}
        </Flex>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Edit);
