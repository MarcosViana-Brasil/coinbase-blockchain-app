/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { BsThreeDotsVertical } from 'react-icons/bs'

import BalanceChart from './BalanceChart'
import { coins } from '../static/coins'
import Coin from './Coin'

const Portfolio = ({ thirdWebTokens, sanityTokens, walletAddress }) => {
    const [walletBalance, setWalletBalance] = useState(0)

    // convert all of my tokens into USD
    const tokenToUSD = {}

    for (const token of sanityTokens) {
        tokenToUSD[token.contractAddress] = Number(token.usdPrice)
    }

    useEffect(() => {
        const calculateTotalBalance = async () => {
            let total = 0
            for (const token of thirdWebTokens) {
                const balance = await token.balanceOf(walletAddress)
                total +=
                    Number(balance.displayValue) * tokenToUSD[token.address]
            }

            // console.log('Total balance: ', total)

            setWalletBalance(total)
        }

        calculateTotalBalance()
    }, [thirdWebTokens, tokenToUSD, walletAddress])

    return (
        <Wrapper>
            <Content>
                <Chart>
                    <div>
                        <Balance>
                            <BalanceTitle>Portfolio balance</BalanceTitle>
                            <BalanceValue>
                                {'$'}
                                {walletBalance.toLocaleString()}
                            </BalanceValue>
                        </Balance>
                    </div>
                    <BalanceChart />
                </Chart>

                <PortfolioTable>
                    <TableItem>
                        <Title>Your Assets</Title>
                    </TableItem>
                    <Divider />
                    <Table>
                        <TableItem>
                            <TableRow>
                                <div style={{ flex: 3 }}>Name</div>
                                <div style={{ flex: 2 }}>Balance</div>
                                <div style={{ flex: 1 }}>Price</div>
                                <div style={{ flex: 1 }}>Allocation</div>
                                <div style={{ flex: 0 }}>
                                    <BsThreeDotsVertical />
                                </div>
                            </TableRow>
                        </TableItem>
                        <Divider />
                        <div>
                            {coins.map((coin, index) => (
                                <div key={index}>
                                    <Coin coin={coin} />
                                    {/* <h2>{coin.name}</h2> */}
                                    <Divider />
                                </div>
                            ))}
                        </div>
                    </Table>
                    <div style={{ marginBottom: '2rem' }}></div>
                </PortfolioTable>
            </Content>
        </Wrapper>
    )
}

export default Portfolio

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`
const Content = styled.div`
    width: 100%;
    max-width: 1000px;
    padding: 1rem;
`
const PortfolioTable = styled.div`
    margin-top: 1rem;
    border: 1px solid #282b2f;
`
const Table = styled.div`
    width: 100%;
`
const TableRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > th {
        text-align: left;
    }
`
const TableItem = styled.div`
    padding: 1rem 2rem;
`
const Divider = styled.div`
    border-bottom: 1px solid #282b2f;
`
const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`
const Chart = styled.div`
    border: 1px solid #282b2f;
    padding: 1rem 2rem;
`
const Balance = styled.div``

const BalanceTitle = styled.div`
    color: #8a919e;
    font-size: 0.9rem;
`
const BalanceValue = styled.div`
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0.5rem 0;
`
