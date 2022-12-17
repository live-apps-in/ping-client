import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CONFIG_TYPE, CustomButton, CustomCard, CustomText, RecursiveContainer } from "src/components";
import { authConfig } from 'src/config';
import { useLiveAppsAuth } from 'src/hooks';
import { liveAppsAccountsPortalSigninSchema } from 'src/schema';
import { getSearchQuery, handleError } from 'src/utils';

export const LoginPortalContent: React.FC = () => {

    const [submitting, setSubmitting] = useState(false);
    const { search } = useLocation();
    const searchQuery = getSearchQuery(search);
    const navigate = useNavigate();
    const { login } = useLiveAppsAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!searchQuery?.redirectUrl) {
            setError('Redirect Url is required in search query');
        }
    }, [searchQuery]);

    const handleSubmit = async (details) => {
        setSubmitting(true);
        try {
            const data = await login(details);
            window.flash({ message: 'OTP sent successfully' });
            const navigateUrl = `${authConfig.liveAppsTwoFactorAuthenticationPage.replace(':email', details.email)}${search}`;
            navigate(navigateUrl);
            console.log(data);
        } catch(err) {
            handleError(err);
        }
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: handleSubmit,
        validationSchema: liveAppsAccountsPortalSigninSchema
    });

    const config: CONFIG_TYPE = [
        {
            name: 'email',
            type: 'email',
            label: 'Live-apps Email'
        }
    ];

    return (
        <CustomCard headerProps={{ title: 'Signin With Live Apps email' }}>
            {error ? 
                <CustomText variant='h3'>{error}</CustomText> 
                : <form onSubmit={formik.handleSubmit}>
                    <RecursiveContainer config={config} formik={formik} validationSchema={liveAppsAccountsPortalSigninSchema} />
                    <CustomButton type='submit' loading={submitting}>Signin with Live apps</CustomButton>
                    <CustomButton href={`${authConfig.liveAppsSignupPage}${search}`}>Signup with Live apps</CustomButton>
                </form>
            }
        </CustomCard>
    );
};