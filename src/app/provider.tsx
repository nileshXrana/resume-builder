'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider, useSession } from 'next-auth/react';
import { store, persistor } from '@/redux/store';
import { loginSession, logoutUser } from '@/redux/features/userSlice';

function SessionSync({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.user.currentUser);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            if (currentUser?.email !== session.user.email) {
                dispatch(loginSession(session.user.email));
            }
        } else if (status === 'unauthenticated') {
            if (currentUser) {
                dispatch(logoutUser());
            }
        }
    }, [status, session, currentUser, dispatch]);

    return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SessionSync>
                        {children}
                    </SessionSync>
                </PersistGate>
            </Provider>
        </SessionProvider>
    );
}
