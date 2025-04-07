'use client';

import BaseTemplate, { ResumeData } from './BaseTemplate';

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  return (
    <BaseTemplate data={data} className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light text-gray-900 mb-4">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <p>{data.personalInfo.email || 'email@example.com'}</p>
          <p>{data.personalInfo.phone || '(123) 456-7890'}</p>
          <p>{data.personalInfo.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-lg font-normal text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-gray-600">{exp.company || 'Company'}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{exp.description || 'Description of your role and achievements'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-normal text-gray-900">{edu.school || 'School Name'}</h3>
                    <p className="text-gray-600">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.graduationDate || 'Graduation Date'}
                  </div>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-700 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm text-gray-700"
              >
                {skill}{index < data.skills.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseTemplate>
  );
} 