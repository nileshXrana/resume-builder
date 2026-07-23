import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './ResumeStepper.module.css';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm, useFieldArray, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentResume } from '@/redux/features/resumeSlice';
import ResumePreview from '../ResumePreview/ResumePreview';

type Inputs = {
    // Header (Step 0)
    firstName: string;
    surname: string;
    city: string;
    country: string;
    pincode: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;

    // Summary (Step 1)
    summary: string;

    // Experience (Step 2)
    jobTitle: string;
    employer: string;
    expCity: string;
    expCountry: string;
    expStartDate: string;
    expEndDate: string;

    // Projects (Step 3)
    projectTitle: string;
    projectDescription: string;
    projectLink: string;

    // Skills (Step 4)
    skills: string;

    // Education (Step 5)
    schoolName: string;
    degree: string;
    eduCity: string;
    eduCountry: string;
    eduStartDate: string;
    eduEndDate: string;
};


const steps = ['Header', 'Summary', 'Experience', 'Projects', 'Skills', 'Education'];

export default function ResumeStepper() {
    const dispatch = useDispatch();
    const currentResume = useSelector((state: any) => state.resume.currentResume);

    const [activeStep, setActiveStep] = React.useState(0);

    const [experience, setExperience] = React.useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        values: currentResume ? {
            ...currentResume.step1,
            ...currentResume.step2,
            ...currentResume.step3,
            ...currentResume.step4,
            ...currentResume.step5,
            ...currentResume.step6,
        } : undefined
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const stepKey = `step${activeStep + 1}`;
        // save multiple data in experience, projects and education steps
        if (activeStep === 2) {
            const experience = currentResume?.[stepKey] || [];
            dispatch(setCurrentResume({
                ...currentResume,
                [stepKey]: [...experience, data]
            }));
        } else if (activeStep === 3) {
            const projects = currentResume?.[stepKey] || [];
            dispatch(setCurrentResume({
                ...currentResume,
                [stepKey]: [...projects, data]
            }));
        } else if (activeStep === 5) {
            const education = currentResume?.[stepKey] || [];
            dispatch(setCurrentResume({
                ...currentResume,
                [stepKey]: [...education, data]
            }));
        }
        else {
            dispatch(setCurrentResume({
                ...currentResume,
                [stepKey]: data
            }));
        }
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton
                            aria-controls="stepper-content"
                            color="inherit"
                            onClick={handleStep(index)}
                        >
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box id="stepper-content" className={styles.stepperContent}>
                <Box className={styles.formandpreviewContainer}>
                    <Box className={styles.formContainer}>
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            {activeStep === 0 && (
                                <>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>First Name</Typography>
                                        <Input {...register('firstName', { required: true })} type="text" placeholder="Nilesh" error={!!errors.firstName} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Surname</Typography>
                                        <Input {...register('surname', { required: true })} type="text" placeholder="Rana" error={!!errors.surname} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>City</Typography>
                                        <Input {...register('city', { required: true })} type="text" placeholder="Dehradun" error={!!errors.city} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Country</Typography>
                                        <Input {...register('country', { required: true })} type="text" placeholder="India" error={!!errors.country} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Pincode</Typography>
                                        <Input {...register('pincode', { required: true })} type="text" placeholder="248003" error={!!errors.pincode} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Phone</Typography>
                                        <Input {...register('phone', { required: true })} type="text" placeholder="+91 6383728372" error={!!errors.phone} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Email</Typography>
                                        <Input {...register('email', { required: true })} type="email" placeholder="nilesh@email.com" error={!!errors.email} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>LinkedIn</Typography>
                                        <Input {...register('linkedin')} type="text" placeholder="LinkedIn profile URL" />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>GitHub</Typography>
                                        <Input {...register('github')} type="text" placeholder="GitHub profile URL" />
                                    </FormControl>
                                </>
                            )}

                            {activeStep === 1 && (
                                <FormControl className={styles.formGroup}>
                                    <Typography variant="body2" className={styles.formLabel}>Summary</Typography>
                                    <Input multiline {...register('summary', { required: true })} type="text" placeholder="A summary of your professional experience and skills" error={!!errors.summary} />
                                </FormControl>
                            )}

                            {activeStep === 2 && (
                                <>

                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Job Title</Typography>
                                        <Input {...register('jobTitle', { required: true })} type="text" placeholder="Software Engineer" error={!!errors.jobTitle} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Employer</Typography>
                                        <Input {...register('employer', { required: true })} type="text" placeholder="Google" error={!!errors.employer} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>City</Typography>
                                        <Input {...register('expCity', { required: true })} type="text" placeholder="Dehradun" error={!!errors.expCity} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Country</Typography>
                                        <Input {...register('expCountry', { required: true })} type="text" placeholder="India" error={!!errors.expCountry} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Start Date</Typography>
                                        <Input {...register('expStartDate', { required: true })} type="text" placeholder="MM/YYYY" error={!!errors.expStartDate} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>End Date</Typography>
                                        <Input {...register('expEndDate', { required: true })} type="text" placeholder="MM/YYYY or Present" error={!!errors.expEndDate} />
                                    </FormControl>

                                </>
                            )}


                            {activeStep === 3 && (

                                <>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Project Title</Typography>
                                        <Input {...register('projectTitle', { required: true })} type="text" placeholder="Resume Builder" error={!!errors.projectTitle} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Description</Typography>
                                        <Input {...register('projectDescription', { required: true })} type="text" placeholder="A web app built with Next.js and Redux" error={!!errors.projectDescription} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Project Link</Typography>
                                        <Input {...register('projectLink')} type="text" placeholder="https://github.com/username/project" />
                                    </FormControl>
                                </>

                            )}

                            {activeStep === 4 && (
                                <FormControl className={styles.formGroup}>
                                    <Typography variant="body2" className={styles.formLabel}>Skills</Typography>
                                    <Input {...register('skills', { required: true })} type="text" placeholder="React, Next.js, Redux, TypeScript" error={!!errors.skills} />
                                </FormControl>
                            )}

                            {activeStep === 5 && (
                                <>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>School Name</Typography>
                                        <Input {...register('schoolName', { required: true })} type="text" placeholder="Uttarakhand Technical University" error={!!errors.schoolName} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Degree</Typography>
                                        <Input {...register('degree', { required: true })} type="text" placeholder="B.Tech in Computer Science" error={!!errors.degree} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>City</Typography>
                                        <Input {...register('eduCity', { required: true })} type="text" placeholder="Dehradun" error={!!errors.eduCity} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Country</Typography>
                                        <Input {...register('eduCountry', { required: true })} type="text" placeholder="India" error={!!errors.eduCountry} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>Start Date</Typography>
                                        <Input {...register('eduStartDate', { required: true })} type="text" placeholder="MM/YYYY" error={!!errors.eduStartDate} />
                                    </FormControl>
                                    <FormControl className={styles.formGroup}>
                                        <Typography variant="body2" className={styles.formLabel}>End Date</Typography>
                                        <Input {...register('eduEndDate', { required: true })} type="text" placeholder="MM/YYYY" error={!!errors.eduEndDate} />
                                    </FormControl>
                                </>
                            )}

                            <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
                                Preview
                            </Button>
                        </form>
                    </Box>
                    <Box className={styles.previewContainer}>
                        <ResumePreview />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
