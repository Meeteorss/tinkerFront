import { Flex, Box, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import router, { useRouter } from 'next/router';
import React from 'react'
import { jobOptions } from '../../pages/worker/register';
import SelectField from './SelectField';



export const SearchField = ({}) => {
        const router = useRouter()
        return (
            <Formik initialValues={{ job: ""}} onSubmit={async (values) => {
                router.push({pathname:'/list/[category]' ,query: {category: values.job}})
              }}> 
                <Form>
                  <Flex>
                    
                    <Box rounded={"none"} w={"90%"}>
                    <Field  name="job" options={jobOptions} component={SelectField} placeholder="Select a job..." isMulti={false}/>
                    </Box>
                    
                    
                    <Button
                      maxW={"20"}
                      type={'submit'}
                      rounded={"md"}
                      size={'lsm'}
                      fontWeight={'normal'}
                      px={6}
                      bg={"black"}
                      color={"white"}
                      _hover={{bg:"blue.900"}}
                      >
                      Search
                    </Button>
                  </Flex>
                  
                </Form>
              
              </Formik>
        );
}
