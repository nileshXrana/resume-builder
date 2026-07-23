import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ResumeStepper from '@/components/ResumeStepper/ResumeStepper';
import styles from './ResumeDialog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addResumes, setCurrentResume } from '@/redux/features/resumeSlice';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.user.currentUser);
    const currentResume = useSelector((state: any) => state.resume.currentResume);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(setCurrentResume(null));
        setOpen(false);
    };

    const handleSave = () => {
        dispatch(addResumes({
            docId: Math.random().toString(36).substr(2, 9),
            ownerEmail: currentUser?.email || 'anonymous',
            title: currentResume?.step1?.firstName 
              ? `${currentResume.step1.firstName}'s Resume`
              : `Resume ${new Date().toLocaleDateString()}`,
            createdAt: Date.now(),
            data: currentResume || {}
        }));
        dispatch(setCurrentResume(null));
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Build Your Resume
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box className={styles.stepperContainer}>
                    <ResumeStepper />
                </Box>
            </Dialog>
        </React.Fragment>
    );
}

