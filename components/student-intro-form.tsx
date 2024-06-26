'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Loader2 } from 'lucide-react';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from './ui/textarea';
import { StudentIntro } from '@/app/models/StudentIntro';
import dynamic from 'next/dynamic';

const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf';

const formSchema = z.object({
  name: z.string().min(1, 'Must not be empty'),
  message: z.string().min(1, 'Must not be empty'),
});

type formSchemaType = z.infer<typeof formSchema>;

const StudentIntroForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState('');
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      message: '',
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    const studentIntro = new StudentIntro(values.name, values.message);

    console.log(`Student Intro: ${JSON.stringify(values, null, 2)}`);

    setTxSignature('');

    if (!connection || !publicKey) {
      return;
    }

    const buffer = studentIntro.serialize();
    const transaction = new Transaction();

    const [pda] = PublicKey.findProgramAddressSync(
      [publicKey.toBuffer()],
      new PublicKey(STUDENT_INTRO_PROGRAM_ID)
    );

    console.log('pda: ', pda.toBase58());

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        { pubkey: pda, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      data: buffer,
      programId: new PublicKey(STUDENT_INTRO_PROGRAM_ID),
    });

    transaction.add(instruction);

    setLoading(true);
    try {
      let transactionId = await sendTransaction(transaction, connection);
      setTxSignature(transactionId);
      toast.success('Transaction submitted successful');
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${transactionId}?cluster=devnet`
      );
    } catch (error: any) {
      console.log(
        `Error submitting transaction`,
        JSON.stringify(error, null, 2)
      );
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full sm:w-4/5 md:w-3/5 xl:1/5">
      <CardHeader>
        <CardTitle>Introduce Yourself.</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-center flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do we call you?</FormLabel>
                  <FormControl>
                    <Input className="text-center" type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What brings you to Solana, friend?</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center space-y-4">
              <Button className="w-1/2" disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
              {!!txSignature && (
                <Button variant="link" asChild>
                  <a
                    href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Latest transaction link
                  </a>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const getValidSolanaAddress = async (
  addr: string
): Promise<PublicKey | null> => {
  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(addr);
    if (PublicKey.isOnCurve(publicKey.toBytes())) {
      return publicKey;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export { StudentIntroForm };
