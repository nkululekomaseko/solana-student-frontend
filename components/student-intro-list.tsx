'use client';

import React, { useEffect, useState } from 'react';
import { StudentIntro } from '@/app/models/StudentIntro';
import StudentInfoCard from './student-intro-card';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { MoveIcon } from 'lucide-react';

const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf';

const StudentInfoList = () => {
  const { connection } = useConnection();
  const [students, setStudents] = useState<Array<StudentIntro>>([]);

  useEffect(() => {
    connection
      .getProgramAccounts(new PublicKey(STUDENT_INTRO_PROGRAM_ID))
      .then(async (accounts) => {
        const studentIntros: Array<StudentIntro> = accounts
          .map(({ account }) => StudentIntro.deserialize(account.data))
          .filter(
            (account) => !!account && account?.name === 'Nkululeko Maseko'
          );

        setStudents(studentIntros);
      });
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
