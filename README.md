# ChanceXYZ


## Focus --> App
`--- TypeScript + Vue + Solana Web3.js`

## Focus --> Systems/RPC
`--- TypeScript + Rust + Express + Anchor Framework`


## What is it?

Chance is a refundable lottery running on the `SOLANA` blockchain. This document covers the overall user flow between `SOLANA` programs and what happens once funds are deposited into the `LP`.


## Diagram

```
Frontend
  |
  |      ____________________                                   ____________________
  |===> | [ Liquidity Pool ] | ===> start of Volt EPOCH  ===>  | [ Friktion VOLT ]  |
  |     |                    |                                 |                    |
  |===> |   SOLANA PDA       | ===>      DEPOSIT         ===>  |    Deposit into    |
  |     | sign transactions  |                                 | Highest Performing |
  |     |handle all rpc calls|                                 |       Volt         |
  |===> |____________________| ===>        ===>          ===>  |____________________|

```


## Overview

```
  LP --> A Solana Program (Program Derived Address)

  Frontend 
    --> deposit into LP address
    --> withdraw funds
    --> see pool performance (coming soon)
      
  Backend
    --> on deposit create account for every new account
    --> at start of each EPOCH (every 7 days) deposit percentage of pool into Friktion Finance Volts
      --> run covered call strat on volts
    --> at end of EPOCH, premium is distributed between winner/winners, the LP, and Dev fund
      --> users have option to withdraw or keep funds in after win/loss
```


##  Determine Highest Performing Volt?

Currently only running cash secured puts using `usdc`.

`Why? -->` **The underlying asset is stable** 

```
  Selected Volt = Highest average premium over 4 EPOCHS

  so

  [ pbar-1, pbar-2 ... pbar-n ] = for each volt do (p1 + ... + p4) / 4
  pbar^highest = max(pbar-1...pbar-n)

  where pbar is the mean of premium for overall periods for each volt

```


## Determine Winner
```
  fractionOfParticipants as fopart = 1 / number of participants
  fractionOfPool as fopool = overall contribution / pool size
  timeComponent as tc = overall time in pool / mean time in pool

  winner = d * fopart + y * fopool + e * tc

  where d + y + e = 1

  d = delta weight
  y = gamma weight
  e = epsilon weight
```

`d` should be weighted much more heavily than `y` and `e`, with `e` having the overall lowest weight to make the system more democratic. `e` should be an order smaller than `y` since revolving pool contributors earn a small fraction of the premium generated, thus increasing their size and overall chance of winning the pot.


##  How Premium is distributed

`20%` deposit back into LP --> this will allow the pool to grow over time and return higher rewards. Will also act as a treasury

`NOTE -->` **as treasury increases, so does collateral so risk is lowered**

`20%` distributed to revolving pool contributors. This increases individual stake in the pool, if stake is not withdrawn, after each EPOCH. This incentivizes users to keep contributions in the pool, since a larger stake correlates to a higher chance of winning the jackpot and users earn a small interest. This also helps the overall pool growth/pool retention.

`60%` distributed to winner


## Performance Fee

A `2%` performance fee is deducted on every transaction, which is distributed amongst devs and the treasury. This is due to the fact that Chance is offering a service to users, with the opportunity to not only win the lottery, but generate a small interest on pool contributions.


##  How pool is handled

Because the premium is the lottery pot, users will be returned the full amount they deposited + interest accrued, minus performance fees, unless the pool suffers losses due to risks associated with covered puts, including the underlying asset dropping below the strike price. 

Users also need to pay for gas fees, but the `SOLANA` network offers minimal/almost zero `gas` fees so this can be ignored.