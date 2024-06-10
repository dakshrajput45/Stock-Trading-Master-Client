import { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [selectedStock, setSelectedStock] = useState("IBM");
    const [open, setOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const userId = cookies.userId;

    async function getUserData() {
        try {
            const { data } = await axios.post(`http://localhost:5000/getUserData`, {
                userId: userId,
            })
            return (data.data);
        } catch (e) {
            toast.error(e);
            return [];
        }
    }


    const value = {
        selectedStock,
        setSelectedStock,
        open,
        setOpen,
        getUserData,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}