'use client'
import { useState } from 'react'

export default function BinanWeb3Page() {
    const [account, setAccount] = useState(null)
    const [error, setError] = useState('')

    // 一键连接并切换到BNB主网
    const connectAndSwitch = async () => {
        setError('')
        if (!window.ethereum) {
            setError('未检测到钱包插件')
            return
        }
        try {
            // 连接钱包
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setAccount(accounts[0])
            // 切换到BNB主网
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                })
            } catch (switchError) {
                if (switchError.code === 4902) {
                    // 添加BNB主网
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x38',
                                chainName: 'Binance Smart Chain Mainnet',
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                                blockExplorerUrls: ['https://bscscan.com'],
                            }],
                        })
                    } catch {
                        setError('添加BNB主网失败')
                    }
                } else {
                    setError('切换BNB主网失败')
                }
            }
        } catch {
            setError('连接钱包失败')
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fafbfc',
            fontFamily: 'sans-serif'
        }}>
            <h2 style={{marginBottom: 32, color: '#222'}}>Binance Web3 钱包连接</h2>
            <button
                onClick={connectAndSwitch}
                style={{
                    padding: '12px 32px',
                    fontSize: 18,
                    borderRadius: 8,
                    border: 'none',
                    background: '#f0b90b',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #f0b90b33'
                }}
            >
                连接钱包并切换BNB主网
            </button>
            {account && (
                <div style={{marginTop: 24, color: '#222', fontSize: 16}}>
                    当前账户：{account}
                </div>
            )}
            {error && (
                <div style={{marginTop: 16, color: '#e74c3c', fontSize: 15}}>
                    {error}
                </div>
            )}
        </div>
    )
}