import React from 'react'
import { useState, useEffect } from 'react';
import Chart from './Chart';


export default function WebSocketProvider({ message }) {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState({
        xAxis: [],
        yAxis: [],
        zAxis: [],
    })
    const [isOpen, setIsOpen] = useState(false);

 
    useEffect(() => {
        const token = sessionStorage.getItem('Token');
        const userid = sessionStorage.getItem('userid');
        // console.log(token)
        const ws = new WebSocket(`ws://192.168.0.126:8080/realtimews?auth=${token}`);

        ws.onopen = () => {
            console.log('WebSocket connection established.');
            setIsOpen(true);
        };

        ws.onmessage = (event) => {

            try {
                const realTimeData = JSON.parse(event.data);
                console.log('Received data:', realTimeData);
                setData((prevData) => ({
                    xAxis: [...prevData.xAxis, realTimeData.spectrum_x],
                    yAxis: [...prevData.yAxis, realTimeData.spectrum_y],
                    zAxis: [...prevData.zAxis, realTimeData.spectrum_z],

                }))
            } catch (error) {
                console.error('WebSocket error:', error);
                console.error('Error message:', error.message);
                console.error('Error type:', error.type);
                console.error('Error target:', error.target);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            setIsOpen(false);
        };

        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        if (socket && message && isOpen) {
            console.log('===> readyState', socket.readyState)
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(message);
                console.log('Message sent:', message);
            } else {
                console.log('Empty message not sent');
            }
        }
    }, [message, socket, isOpen])

    return (
        <div>
            <div className="p-20">
                {/* <Chart vis='X-Axis' />
                <Chart vis='Y-Axis' />
                <Chart vis='Z-Axis' /> */}
            </div>
        </div>
    )
}
