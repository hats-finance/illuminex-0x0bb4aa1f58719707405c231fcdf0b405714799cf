# **illuminex Audit Competition on Hats.finance** 


## Introduction to Hats.finance


Hats.finance builds autonomous security infrastructure for integration with major DeFi protocols to secure users' assets. 
It aims to be the decentralized choice for Web3 security, offering proactive security mechanisms like decentralized audit competitions and bug bounties. 
The protocol facilitates audit competitions to quickly secure smart contracts by having auditors compete, thereby reducing auditing costs and accelerating submissions. 
This aligns with their mission of fostering a robust, secure, and scalable Web3 ecosystem through decentralized security solutions​.

## About Hats Audit Competition


Hats Audit Competitions offer a unique and decentralized approach to enhancing the security of web3 projects. Leveraging the large collective expertise of hundreds of skilled auditors, these competitions foster a proactive bug hunting environment to fortify projects before their launch. Unlike traditional security assessments, Hats Audit Competitions operate on a time-based and results-driven model, ensuring that only successful auditors are rewarded for their contributions. This pay-for-results ethos not only allocates budgets more efficiently by paying exclusively for identified vulnerabilities but also retains funds if no issues are discovered. With a streamlined evaluation process, Hats prioritizes quality over quantity by rewarding the first submitter of a vulnerability, thus eliminating duplicate efforts and attracting top talent in web3 auditing. The process embodies Hats Finance's commitment to reducing fees, maintaining project control, and promoting high-quality security assessments, setting a new standard for decentralized security in the web3 space​​.

## illuminex Overview

Cross-chain privacy wallet with private swaps integrated

## Competition Details


- Type: A public audit competition hosted by illuminex
- Duration: 2 weeks
- Maximum Reward: $35,191.62
- Submissions: 101
- Total Payout: $13,605.08 distributed among 5 participants.

## Scope of Audit

## Project overview

xEngine is implementing a lightweight Bitcoin node and 2/2 multisig wallet inside Oasis Sapphire smart contract.

Every deposit (Bitcoin input for outgoing withdrawal transaction) is a P2SH vault which must be signed by the smart contract (private key is unique for every deposit and stored in the confidential state) and the off-chain signer. This dual system is required to avoid SGX-related risks, but at the same time not allow the off-chain signer to have enough control over the vaults.
## Audit competition scope

The whole repo with the smart contracts code located at packages/contracts.

## Medium severity issues


- **Fixed Batching Interval and Transfer Limit May Cause Congestion in OutgoingQueue Contract**

  The `OutgoingQueue` contract employs a batching mechanism for outgoing transfers with a fixed `batchingInterval` of 15 minutes. This interval determines how often batches of transfers can be processed and is not adjustable within the current contract. Additionally, the contract enforces a maximum of 5 transfers per batch, with no option to increase this value. Calculations show that the contract can handle up to 480 transfers daily, but if this number is exceeded, it will cause delays and bottlenecks. This setup may not suffice as usage scales, potentially leading to congestion and delayed transfers. It is recommended to add functions to modify the `batchingInterval` and `maxTransfersPerBatch`, accessible only by authorized addresses, to mitigate this issue.


  **Link**: [Issue #18](https://github.com/hats-finance/illuminex-0x0bb4aa1f58719707405c231fcdf0b405714799cf/issues/18)


- **VaultBitcoinWallet Unable to Directly Call toggleRelayersWhitelistEnabled Function**

  The `VaultBitcoinWallet.sol` contract contains a function, `startRefuelTxSerializing()`, which deploys the `RefuelTxSerializer` contract. In this deployment process, the ownership of `RefuelTxSerializer` is transferred to the `VaultBitcoinWallet` contract. However, there is an issue: the `VaultBitcoinWallet` contract cannot directly call the inherited `toggleRelayersWhitelistEnabled()` function from the `RefuelTxSerializer` contract, as it is not an Externally Owned Account (EOA). This creates a problem where the wallet cannot enable or disable the `relayersWhitelist`, which is essential for relayer functionality across contracts. The proposed solution is to implement a new function within the `VaultBitcoinWallet` to call `toggleRelayersWhitelistEnabled()` on the `RefuelTxSerializer`. This adaptation would ensure proper relay management.


  **Link**: [Issue #49](https://github.com/hats-finance/illuminex-0x0bb4aa1f58719707405c231fcdf0b405714799cf/issues/49)


- **Single relayer possesses excessive control over withdrawal process in VaultBitcoinWallet**

  The `startOutgoingTxSerializing` function in the `VaultBitcoinWallet` contract allows withdrawals to be initiated only by the relayer who started the process, granting them excessive control. If this relayer fails to complete the process, withdrawals remain indefinitely stuck, creating a system vulnerability. Two potential concerns arise: a malicious or compromised relayer can halt withdrawals, or an honest relayer might lose their key, causing the system to lock up permanently. To remedy this, transferring the ownership of the `TxSerializer` to the owner of the `VaultBitcoinWallet` or allowing multiple relayers to finalize the process would mitigate the problem and reduce reliance on individual relayers.


  **Link**: [Issue #84](https://github.com/hats-finance/illuminex-0x0bb4aa1f58719707405c231fcdf0b405714799cf/issues/84)

## Low severity issues


- **Bug in Buffer.sol WriteVarInt Function with Incorrect Argument Handling**

  A bug exists in the `writeVarInt` function of the `Buffer.sol` contract where `Endian.reverse32` is incorrectly called with a `uint16` argument instead of a `uint32`. This leads to incorrect data and potential out-of-bounds errors. Similar issues are present in the `StorageWritableBufferStream.sol` contract. A fix involves ensuring `Endian.reverse32` is called with a `uint32`.


  **Link**: [Issue #24](https://github.com/hats-finance/illuminex-0x0bb4aa1f58719707405c231fcdf0b405714799cf/issues/24)



## Conclusion

The audit competition on Hats.finance, hosted by illuminex, a cross-chain privacy wallet, evaluated the security of xEngine, which integrates a lightweight Bitcoin node and multisig wallet into the Oasis Sapphire smart contract. Out of 101 submissions, five participants were awarded a total of $13,605.08. The audit revealed several issues, including two medium severity issues related to the contract's batching mechanism and the excessive control of a single relayer over withdrawals, and two low severity issues involving incorrect argument handling in the `Buffer.sol` contract. Recommendations included making certain parameters adjustable to prevent congestion, allowing proper contract function calls for relay management, and implementing fixes for argument handling errors to avoid operational vulnerabilities. This process demonstrated Hats.finance's commitment to maintaining high security standards by leveraging decentralized, results-driven audit competitions, fostering a more secure Web3 ecosystem through proactive detection and resolution of potential security flaws.

## Disclaimer


This report does not assert that the audited contracts are completely secure. Continuous review and comprehensive testing are advised before deploying critical smart contracts.


The illuminex audit competition illustrates the collaborative effort in identifying and rectifying potential vulnerabilities, enhancing the overall security and functionality of the platform.


Hats.finance does not provide any guarantee or warranty regarding the security of this project. Smart contract software should be used at the sole risk and responsibility of users.

