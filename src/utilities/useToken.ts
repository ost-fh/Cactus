import { useState } from "react"

export const useUserData = () => {
    const getUserData = () => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            return userData
        } else {
            return undefined;
        }
    };
    const [userData, setUserData] = useState(getUserData());
    const saveUserData = (userData: any) => {
        if (userData === undefined) {
            sessionStorage.removeItem('userData')
        } else { (sessionStorage.setItem('userData', JSON.stringify(userData))) }

        setUserData(userData);
    };
    return {
        setUserData: saveUserData,
        userData
    }
}
