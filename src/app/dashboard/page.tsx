"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Skeleton from "@mui/material/Skeleton";
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import styles from "./dashboard.module.css";
import { signOut } from "next-auth/react";
import TemplateDialog from "@/components/TemplateDialog/TemplateDialog";
import ResumeDialog from "@/components/ResumeDialog/ResumeDialog";

interface Doc {
  docId: string;
  ownerId: string;
  title: string;
  createdAt: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  const handleLogout = async () => {
    try {
      signOut();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateResume = async () => {
    // add new resume to docs

  }

  return (
    <Container className={styles.container} maxWidth="lg">
      <Box className={styles.header}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon sx={{ color: '#1a73e8', fontSize: 32 }} />
          <Typography variant="h5" className={styles.title}>
            Resume Builder
          </Typography>
        </Box>
        <Box className={styles.headerActions}>
          <TemplateDialog openResumeDialog={openResumeDialog} setOpenResumeDialog={setOpenResumeDialog} />
          <ResumeDialog open={openResumeDialog} setOpen={setOpenResumeDialog} />
        </Box>
      </Box>

      {docs.length === 0 ? (
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
          {docs.map((doc) => (
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
