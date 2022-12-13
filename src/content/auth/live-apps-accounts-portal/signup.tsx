import { useFormik } from 'formik';
import { useState } from 'react';
import { CONFIG_TYPE, CustomButton, CustomCard, RecursiveContainer } from "src/components";
import { liveAppsAccountsPortalSignupSchema } from 'src/schema';

export const SignupPortalContent: React.FC = () => {

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (data) => {
        console.log(data);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        onSubmit: handleSubmit,
        validationSchema: liveAppsAccountsPortalSignupSchema
    })

    const config: CONFIG_TYPE = [
        {
            name: 'name',
            label: 'Name'
        },
        {
            name: 'email',
            type: 'email',
            label: 'Live Apps Email'
        }
    ]

    return (
        <CustomCard>
            <form onSubmit={formik.handleSubmit}>
                <RecursiveContainer 
                    config={config} 
                    validationSchema={liveAppsAccountsPortalSignupSchema} 
                    formik={formik} 
                />
                <CustomButton loading={submitting} type='submit'>Signup with Live Apps</CustomButton>
            </form>
        </CustomCard>
    )
}