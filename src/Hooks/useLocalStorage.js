//logic inspired by https://blog.logrocket.com/using-localstorage-react-hooks/
import {useState, useEffect} from "react";

function getStorageValue(key, defaultValue){
    const savedData = JSON.parse(localStorage.getItem(key));
    return savedData || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(()=>{
        return getStorageValue(key, defaultValue);
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
