import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import styles from './TemplateDialog.module.css'
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setCurrentResume } from '@/redux/features/resumeSlice';

export interface SimpleDialogProps {
  open: boolean;
  selectedTemplate: string;
  onClose: (value: string) => void;
  openResumeDialog: boolean;
  setOpenResumeDialog: (open: boolean) => void;
}

function TemplateDialog(props: SimpleDialogProps) {
  const { onClose, selectedTemplate, open } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(selectedTemplate);
  };

  const handleTemplate = (value: string) => {
    dispatch(setCurrentResume({
      template: value,
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      step5: null,
      step6: null,
    }));
    props.setOpenResumeDialog(true);

    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} className={styles.dialog}>
      <DialogTitle className={styles.dialogTitle}>Select template for your resume</DialogTitle>
      <Box className={styles.serialContainer}>
        <Typography variant="body1" className={styles.serial}>
          1
        </Typography>
        <Typography variant="body1" className={styles.serial}>
          2
        </Typography>
        <Typography variant="body1" className={styles.serial}>
          3
        </Typography>
      </Box>
      <Box className={styles.templateContainer}>
        <Box className={styles.templateCard} onClick={() => handleTemplate('template1')}>
          <Image src="/template1.webp" alt="Template 1" fill />
        </Box>
        <Box className={styles.templateCard} onClick={() => handleTemplate('template2')}>
          <Image src="/template2.jpg" alt="Template 2" fill />
          <Typography variant="h6">Template 2</Typography>
        </Box>
        <Box className={styles.templateCard} onClick={() => handleTemplate('template3')}>
          <Image src="/template3.webp" alt="Template 3" fill />
          <Typography variant="h6">Template 3</Typography>
        </Box>
      </Box>
    </Dialog>
  );
}

export default function TemplateDialogDemo({ openResumeDialog, setOpenResumeDialog }: { openResumeDialog: boolean; setOpenResumeDialog: (open: boolean) => void }) {
  const [open, setOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedTemplate(value);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        className={styles.createButton}
        disableElevation
        onClick={handleClickOpen}
      >
        Create Resume
      </Button>
      <TemplateDialog
        selectedTemplate={selectedTemplate}
        open={open}
        onClose={handleClose}
        openResumeDialog={openResumeDialog}
        setOpenResumeDialog={setOpenResumeDialog}
      />
    </div>
  );
}
