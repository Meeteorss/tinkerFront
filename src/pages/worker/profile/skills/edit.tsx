import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../../../components/Layout";
import { SideBar } from "../../../../components/SideBar/Sidebar";
import { CreateSkill } from "../../../../components/UserDetails/CreateSkill";
import { EditSkill } from "../../../../components/UserDetails/EditSkill";
import { SkillsDetails } from "../../../../components/UserDetails/SkillsDetails";
import {
  useGetSkillQuery,
  useMeQuery,
  useWorkerByIdQuery,
} from "../../../../generated/graphql";
import { createUrqlClient } from "../../../../utils/createUrqlClient";

const Edit = () => {
  const router = useRouter();
  const { action, skillId } = router.query;
  let { id } = router.query;
  if (!id) {
    id = router.asPath.split("id=")[1];
  }
  const [{ data: dataMe, fetching: fetchingMe }] = useMeQuery();

  const [{ data, fetching }] = useWorkerByIdQuery({
    variables: { workerByIdId: id as string },
  });
  const [{ data: skill, fetching: fetchingS }] = useGetSkillQuery({
    variables: { skillId: skillId as string },
  });
  const imgSrc = data?.workerById?.profilePicture as string;
  const suffix = "?random=".concat(new Date().toString());
  const newImgSrc = imgSrc?.concat(suffix);
  useEffect(() => {
    if ((!fetchingMe && !dataMe?.me) || (dataMe?.me?.id !== id && !fetching)) {
      router.replace("/");
    }
  }, [fetching, fetchingMe, dataMe, router]);
  if (!skill || !data) {
    return <Box>404 not found</Box>;
  }
  return (
    <Layout>
      <Box py={12}>
        <Flex bg="white" mx={"auto"} w={{ base: "100%", xl: 1400 }}>
          <SideBar src={newImgSrc} worker={data.workerById} action={action} />
          <EditSkill skill={skill.getSkill} worker={data.workerById} />
        </Flex>
      </Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Edit);
