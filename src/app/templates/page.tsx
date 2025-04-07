'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';

const sampleData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with a passion for creating elegant solutions to complex problems. Skilled in full-stack development and modern web technologies.'
  },
  experience: [
    {
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      startDate: '2020',
      endDate: 'Present',
      description: 'Led development of multiple web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.'
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      graduationDate: '2019',
      gpa: '3.8'
    }
  ],
  skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker']
};

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A clean and contemporary design focused on readability',
    component: ModernTemplate
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A traditional layout perfect for corporate positions',
    component: ProfessionalTemplate
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold and artistic design for creative industries',
    component: CreativeTemplate
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'A distraction-free design that emphasizes content',
    component: MinimalTemplate
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'A sophisticated design with refined typography',
    component: ElegantTemplate
  }
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
          <p className="text-xl text-gray-600">Select a template that best represents your professional style</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                selectedTemplate === template.id ? 'ring-4 ring-indigo-500' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="bg-white p-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="aspect-[1/1] bg-gray-100 rounded-lg overflow-hidden">
                  <div className="scale-[0.4] origin-top-left transform-gpu">
                    <template.component data={sampleData} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={selectedTemplate ? `/builder?template=${selectedTemplate}` : '#'}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
              selectedTemplate
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedTemplate ? 'Continue with Selected Template' : 'Please Select a Template'}
          </Link>
        </div>
      </div>
    </div>
  );
} 