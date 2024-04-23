import { SystemInstruction } from '@solana/web3.js';
import * as borsh from '@coral-xyz/borsh';

export class StudentIntro {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }

  static mocks: Array<StudentIntro> = [
    new StudentIntro(
      'Elizabeth Holmes',
      'Learning Solana so I can use it to build sick NFT projects.'
    ),
    new StudentIntro(
      'Jack Nicholson',
      "I want to overhaul the world's financial SystemInstruction. Lower friction payments/transfer, lower fees, faster payouts, better collaterization for loans, etc."
    ),
    new StudentIntro('Terminator', "I'm basically here to protect"),
  ];
}
