import React, { useState, useRef, useEffect, ReactNode } from 'react';
import './Window.css';
import WindowControls from './WindowControls';
import { Position } from '../types';

type tProps = {
  id: number,
  highestZIndex: number,
  bringToFront: () => void,
  hide: boolean,
  iFrameUrl: string | null,
  customContent: ReactNode | null
}

function Window({id, highestZIndex, bringToFront, hide, iFrameUrl, customContent}: tProps) {
    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [size] = useState({width: 800, height: 500})
    const [position, setPosition] = useState<Position>({ x: 50, y: 30 })
    const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [zIndex, setZIndex] = useState(id); //Every time you click a window, it has to be on top. So we just increment highest z-index in the entire app (highestZIndex prop)

    useEffect(() => { // Functions are inside of useEffect to avoid changing dependencies of useEffect on every render.
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                let newX = e.clientX - offset.x
                let newY = e.clientY - offset.y
                
                // To make sure window doesn't go off screen
                
                if (windowRef.current) {
                    const navbarHeight = window.innerHeight * 0.08 //8vh
                    // window.innerHeight/Width gives the viewport size, we subtract the size of the window div,
                    // and add the offset so that it can go offscreen by the offset
                    const maxX = window.innerWidth - windowRef.current.offsetWidth + offset.x
                    const maxY = window.innerHeight - windowRef.current.offsetHeight + offset.y - navbarHeight
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

    const InsideComponent = ({customContent}: {customContent: string | ReactNode}) => {
        if (typeof customContent === 'string') {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: customContent }} //to render the html the user has given us
            />
          )
        }
        return <>{customContent}</>
    }

  return (
    <div className="window" style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        width: isFullScreen ? window.innerWidth : size.width,
        height: isFullScreen ? window.innerHeight * 0.93 : size.height, //0.93 cause 0.07 is bottom navbar
        display: hide ? "none" : "block",
    }}>
      <div className="windowControls" ref={windowRef} onMouseDown={handleMouseDown}>
          <WindowControls id={id} isFullScreen={isFullScreen} position={position} setPosition={setPosition} setIsFullscreen={setIsFullScreen} />
      </div>
      <div className="windowContent">
          {iFrameUrl && <iframe src={iFrameUrl} width={isFullScreen ? window.innerWidth : size.width} height={isFullScreen ? window.innerHeight * 0.93 : size.height}></iframe>}
          <InsideComponent customContent={customContent} />
      </div>
    </div>
  )
}

export default Window;
