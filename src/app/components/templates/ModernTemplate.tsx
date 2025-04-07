'use client';

import BaseTemplate, { ResumeData } from './BaseTemplate';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  return (
    <BaseTemplate  className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-blue-500 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="mt-2 text-gray-600 flex flex-wrap gap-2">
          <p>{data.personalInfo.email || 'email@example.com'}</p>
          <span className="text-gray-400">|</span>
          <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
          <span className="text-gray-400">|</span>
          <p>{data.personalInfo.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
          <p className="text-gray-600">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position || 'Position'}</h3>
                  <p className="text-gray-600">{exp.company || 'Company'}</p>
                </div>
                <div className="text-gray-500 text-sm">
                  {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{exp.description || 'Description of your role and achievements'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.school || 'School Name'}</h3>
                  <p className="text-gray-600">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</p>
                </div>
                <div className="text-gray-500 text-sm">
                  {edu.graduationDate || 'Graduation Date'}
                </div>
              </div>
              {edu.gpa && <p className="text-gray-600 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseTemplate>
  );
} 