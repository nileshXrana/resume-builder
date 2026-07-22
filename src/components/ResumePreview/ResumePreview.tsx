import styles from './ResumePreview.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ResumePreview() {

    const currentResume = useSelector((state: any) => state.resume.currentResume);

    return (
        <Box className={styles.resumeContainer}>
            <Box className={styles.heading}>
                <Typography variant="h3">{currentResume?.firstName} {currentResume?.lastName}</Typography>
                <Typography>{currentResume?.email}</Typography>
                <Typography>{currentResume?.phone}</Typography>
            </Box>

        </Box>
    );
}