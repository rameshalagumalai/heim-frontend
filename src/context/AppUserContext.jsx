import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getProfileDetails } from "../api-calls/profile";
import { auth } from "../firebase/firebase";

const appUserContext = createContext();

export function AppUserContextProvider({ children }) {
    const [appUser, setAppUser] = useState();

    const [user] = useAuthState(auth);

    useEffect(() => {
        async function getDetails() {
            const result = await getProfileDetails(user, user.uid);

            if (result.name) {
                setAppUser(result);
            } else {
                setAppUser(null);
            }
        }

        if (user) {
            getDetails();
            console.log('mass');
        }
    }, [user]);

    return (
        <appUserContext.Provider value={{ appUser, setAppUser }}>
            { children }
        </appUserContext.Provider>
    );
}

export function useAppUser() {
    return useContext(appUserContext);
}