import React, { useState, useRef, useEffect, ReactElement } from 'react';
import './Window.css';
import WindowControls from './WindowControls';

type Position = {
  x: number
  y: number
}

type tProps = {
  id: number,
  highestZIndex: number,
  bringToFront: () => void,
  children: ReactElement,
}

function Window({id, highestZIndex, bringToFront, children}: tProps) {
    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [zIndex, setZIndex] = useState(id);

    useEffect(() => { // Functions are inside of useEffect to avoid changing dependencies of useEffect on every render.
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                let newX = e.clientX - offset.x
                let newY = e.clientY - offset.y
                
                // To make sure window doesn't go off screen
                if (windowRef.current) {
                    // window.innerHeight/Width gives the viewport size, we subtract the size of the window div,
                    // and add the offset so that it can go offscreen by the offset
                    const maxX = window.innerWidth - windowRef.current.offsetWidth + offset.x
                    const maxY = window.innerHeight - windowRef.current.offsetHeight + offset.y
                    // Limits the values to maximum and minimum
                    if (newX < -offset.x) {newX = -offset.x}
                    if (newY < -offset.y) {newY = -offset.y}
                    if (newX > maxX) {newX = maxX}
                    if (newY > maxY) {newY = maxY}
                }

                setPosition({ x: newX, y: newY })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => { // After we stop dragging, we stop responding to mouse events
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, offset])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // This means that you can only move if you click the ref div directly, not its children
        if (windowRef.current && windowRef.current == e.target) {
            const rect = windowRef.current.getBoundingClientRect()
            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
            setIsDragging(true)
            // bringToFront increases highest global z-index, setZIndex sets it
            bringToFront()
            setZIndex(highestZIndex)
        }
    }

  return (
    <div className="window" style={{ left: position.x, top: position.y, zIndex: zIndex}}>
      <div className="windowControls" ref={windowRef} onMouseDown={handleMouseDown}>
          <WindowControls id={id} isFullScreen={isFullScreen} />
      </div>
      <div className="windowContent">
          {children}
      </div>
    </div>
  )
}

export default Window;
