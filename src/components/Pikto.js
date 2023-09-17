import useOnDraw from './Hooks'
import { useState, useRef, useEffect } from 'react'
import Arrow from '../assets/send_arrow.svg'

const Pikto = ({width, height, penColor, setColor, isOpen, setIsOpen, setImage}) => {
    const setPiktoRef = useOnDraw(onDraw);
    const originalCanvas = useRef(null);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, penColor, 5);
    }

    function clearPikto(){
        const pikto = originalCanvas.current;
        const ctx = pikto.getContext('2d');
        ctx.clearRect(0, 0, pikto.width, pikto.height);
    }

    function drawLine(start, end, ctx, color, width){
        console.log(color);
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.strokeRect(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }


    return (
    <div style={piktoStyle}>
        <div style={{position: 'absolute'}}>
            <button 
            onClick={() => {
                setIsOpen(false);
            }} 
            style={topBtns}
            className="pixelated">
                Exit
            </button>           
        </div>
        <canvas
            width={width}
            height={height}
            style={canvasStyle}
            ref={(pikto) => {
                    setPiktoRef(pikto)
                    originalCanvas.current = pikto
                }
            }
        />
        <div style={transparent}>
            <button onClick={() => {
                setColor("#FF0000")
            }} style={btnColor('red')}/>
            <button onClick={() => {
                setColor("#000000")
            }} style={btnColor('black')}/>
            <button onClick={() => {
                setColor("#0000FF")
            }} style={btnColor('blue')}/>
            <button
                onClick = {() => {
                    clearPikto();
                }}
                className="pixelate" 
                style={{backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', fontFamily: 'SF_Pixelate', fontSize: '1.15rem'}}>
                Erase
            </button>
            <button
                onClick={() => {
                    let x = originalCanvas.current.toDataURL('image/png');
                    setImage(x);
                    // console.log(x);
                    setIsOpen(false);
                }} 
                style={{backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', color: 'white'}}>
                <img src={Arrow}/>
            </button>       
        </div>
    </div>
  )
}

export default Pikto;

const canvasStyle = {
    border: '1px solid black'
}

const piktoStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
}

const topBtns = {
    fontFamily: 'SF_Pixelate',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0.75rem',
    fontSize: '1.25rem',
    color: 'black',
}

const btnColor = (color) => {
    return {
        borderRadius: 100,
        backgroundColor: color,
        border: 'none',
    }
}

const transparent = {
    pointerEvents: 'auto',
    display: 'flex',
    justifyContent: 'end',
    gap: '1rem',
    padding: '0.5rem',
    position: 'absolute',
    bottom: 0,
    right: 0,
}