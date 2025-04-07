'use client';

import BaseTemplate, { ResumeData } from './BaseTemplate';

interface CreativeTemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <BaseTemplate data={data} className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500 rounded-full opacity-20"></div>
        <div className="relative z-10">
          {/* <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 h-12 mb-4"></div> */}
          <h1 className="text-4xl font-bold text-gray-900">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="mt-4 space-y-2 text-gray-700">
            <p className="flex items-center">
              <span className="w-5 h-5 mr-2 flex items-center justify-center text-purple-600">✉</span>
              {data.personalInfo.email || 'email@example.com'}
            </p>
            <p className="flex items-center">
              <span className="w-5 h-5 mr-2 flex items-center justify-center text-purple-600">📱</span>
              {data.personalInfo.phone || '(123) 456-7890'}
            </p>
            <p className="flex items-center">
              <span className="w-5 h-5 mr-2 flex items-center justify-center text-purple-600">📍</span>
              {data.personalInfo.location || 'City, State'}
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-purple-600 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                    <p className="text-purple-600">{exp.company || 'Company'}</p>
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.school || 'School Name'}</h3>
                    <p className="text-purple-600">{edu.degree || 'Degree'} in {edu.field || 'Field of Study'}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.graduationDate || 'Graduation Date'}
                  </div>
                </div>
                {edu.gpa && (
                  <div className="mt-2 text-gray-700">
                    <span className="font-medium">GPA:</span> {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            >
              <span className="text-white font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </BaseTemplate>
  );
} 