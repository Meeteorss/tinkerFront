import { Box } from "@chakra-ui/layout"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import React, { useRef, useEffect } from "react"
import { Layout } from "../../../../components/Layout"
import { EditUserDetails } from "../../../../components/UserDetails/EditUserDetails"
import { useMeQuery, useUploadProfilePictureMutation, useAddProfilePictureMutation, useWorkerByIdQuery } from
"../../../../generated/graphql"
import { createUrqlClient } from "../../../../utils/createUrqlClient"

const Edit = () => {
    const router = useRouter()
    let {id} = router.query
    if(!id){
    id=router.asPath.split('profile/')[1].replace("?","")
    }
    const [{data : dataMe,fetching}] = useMeQuery()
    const [{data}] = useWorkerByIdQuery({variables: {workerByIdId:id as string}})
    useEffect(() => {
    if(fetching){}
    else if(!dataMe?.me || dataMe.me.id !== id){
    router.push("/")
    }
    })
    if(!data){
        return(
            <Box>
                404 not found
            </Box>
        )
    }
    return (
        <Layout>
            <EditUserDetails worker={data.workerById}/>
        </Layout>
    )
}
export default withUrqlClient(createUrqlClient,{ssr:false})(Edit)