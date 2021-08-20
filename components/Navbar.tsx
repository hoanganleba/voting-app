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
    }, [setAuthContext])

    return (
        <div className="container flex mx-auto py-4 items-center px-4 md:px-0">
            <Link href="/">
                <a className="uppercase font-semibold">Voting App</a>
            </Link>
            {props.authContext !== '' ? (
                    <div className="ml-auto">
                        <span className="mr-2">{props.authContext}</span>
                        <Link href="/myPoll">
                            <a className="text-sm inline-block mx-2 bg-blue-100 hover:bg-blue-200 text-gray-900 px-4 py-2 rounded focus:outline-none font-medium">My
                                Poll
                            </a>
                        </Link>
                        <button
                            onClick={logout}
                            className="text-sm inline-block bg-blue-100 hover:bg-blue-200 text-blue-900 px-4 py-2 rounded focus:outline-none font-medium">Logout
                        </button>
                    </div>) :
                (<div className="ml-auto">
                    <Link href="/register">
                        <a className="text-sm inline-block mr-2 border border-blue-100 hover:bg-blue-200 text-blue-900 px-4 py-2 rounded focus:outline-none font-medium">Register</a>
                    </Link>
                    <Link href="/login">
                        <a className="text-sm inline-block bg-blue-100 hover:bg-blue-200 text-gray-900 px-4 py-2 rounded focus:outline-none font-medium">Login</a>
                    </Link>
                </div>)
            }
        </div>
    )

}

export default Navbar
