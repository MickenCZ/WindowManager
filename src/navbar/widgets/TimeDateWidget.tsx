import { useEffect, useState } from "react"
import "./TimeDateWidget.css"

function TimeDateWidget() {
    const [dateTime, setDateTime] = useState({
        time: "",
        date: "",
        tooltip: "",
    })

    const updateDateTime = () => {
        const now = new Date()
        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        const date = now.toLocaleDateString("en-GB").split("/").join(".")
        const tooltip = `${now.toLocaleString('en-US', {weekday: 'long'})}, ${now.toLocaleString('en-US', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()}`
        setDateTime({
            time: time,
            date: date,
            tooltip: tooltip
          })
    }

    useEffect(() => {
        //set date and time when page loads
        updateDateTime()
        //now do this every second
        const intervalID = setInterval(updateDateTime, 1000)
        //remove this functionality when component de-renders
        return () => clearInterval(intervalID)
    }, [setDateTime])


    return (
        <div id="timeDateWidget" title={dateTime.tooltip} tabIndex={0}>
            <div id="time">{dateTime.time}</div>
            <div id="date">{dateTime.date}</div>
        </div>
    )
}

export default TimeDateWidget