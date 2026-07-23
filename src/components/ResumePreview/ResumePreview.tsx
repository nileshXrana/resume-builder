import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import styles from './ResumePreview.module.css';

export default function ResumePreview() {
    const currentResume = useSelector((state: any) => state.resume.currentResume);

    const template = currentResume?.template || 'template1';
    
    // Choose theme color based on template
    let themeColor = '#1a73e8'; // Template 1: Slate Blue
    if (template === 'template2') {
        themeColor = '#202124'; // Template 2: Charcoal Dark
    } else if (template === 'template3') {
        themeColor = '#0f9d58'; // Template 3: Emerald Green
    }

    const { step1, step2, step3, step4, step5, step6 } = currentResume || {};

    return (
        <Box 
            className={styles.resumeContainer} 
            sx={{ 
                bgcolor: '#fff', 
                borderRadius: '4px', 
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                p: 0,
                minHeight: '600px'
            }}
        >
            {/* Header Section */}
            {step1 && (
                <Box sx={{ bgcolor: themeColor, color: '#fff', p: 3, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {step1.firstName || ''} {step1.surname || ''}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                        {step1.city && `${step1.city}, `}{step1.country || ''} {step1.pincode ? `(${step1.pincode})` : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', fontSize: '0.875rem', opacity: 0.9 }}>
                        {step1.phone && <span>📞 {step1.phone}</span>}
                        {step1.email && <span>✉️ {step1.email}</span>}
                        {step1.linkedin && <span>🔗 <a href={step1.linkedin} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>LinkedIn</a></span>}
                        {step1.github && <span>💻 <a href={step1.github} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>GitHub</a></span>}
                    </Box>
                </Box>
            )}

            <Box sx={{ p: 3 }}>
                {/* Summary Section */}
                {step2?.summary && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 600, mb: 1 }}>
                            Professional Summary
                        </Typography>
                        <Divider sx={{ mb: 1.5, borderColor: themeColor, borderBottomWidth: 2 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {step2.summary}
                        </Typography>
                    </Box>
                )}

                {/* Experience Section */}
                {step3 && (step3.jobTitle || step3.employer) && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 600, mb: 1 }}>
                            Work Experience
                        </Typography>
                        <Divider sx={{ mb: 1.5, borderColor: themeColor, borderBottomWidth: 2 }} />
                        <Box sx={{ mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    {step3.jobTitle}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {step3.expStartDate} - {step3.expEndDate}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                    {step3.employer}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {step3.expCity && `${step3.expCity}, `}{step3.expCountry}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* Projects Section */}
                {step4 && step4.projectTitle && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 600, mb: 1 }}>
                            Key Projects
                        </Typography>
                        <Divider sx={{ mb: 1.5, borderColor: themeColor, borderBottomWidth: 2 }} />
                        <Box sx={{ mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    {step4.projectTitle}
                                </Typography>
                                {step4.projectLink && (
                                    <Typography variant="caption">
                                        <a href={step4.projectLink} target="_blank" rel="noreferrer" style={{ color: themeColor, textDecoration: 'none' }}>
                                            Link 🔗
                                        </a>
                                    </Typography>
                                )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                {step4.projectDescription}
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* Skills Section */}
                {step5?.skills && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 600, mb: 1 }}>
                            Skills
                        </Typography>
                        <Divider sx={{ mb: 1.5, borderColor: themeColor, borderBottomWidth: 2 }} />
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {step5.skills.split(',').map((skill: string, idx: number) => {
                                const trimmed = skill.trim();
                                if (!trimmed) return null;
                                return (
                                    <Box 
                                        key={idx} 
                                        sx={{ 
                                            bgcolor: 'rgba(0, 0, 0, 0.05)', 
                                            color: '#333', 
                                            px: 1.5, 
                                            py: 0.5, 
                                            borderRadius: '16px', 
                                            fontSize: '0.75rem',
                                            fontWeight: 500
                                        }}
                                    >
                                        {trimmed}
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                )}

                {/* Education Section */}
                {step6 && (step6.schoolName || step6.degree) && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 600, mb: 1 }}>
                            Education
                        </Typography>
                        <Divider sx={{ mb: 1.5, borderColor: themeColor, borderBottomWidth: 2 }} />
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 0.5 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    {step6.degree}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {step6.eduStartDate} - {step6.eduEndDate}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                                    {step6.schoolName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {step6.eduCity && `${step6.eduCity}, `}{step6.eduCountry}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}