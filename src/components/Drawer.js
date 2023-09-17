import { useEffect, useState } from 'react'
import Pikto from './Pikto'

export default function Drawer({isOpen, setIsOpen}) {
    const [color, setColor] = useState();

    return (
    <div style={{zIndex: 99}}>
        <Pikto
            width={1000}
            height={600}
            penColor={color}
            setColor={setColor}
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
        />
    </div>
  )
}
