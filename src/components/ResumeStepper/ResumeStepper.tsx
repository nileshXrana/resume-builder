import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './ResumeStepper.module.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/redux/store';
import { setCurrentResume } from '@/redux/features/resumeSlice';
import ResumePreview from '../ResumePreview/ResumePreview';

type Inputs = {
    firstName: string;
    surname: string;
    city: string;
    country: string;
    pincode: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
};

const steps = ['Header', 'Summary', 'Experience', 'Projects', 'Skills', 'Education'];

export default function ResumeStepper() {

    const dispatch = useDispatch();
    const currentResume = useSelector((state: any) => state.resume.currentResume);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()



    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // save resume data to redux store for that step
        dispatch(setCurrentResume({
            ...currentResume,
            activeStep: data
        }));
        console.log(currentResume.activeStep);
    }

    const totalSteps = steps.length;
    const completedSteps = Object.keys(completed).length;
    const isLastStep = activeStep === totalSteps - 1;
    const allStepsCompleted = completedSteps === totalSteps;

    const handleNext = () => {
        const newActiveStep =
            isLastStep && !allStepsCompleted
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has not been completed
                steps.findIndex((_step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const resetButtonRef = React.useRef<HTMLButtonElement>(null);
    const nextButtonRef = React.useRef<HTMLButtonElement>(null);
    const previousActiveStepRef = React.useRef(activeStep);
    const previousCompletedRef = React.useRef(completed);

    // Manage focus when the completed steps change.
    React.useEffect(() => {
        const previousCompleted = previousCompletedRef.current;
        previousCompletedRef.current = completed;

        if (allStepsCompleted) {
            // If the user has completed all steps and hits "Finish", focus the "Reset" button.
            resetButtonRef.current!.focus();
            return;
        }

        if (
            Object.keys(completed).length === 0 &&
            Object.keys(previousCompleted).length !== 0
        ) {
            // If the user has completed all steps and hits "Reset", focus the "Next" button.
            nextButtonRef.current!.focus();
        }
    }, [completed, allStepsCompleted]);

    // Manage focus when the active step changes.
    React.useEffect(() => {
        if (activeStep === 0 && previousActiveStepRef.current === 1) {
            // If the user navigated to first step via "Back" button, focus the "Next" button.
            nextButtonRef.current!.focus();
        }

        previousActiveStepRef.current = activeStep;
    }, [activeStep]);

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
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
                {allStepsCompleted ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset} ref={resetButtonRef}>
                                Reset
                            </Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>

                        <Box className={styles.formandpreviewContainer}>

                            {activeStep === 0 && (
                                <Box className={styles.formContainer}>
                                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                First Name
                                            </Typography>
                                            <Input {...register('firstName', { required: true })} type="text" id="firstName" name="firstName" placeholder="Nilesh"
                                                aria-invalid={errors.firstName ? "true" : "false"} />
                                            {errors.firstName?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    First name is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Surname
                                            </Typography>
                                            <Input {...register('surname', { required: true })} type="text" id="surname" name="surname" placeholder="Rana"
                                                aria-invalid={errors.surname ? "true" : "false"} />
                                            {errors.surname?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Surname is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                City
                                            </Typography>
                                            <Input {...register('city', { required: true })} type="text" id="city" name="city" placeholder="Dehradun"
                                                aria-invalid={errors.city ? "true" : "false"} />
                                            {errors.city?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    City is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Country
                                            </Typography>
                                            <Input {...register('country', { required: true })} type="text" id="country" name="country" placeholder="India"
                                                aria-invalid={errors.country ? "true" : "false"} />
                                            {errors.country?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Country is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Pincode
                                            </Typography>
                                            <Input {...register('pincode', { required: true })} type="text" id="pincode" name="pincode" placeholder="248003"
                                                aria-invalid={errors.pincode ? "true" : "false"} />
                                            {errors.pincode?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Pincode is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Phone
                                            </Typography>
                                            <Input {...register('phone', { required: true })} type="text" id="phone" name="phone" placeholder="+91 6383728372"
                                                aria-invalid={errors.phone ? "true" : "false"} />
                                            {errors.phone?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Phone is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Email
                                            </Typography>
                                            <Input {...register('email', { required: true })} type="email" id="email" name="email" placeholder="nilesh@email.com"
                                                aria-invalid={errors.email ? "true" : "false"} />
                                            {errors.email?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Email is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                LinkedIn
                                            </Typography>
                                            <Input {...register('linkedin', { required: false })} type="text" id="linkedin" name="linkedin" placeholder="LinkedIn profile URL"
                                                aria-invalid={errors.linkedin ? "true" : "false"} />
                                            {errors.linkedin?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    LinkedIn is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                GitHub
                                            </Typography>
                                            <Input {...register('github', { required: false })} type="text" id="github" name="github" placeholder="GitHub profile URL" />
                                        </FormControl>

                                        <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>

                            )}

                            {activeStep === 1 && (
                                <Box className={styles.formContainer}>
                                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Summary
                                            </Typography>
                                            <Input {...register('firstName', { required: true })} type="text" id="firstName" name="firstName" placeholder="a summary of your professional experience and skills"
                                                aria-invalid={errors.firstName ? "true" : "false"} />
                                            {errors.firstName?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    First name is required
                                                </Typography>
                                            )}
                                        </FormControl>


                                        <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box className={styles.formContainer}>
                                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Job Title
                                            </Typography>
                                            <Input {...register('firstName', { required: true })} type="text" id="firstName" name="firstName" placeholder="job title here"
                                                aria-invalid={errors.firstName ? "true" : "false"} />
                                            {errors.firstName?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    First name is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Employer
                                            </Typography>
                                            <Input {...register('surname', { required: true })} type="text" id="surname" name="surname" placeholder="employer name here"
                                                aria-invalid={errors.surname ? "true" : "false"} />
                                            {errors.surname?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Surname is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                City
                                            </Typography>
                                            <Input {...register('city', { required: true })} type="text" id="city" name="city" placeholder="Dehradun"
                                                aria-invalid={errors.city ? "true" : "false"} />
                                            {errors.city?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    City is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Country
                                            </Typography>
                                            <Input {...register('country', { required: true })} type="text" id="country" name="country" placeholder="India"
                                                aria-invalid={errors.country ? "true" : "false"} />
                                            {errors.country?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Country is required
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl className={styles.formGroup}>
                                            <Typography variant="body2" className={styles.formLabel}>
                                                Start Date
                                            </Typography>
                                            <Input {...register('pincode', { required: true })} type="text" id="pincode" name="pincode" placeholder="02/05/2026"
                                                aria-invalid={errors.pincode ? "true" : "false"} />
                                            {errors.pincode?.type === "required" && (
                                                <Typography className={styles.error} role="alert">
                                                    Pincode is required
                                                </Typography>
                                            )}
                                        </FormControl>


                                        <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
                                            Save
                                        </Button>
                                    </form>
                                </Box>

                            )}

                            {/* preview of your resume */}
                            <Box className={styles.previewContainer}>
                                <ResumePreview />
                            </Box>

                        </Box>




                        <Box sx={{ display: 'flex', flexDirection: 'row', p: 2, mt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Prev
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }} ref={nextButtonRef}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps === totalSteps - 1 ? 'Finish' : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>


                    </React.Fragment>
                )}
            </Box>
        </Box>
    );
}
