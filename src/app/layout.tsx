
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from './components/Header'
import { DataFetcher } from "./store/FilteredDataStore.js"
import {QueryClientComponent} from "./components/QueryClient"


// Remove the metadata export
// export const metadata: Metadata = {
//   title: 'Guitar admin',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientComponent children={children}/>
  )
}



