import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CONFIG_TYPE, CustomButton, CustomCard, CustomText, RecursiveContainer } from "src/components";
import { authConfig } from 'src/config';
import { useLiveAppsAuth } from 'src/hooks';
import { liveAppsAccountsPortalSignupSchema } from 'src/schema';
import { appendSearchString, getSearchQuery, handleError } from 'src/utils';

export const SignupPortalContent: React.FC = () => {

    const [submitting, setSubmitting] = useState(false);
    const { search } = useLocation();
    const navigate = useNavigate();
    const searchQuery = getSearchQuery(search);
    const { signup } = useLiveAppsAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!searchQuery?.redirectUrl) {
            setError('Redirect Url is required in search query');
        }
    }, [searchQuery]);

    const handleSubmit = async (details) => {
        setSubmitting(true);
        try {
            await signup(details);
            window.flash({ message: 'OTP sent successfully' });
            const navigateUrl = `${authConfig.liveAppsTwoFactorAuthenticationPage.replace(':email', details.email)}${search}`;
            navigate(navigateUrl);
        } catch(err) {
            handleError(err);
        }
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: ''
        },
        onSubmit: handleSubmit,
        validationSchema: liveAppsAccountsPortalSignupSchema
    });

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
    ];

    return (
        <CustomCard>
            {error ? 
                <CustomText variant='h3'>{error}</CustomText> 
                : <form onSubmit={formik.handleSubmit}>
                    <RecursiveContainer 
                        config={config} 
                        validationSchema={liveAppsAccountsPortalSignupSchema} 
                        formik={formik} 
                    />
                    <CustomButton loading={submitting} type='submit'>Signup with Live Apps</CustomButton>
                    <CustomButton href={`${authConfig.liveAppsLoginPage}?${appendSearchString([
                        search, { signup: false }
                    ])}`}>Login with Live apps</CustomButton>
                </form>
            }
        </CustomCard>
    );
};