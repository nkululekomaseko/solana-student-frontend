'use client';

import React, { useEffect, useState } from 'react';
import { StudentIntro } from '@/app/models/StudentIntro';
import StudentInfoCard from './student-intro-card';

const StudentInfoList = () => {
  const [students, setStudents] = useState<Array<StudentIntro>>([]);

  useEffect(() => {
    setStudents(StudentIntro.mocks);
  }, []);

  return (
    <div className="flex flex-col space-y-4 w-full sm:w-4/5 md:w-3/5 xl:1/5 py-8">
      <h1>Meet the students!</h1>
      {students.map((student: StudentIntro) => (
        <StudentInfoCard key={student.name} studentIntro={student} />
      ))}
    </div>
  );
};

export default StudentInfoList;
