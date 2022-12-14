import { useFormik } from 'formik'
import { useState } from 'react'
import { CONFIG_TYPE, CustomButton, CustomCard, RecursiveContainer } from "src/components"
import { liveAppsAccountsPortalSigninSchema } from 'src/schema'

export const LoginPortalContent: React.FC = () => {

    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = (data) => {
        console.log(data);
    }

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: handleSubmit,
        validationSchema: liveAppsAccountsPortalSigninSchema
    })

    const config: CONFIG_TYPE = [
        {
            name: 'email',
            type: 'email',
            label: 'Live-apps Email'
        }
    ]

    return (
        <CustomCard headerProps={{ title: 'Signin With Live Apps email' }}>
            <form onSubmit={formik.handleSubmit}>
                <RecursiveContainer config={config} formik={formik} validationSchema={liveAppsAccountsPortalSigninSchema} />
                <CustomButton type='submit' loading={submitting}>Signin with Live apps</CustomButton>
            </form>
        </CustomCard>
    )
}