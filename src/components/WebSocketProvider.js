import React from 'react'
import { useState, useEffect } from 'react';
import Chart from './Chart';

export default function WebSocketProvider({ message }) {
    const [socket, setSocket] = useState(null);
    // const [messages, setMessages] = useState([]);
    // const [inputMessage, setInputMessage] = useState('');
    const [data, setData] = useState({
        xAxis: [],
        yAxis: [],
        zAxis: [],
    })
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.0.126:8080/realtimews');

        ws.onopen = () => {
            console.log('WebSocket connection established.');
            setIsOpen(true);
        };

        ws.onmessage = (event) => {

            try {
                const realTimeData = JSON.parse(event.data)

                setData((prevData) => ({
                    xAxis: [...prevData.xAxis, realTimeData.spectrum_x.slice(-100)],
                    yAxis: [...prevData.yAxis, realTimeData.spectrum_y.slice(-100)],
                    zAxis: [...prevData.zAxis, realTimeData.spectrum_z.slice(-100)],

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
        if (socket && message) {

            if (message.trim() !== '') {
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
                <Chart visibility='X-Axis' />
                <Chart visibility='Y-Axis' />
                <Chart visibility='Z-Axis' />
            </div>
        </div>
    )
}
