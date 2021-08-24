import "styles/globals.css";
import type {AppProps} from "next/app";
import Navbar from "components/Navbar";
import NextNProgress from "nextjs-progressbar";
import AuthContext from "utils/AuthContext";
import {useState} from "react";

function MyApp({Component, pageProps}: AppProps) {
    const [authContext, setAuthContext] = useState<string>("");
    return (
        <>
            <AuthContext.Provider value={{authContext, setAuthContext}}>
                <NextNProgress/>
                <Navbar authContext={authContext}/>
                <div className="container mx-auto mt-10 px-4 md:px-0">
                    <Component {...pageProps} />
                </div>
            </AuthContext.Provider>
        </>
    );
}

export default MyApp;
