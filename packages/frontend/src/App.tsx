import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './lib/trpc';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    const { getToken } = useAuth();
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: import.meta.env.VITE_BACKEND_URL,
                    async headers() {
                        return {
                            authorization: `Bearer ${await getToken()}`,
                        };
                    },
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={Home} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default App;
