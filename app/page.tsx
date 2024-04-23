'use client';

import BalanceDisplay from '@/components/balance-display';
import MainNav from '@/components/main-nav';
import { StudentIntroForm } from '@/components/student-intro-form';
import StudentInfoList from '@/components/student-intro-list';
import WalletContextProvider from '@/components/wallet-context-provider';

export default function Home() {
  return (
    <WalletContextProvider>
      <MainNav />
      <main className="flex flex-col items-center px-8 py-24">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Solana dAPP
        </h2>
        <BalanceDisplay />
        <StudentIntroForm />
        <StudentInfoList />
      </main>
    </WalletContextProvider>
  );
}
