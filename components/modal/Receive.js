/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { BiCopy } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import styled from 'styled-components'
import Image from 'next/image'

import loader from '../../assets/load4.gif'
import { client } from '../../lib/sanity'

const Receive = ({ setAction, selectedToken, walletAddress }) => {
    const [imageUrl, setImageUrl] = useState(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!selectedToken) return
        const url = imageUrlBuilder(client).image(selectedToken.logo).url()
        setImageUrl(url)
    }, [selectedToken])

    return (
        <Wrapper>
            <Content>
                <QRContainer>
                    <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${walletAddress}`}
                        alt="qrcode"
                        style={{ width: '200px', height: '200px' }}
                    />
                </QRContainer>
                <Divider />
                <Row>
                    <CoinsSelectList onClick={() => setAction('select')}>
                        <Icon>
                            <img src={imageUrl} alt="avatar" />
                        </Icon>
                        <CoinName>{selectedToken?.name}</CoinName>
                    </CoinsSelectList>
                </Row>
                <Divider />
                <Row>
                    <div>
                        <Title>{selectedToken?.symbol} Address</Title>
                        <Address>{walletAddress}</Address>
                    </div>
                    <CopyButton
                        onClick={() => {
                            navigator.clipboard.writeText(walletAddress)
                            setCopied(true)
                        }}
                    >
                        {copied ? (
                            <FaCheck style={{ color: '#27ad75' }} />
                        ) : (
                            <BiCopy />
                        )}
                    </CopyButton>
                </Row>
            </Content>
        </Wrapper>
    )
}

export default Receive

const Wrapper = styled.div`
    height: 100%;
`
const Content = styled.div`
    border: 1px solid #282b2f;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
`
const QRContainer = styled.div`
    flex: 1;
    display: grid;
    place-items: center;
`
const Divider = styled.div`
    border-bottom: 1px solid #282b2f;
`
const Row = styled.div`
    display: flex;
    width: 100%;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    color: #8a919e;
    font-size: 1.2rem;
`
const Icon = styled.div`
    margin-right: 1rem;
    height: 1.8rem;
    width: 1.8rem;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-items: center;

    & > img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`
const CoinsSelectList = styled.div`
    display: flex;
    flex: 1.3;
    height: 100%;

    &:hover {
        cursor: pointer;
    }
`
const CoinName = styled.div`
    flex: 1;
    border: none;
    background: none;
    outline: none;
    color: white;
    font-size: 1.2rem;
    text-wrap: wrap;
    margin-right: 0.5rem;
`
const Title = styled.div`
    color: white;
    margin-bottom: 0.5rem;
`
const Address = styled.div`
    font-size: 0.8rem;
`
const CopyButton = styled.div`
    cursor: pointer;
`
