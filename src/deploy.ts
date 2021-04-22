import { contract, createProxy, debug, deploy, runIf } from 'ethereum-mars'
import { Market, Token, UpgradeabilityProxy } from '../build/artifacts'

const ALITH_PRIVATE_KEY = '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133';

deploy({network: 'http://127.0.0.1:9933', privateKey: ALITH_PRIVATE_KEY},(deployer) => {
  const appleImplementation = contract('apple', Token)
  const orangeImplementation = contract('orange', Token, { gasLimit: 1000000 })
  const proxy = createProxy(UpgradeabilityProxy, 'upgradeTo')
  const apple = proxy(appleImplementation, 'initialize', [100])
  const orange = proxy(orangeImplementation, 'initialize', [200])
  const market = contract(Market, [apple, orange])
  debug('Apple', apple)
  debug('Allowances', [apple.allowance(deployer, market), orange.allowance(deployer, market)])
  runIf(apple.allowance(deployer, market).equals(0), () => apple.approve(market, 100)).else(() =>
    orange.approve(market, 100)
  )
  apple.approve(market, apple.totalSupply().add(42), { gasLimit: 1000000 })
  orange.approve(market, orange.totalSupply())
});

