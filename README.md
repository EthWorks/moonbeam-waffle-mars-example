# Waffle and Mars on Moonbeam

This is an example project using Waffle and Mars, prepared to run against a local Moonbeam node.

## Building

```shell
yarn && yarn build
```

## Running tests with Waffle

Example test is located in `test/Token.test.ts`

For more information on Waffle, refer to [Waffle website](https://getwaffle.io/).

### Against local Moonbeam node

1. Start moonbeam
 
```shell
cargo run --release -- --dev --tmp
```

2. Make sure `PROVIDER` is set to `moonbeam-local` in `test/Token.test.ts`.

3. Run the tests

```shell
yarn test
```

### Against ganache

2. Make sure `PROVIDER` is set to `ganache` in `test/Token.test.ts`.

3. Run the tests

```shell
yarn test
```

## Deploy contracts

Following instructions will deploy a set of smart contracts on local Moonbeam node.

For more details on how Mars works, refer to [Mars repo](https://github.com/EthWorks/Mars) or [Mars docs](https://ethereum-mars.readthedocs.io/).

1. Start moonbeam

```shell
cargo run --release -- --dev --tmp
```

2. Initiate deployment

```shell
yarn deploy
```
