"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Skeleton from "@mui/material/Skeleton";
import DescriptionIcon from '@mui/icons-material/Description';
import styles from "./dashboard.module.css";
import TemplateDialog from "@/components/TemplateDialog/TemplateDialog";
import ResumeDialog from "@/components/ResumeDialog/ResumeDialog";
import { logoutUser } from "@/redux/features/userSlice";
import { Resume } from "@/redux/features/resumeSlice";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  const currentUser = useSelector((state: any) => state.user.currentUser);
  const resumes = useSelector((state: any) => state.resume.resumes);

  useEffect(() => {
    if (!currentUser) {
      router.push("/signin");
    }
  }, [currentUser, router]);

  const userResumes = resumes.filter((resume: Resume) => resume.ownerEmail === currentUser?.email);

  const handleLogout = () => {
    signOut();
  };

  if (!currentUser) {
    return null; // Avoid flicker before redirecting
  }

  return (
    <Container className={styles.container} maxWidth="lg">
      <Box className={styles.header}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon sx={{ color: '#1a73e8', fontSize: 32 }} />
          <Typography variant="h5" className={styles.title}>
            Resume Builder - {currentUser.email}
          </Typography>
        </Box>
        <Box className={styles.headerActions} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TemplateDialog openResumeDialog={openResumeDialog} setOpenResumeDialog={setOpenResumeDialog} />
          <ResumeDialog open={openResumeDialog} setOpen={setOpenResumeDialog} />
          <Button variant="outlined" color="error" onClick={handleLogout} size="small" sx={{ textTransform: 'none' }}>
            Logout
          </Button>
        </Box>
      </Box>

      {userResumes.length === 0 ? (
        <Box className={styles.emptyState}>
          <DescriptionIcon sx={{ fontSize: 80, color: '#dadce0', marginBottom: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#3c4043', marginBottom: 1 }}>
            No resume added yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3 }}>
            Create a new resume now !
          </Typography>
        </Box>
      ) : (
        <Box className={styles.docGrid}>
          {userResumes.map((doc: Resume) => (
            <Card key={doc.docId} className={styles.docCard} variant="outlined">
              <CardActionArea onClick={() => router.push(`/editor/${doc.docId}`)}>
                <Box className={styles.docThumbnail}>
                  <Skeleton variant="text" width="40%" height={20} animation={false} sx={{ bgcolor: 'rgba(0,0,0,0.06)' }} />
                  <Skeleton variant="rectangular" width="75%" height={8} animation={false} sx={{ bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '4px' }} />
                  <Skeleton variant="rectangular" width="85%" height={8} animation={false} sx={{ bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '4px' }} />
                  <Skeleton variant="rectangular" width="60%" height={8} animation={false} sx={{ bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '4px' }} />
                </Box>
                <CardContent className={styles.docContent}>
                  <Typography variant="subtitle1" noWrap className={styles.docTitle}>
                    {doc.title}
                  </Typography>
                  <Box className={styles.docFooter}>
                    <DescriptionIcon sx={{ color: '#1a73e8', fontSize: 16 }} />
                    <Typography variant="body2" className={styles.docDate}>
                      {new Date(doc.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
