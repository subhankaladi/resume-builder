'use client';

import { motion } from 'framer-motion';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa: string;
  }>;
  skills: string[];
}

interface BaseTemplateProps {
  className?: string;
  children?: React.ReactNode;
}

export default function BaseTemplate({ className = '', children }: BaseTemplateProps) {
  return (
    <motion.div
      id="resume-preview"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white shadow-lg rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  );
} 