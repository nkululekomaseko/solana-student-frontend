import React, { FC } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { StudentIntro } from '@/app/models/StudentIntro';

const StudentInfoCard: FC<{ studentIntro: StudentIntro }> = ({
  studentIntro,
}) => {
  const { name, message } = studentIntro;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StudentInfoCard;
