// lib/dca.ts
import { ethers, Contract, Signer } from 'ethers';

// Replace with your actual contract address and ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
  [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
      ],
      name: 'addSupportedToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'fromToken',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'toToken',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'frequency',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'howManyTimes',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amountPerDay',
          type: 'uint256',
        },
      ],
      name: 'createInvestmentPlan',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'executeInvestmentPlan',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'initialOwner',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
      ],
      name: 'OwnableInvalidOwner',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'OwnableUnauthorizedAccount',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'InvestmentExecuted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'fromToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'toToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'frequency',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'howManyTimes',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountPerDay',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalInvestment',
          type: 'uint256',
        },
      ],
      name: 'InvestmentPlanCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'investmentPlans',
      outputs: [
        {
          internalType: 'address',
          name: 'fromToken',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'toToken',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'frequency',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'howManyTimes',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amountPerDay',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'totalInvestment',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lastExecutionTimestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'supportedTokens',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
];

let signer = null;

let provider;


export const getSigner = async (): Promise<Signer> => {
  // Add a type assertion to let TypeScript know 'ethereum' exists
  await(window as any).ethereum.enable();
  // const provider = new ethers.providers.Web3Provider( window.ethereum );
  const provider = new ethers.BrowserProvider(window.ethereum);

  // v5
  // provider.sendTransaction(signedTx);

  // v6
  // provider.broadcastTransaction(signedTx);
  return provider.getSigner();
};



export const getContract = (signer: Signer): Contract => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};