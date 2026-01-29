import { createBrowserRouter } from 'react-router-dom';
import { MarketingLayout } from './components/MarketingLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MarketingLayout />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { HomePage } = await import('./pages/HomePage');
                    return { Component: HomePage };
                },
            },
        ],
    },
]);
