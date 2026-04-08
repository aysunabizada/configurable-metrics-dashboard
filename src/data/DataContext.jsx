import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const Cntx = createContext();

function DataContext({ children }) {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem("dashboard_layout");
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() => {
        localStorage.setItem("dashboard_layout", JSON.stringify(data));
    }, [data])

    useEffect(() => {
        if (data.length === 0) {
            axios
                .get("https://69d4e58cd396bd74235decb0.mockapi.io/mockMetrics")
                .then(res => setData(res.data))
                .catch(err => console.error("Failed to fetch data:", err));
        }
    }, []);

    return (
        <Cntx.Provider value={{ data, setData }}>
            {children}
        </Cntx.Provider>
    );
}

export default DataContext;