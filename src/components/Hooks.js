import { useRef, useEffect } from 'react'

export default function useOnDraw(onDraw) {
    const piktoRef = useRef(null);
    
    const isDrawingRef = useRef(false);

    const mouseDownListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null);
    const mouseMoveListenerRef = useRef(null);

    const prevPointRef = useRef(null);

    function setPiktoRef(ref){
        if (!ref) return;
        if (piktoRef.current) {
            piktoRef.current.removeEventListener("mousedown", mouseDownListenerRef.current);
        }
        piktoRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
    }

    function initMouseMoveListener(){
        const mouseMoveListener = (e) => {
            if (isDrawingRef.current) {
                const point = computePointInPikto(e.clientX, e.clientY);
                const ctx = piktoRef.current.getContext('2d');
                if (onDraw) onDraw(ctx, point, prevPointRef.current);
                prevPointRef.current = point;
                console.log(point);
            }
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener(){
        if (!piktoRef.current) return;
        const listener = () => {
            isDrawingRef.current = false;
            prevPointRef.current = null;
        }
        mouseUpListenerRef.current = listener;
        piktoRef.current.addEventListener("mouseup", listener);
    }

    function initMouseDownListener(){
        if (!piktoRef.current) return;
        const listener = () => {
            isDrawingRef.current = true;
        }
        mouseDownListenerRef.current = listener;
        piktoRef.current.addEventListener("mousedown", listener);
    }

    function computePointInPikto(clientX, clientY){
        if (piktoRef.current) {
            const boundingRect = piktoRef.current.getBoundingClientRect();
            return {
                x : clientX - boundingRect.left,
                y : clientY - boundingRect.top,
            }
        } else {
            return null;
        }
    }

    return setPiktoRef;
};
