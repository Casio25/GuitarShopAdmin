"use client"
import { QueryClient, QueryClientProvider } from 'react-query';
import { Inter } from 'next/font/google'
import { Header } from '../components/Header'
import { DataFetcher } from "../store/FilteredDataStore"
import { Children } from 'react';


const inter = Inter({ subsets: ['latin'] });

export const QueryClientComponent = ({
    children,
}: {
    children: React.ReactNode
}) => {


    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <html lang="en">
                <body>
                    <DataFetcher/>
                    <Header />
                    {children}
                </body>
            </html>
        </QueryClientProvider>
    )
}



