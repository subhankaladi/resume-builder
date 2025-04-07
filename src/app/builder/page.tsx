'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ModernTemplate from '../components/templates/ModernTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import { generatePDF } from '../utils/pdfGenerator';
import { ResumeData } from '../components/templates/BaseTemplate';

const templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate
};

export default function BuilderPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template') || 'modern';
  const TemplateComponent = templates[templateId as keyof typeof templates] || ModernTemplate;

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section: 'experience' | 'education', index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (section: 'experience' | 'education') => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const removeItem = (section: 'experience' | 'education', index: number) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleDownload = async () => {
    const fileName = resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`
      : 'resume.pdf';
    
    await generatePDF('resume-preview', fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                  placeholder="Enter your location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                <textarea
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                  placeholder="Enter your professional summary"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Experience</h2>
            {resumeData.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-6 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                  <button
                    onClick={() => removeItem('experience', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => handleArrayInputChange('experience', index, 'position', e.target.value)}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                      placeholder="Enter position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => handleArrayInputChange('experience', index, 'company', e.target.value)}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate || ''}
                        onChange={(e) => handleArrayInputChange('experience', index, 'startDate', e.target.value)}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                        placeholder="Start date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate || ''}
                        onChange={(e) => handleArrayInputChange('experience', index, 'endDate', e.target.value)}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                        placeholder="End date"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => handleArrayInputChange('experience', index, 'description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                      placeholder="Enter job description"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('experience')}
              className="mt-4 inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Add Experience
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Education</h2>
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="mb-6 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Education {index + 1}</h3>
                  <button
                    onClick={() => removeItem('education', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                    <input
                      type="text"
                      value={edu.school || ''}
                      onChange={(e) => handleArrayInputChange('education', index, 'school', e.target.value)}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                      placeholder="Enter school/college/university name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Education Level</label>
                    <select
                      value={edu.level || 'school'}
                      onChange={(e) => handleArrayInputChange('education', index, 'level', e.target.value)}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                    >
                      <option value="school">School</option>
                      <option value="college">College</option>
                      <option value="university">University</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree/Certificate</label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleArrayInputChange('education', index, 'degree', e.target.value)}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                      placeholder="Enter degree or certificate name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field || ''}
                      onChange={(e) => handleArrayInputChange('education', index, 'field', e.target.value)}
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                      placeholder="Enter field of study"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
                      <input
                        type="text"
                        value={edu.graduationDate || ''}
                        onChange={(e) => handleArrayInputChange('education', index, 'graduationDate', e.target.value)}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                        placeholder="Graduation date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GPA/Percentage</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => handleArrayInputChange('education', index, 'gpa', e.target.value)}
                        className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                        placeholder="Enter GPA or percentage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItem('education')}
              className="mt-4 inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Add Education
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-6">Skills</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  className="flex-1 rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors duration-200 p-2"
                  placeholder="Add a skill"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-200 transition-colors duration-200"
                  >
                    <span className="text-center">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="text-indigo-500 hover:text-indigo-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border-2 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                disabled={!resumeData.personalInfo.fullName}
              >
                Download PDF
              </button>
            </div>
            <div id="resume-preview" className="border-2 rounded-lg overflow-hidden">
              <TemplateComponent data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}