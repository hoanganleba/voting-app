import type {NextPage} from 'next'
import Link from 'next/link'
import {FC, useContext, useEffect} from 'react'
import AuthContext from '../utils/AuthContext'

interface NavbarProps {
    authContext: string
}

const Navbar: FC<NavbarProps> = (props) => {
    const {setAuthContext} = useContext(AuthContext)

    const logout = () => {
        if (process.browser) {
            localStorage.removeItem('username')
            setAuthContext('')
        }
    }

    useEffect(() => {
        if (process.browser) {
            const item = localStorage.getItem('username')
            if (item) {
                setAuthContext(item)
            }
        }
    }, [])

    return (
        <div className="container flex mx-auto py-4 items-center px-4 md:px-0">
            <Link href="/">
                <h1 className="uppercase font-semibold">Voting App</h1>
            </Link>
            {props.authContext !== '' ? (
                    <div className="ml-auto">
                        <span>{props.authContext}</span>
                        <Link href="/myPoll">
                            <a className="inline-block mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded focus:outline-none font-semibold">My
                                Poll
                            </a>
                        </Link>
                        <button
                            onClick={logout}
                            className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded focus:outline-none font-semibold">Logout
                        </button>
                    </div>) :
                (<div className="ml-auto">
                    <Link href="/register">
                        <a className="inline-block mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded focus:outline-none font-semibold">Register</a>
                    </Link>
                    <Link href="/login">
                        <a className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded focus:outline-none font-semibold">Login</a>
                    </Link>
                </div>)
            }
        </div>
    )

}

export default Navbar
