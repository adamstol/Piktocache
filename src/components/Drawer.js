import { useEffect, useState } from 'react'
import Pikto from './Pikto'

export default function Drawer({isOpen, setIsOpen, setImage}) {
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
            setImage={setImage}
        />
    </div>
  )
}
