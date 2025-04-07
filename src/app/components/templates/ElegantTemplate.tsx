'use client';

import BaseTemplate, { ResumeData } from './BaseTemplate';

interface ElegantTemplateProps {
  data: ResumeData;
}

export default function ElegantTemplate({ data }: ElegantTemplateProps) {
  return (
    <BaseTemplate data={data} className="p-8 max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="mb-12 border-b-2 border-gray-200 pb-8">
        <h1 className="text-4xl font-serif text-gray-900 mb-4">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium mb-1">Email</p>
            <p>{data.personalInfo.email || 'email@example.com'}</p>
          </div>
          <div>
            <p className="font-medium mb-1">Phone</p>
            <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
          </div>
          <div>
            <p className="font-medium mb-1">Location</p>
            <p>{data.personalInfo.location || 'City, State'}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-12">
          <h2 className="text-xl font-serif text-gray-900 mb-4">Professional Profile</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-serif text-gray-900 mb-6">Professional Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-gray-600 italic">{exp.company || 'Company'}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                  </div>
                </div>
                <p className="text-gray-700">{exp.description || 'Description of your role and achievements'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-serif text-gray-900 mb-6">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{edu.school || 'School Name'}</h3>
                    <p className="text-gray-600 italic">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.graduationDate || 'Graduation Date'}
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-serif text-gray-900 mb-4">Core Competencies</h2>
          <div className="grid grid-cols-3 gap-4">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="p-2 bg-gray-50 text-gray-700 text-center rounded"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseTemplate>
  );
} 