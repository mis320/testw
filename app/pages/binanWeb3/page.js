'use client'
import { useEffect, useState } from 'react'
import { isInBinance } from '@binance/w3w-utils'
export default function test() {

    console.log('isInBinance', isInBinance());
    
    useEffect(() => {
        console.log('isInBinance', isInBinance());
        
    }, [])

    const [isInBinanceState, setIsInBinanceState] = useState(isInBinance());
    return (
        <div>

            <h1>Binance Web3 Test Page</h1>
            {`isInBinance {${isInBinanceState}}`       }
        </div>
    )
}