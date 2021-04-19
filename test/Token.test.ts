import { expect, use } from 'chai';
import { MockProvider, solidity } from 'ethereum-waffle';
import { ethers, Wallet } from 'ethers';
import { Token, TokenFactory } from '../build/types';

use(solidity);

describe('BasicToken', () => {
  let provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:9933');
  let token: Token;
  let wallet: Wallet, walletTo: Wallet

  beforeEach(async () => {
    wallet = new Wallet('0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133').connect(provider);
    walletTo = Wallet.createRandom().connect(provider);
    token = await new TokenFactory(wallet).deploy();
    let contractTransaction = await token.initialize(1);
    await contractTransaction.wait();
  });

  it('Assigns initial balance', async () => {
    expect(await token.balanceOf(wallet.address)).to.equal(2000);
  });

  it('Transfer adds amount to destination account', async () => {
    await (await token.transfer(walletTo.address, 7)).wait();
    expect(await token.balanceOf(walletTo.address)).to.equal(7);
  });

  it('Transfer emits event', async () => {
    await expect(token.transfer(walletTo.address, 7))
      .to.emit(token, 'Transfer')
      .withArgs(wallet.address, walletTo.address, 7);
  });

  it('Can not transfer above the amount', async () => {
    await expect(token.transfer(walletTo.address, 2007)).to.be.reverted;
  });

  it('Can not transfer from empty account', async () => {
    const tokenFromOtherWallet = token.connect(walletTo);
    await expect(tokenFromOtherWallet.transfer(wallet.address, 1))
      .to.be.reverted;
  });

  xit('Calls totalSupply on BasicToken contract', async () => {
    await token.totalSupply();
    expect('totalSupply').to.be.calledOnContract(token);
  });

  xit('Calls balanceOf with sender address on BasicToken contract', async () => {
    await token.balanceOf(wallet.address);
    expect('balanceOf').to.be.calledOnContractWith(token, [wallet.address]);
  });
});
