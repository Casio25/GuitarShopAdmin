"use client"
import Link from "../../../node_modules/next/link"

const Header = () => {
    return(
        <header>
            <Link href="/products">All products</Link>
            <Link href="/">Main</Link>
            <Link href="/login">Login</Link>
        </header>
    )
}
export {Header}