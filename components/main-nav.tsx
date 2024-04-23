'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

const MainNav = () => {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
  );

  return (
    <header>
      <nav className="sticky top-0 flex flex-col justify-between space-y-2 lg:flex-row lg:space-y-0 md:flex-row md:space-y-0 sm:flex-row sm:space-y-0 items-center h-16 w-full p-4">
        <Image src="/solanaLogo.png" width={200} height={20} alt="logo" />
        <WalletMultiButtonDynamic />
      </nav>
    </header>
  );
};

export default MainNav;
