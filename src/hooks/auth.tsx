import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from 'react';
import Toast from 'react-native-toast-message';

import { api } from '../services/api';

interface IUser {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    avatar_url?: string;
    birth_date: string;
    code: string;
    phone: string;
    genre: string;
    password: string;
    balance: number;
}

interface ISignInCredentials {
    login: string;
    password: string;
}

interface IAuthContextData {
    user: IUser;
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signOut: (user_id: string) => Promise<void>;
    updatedUser: (user: IUser) => Promise<void>;
    updatedUserDevice: (user_id: string, device_id: string) => void;
    getUser: (id_user: string) => Promise<void>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const DEFAULT_ASYNCSTORAGE_USER = '@MONCASHBACK_USER';
const DEFAULT_ASYNCSTORAGE_TOKEN = '@MONCASHBACK_TOKEN';

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [data, setData] = useState<IUser>({} as IUser);

    async function signIn({ login, password }: ISignInCredentials) {
        try {
            const response = await api.post('/user/authenticate', {
                login,
                password,
            });

            if (!response.data.success) {
                Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: `${response.data.message}`,
                    position: 'bottom',
                });
                return;
            }
            const { token, user } = response.data;
            api.defaults.headers.authorization = `Bearer ${token}`;

            await AsyncStorage.setItem(
                DEFAULT_ASYNCSTORAGE_USER,
                JSON.stringify(user),
            );
            await AsyncStorage.setItem(DEFAULT_ASYNCSTORAGE_TOKEN, token);

            setData({ ...user });

            const deviceStorage = await AsyncStorage.getItem('DEVICE');

            updatedUserDevice(user.id, deviceStorage);
        } catch (error) {
            console.error(error);
        }
    }

    async function signOut(user_id: string) {
        try {
            setData({} as IUser);
            await AsyncStorage.removeItem(DEFAULT_ASYNCSTORAGE_USER);
            await AsyncStorage.removeItem(DEFAULT_ASYNCSTORAGE_TOKEN);

            updatedUserDevice(user_id, '');
        } catch (error) {
            console.error(error);
        }
    }

    async function updatedUser(user: IUser) {
        try {
            const { data } = await api.put(`user/updateUser/${user.id}`, user);

            setData(data);

            await AsyncStorage.removeItem(DEFAULT_ASYNCSTORAGE_USER);
            await AsyncStorage.setItem(
                DEFAULT_ASYNCSTORAGE_USER,
                JSON.stringify(data),
            );
        } catch (error) {
            console.error(error);
        }
    }

    function updatedUserDevice(user_id: string, device_id: string) {
        try {
            api.put(`user/${user_id}/device`, { device_id });
        } catch (error) {
            console.error(error);
        }
    }

    async function getUser(id_user: string) {
        try {
            const { data } = await api.get(`user/getUser/${id_user}`);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadStorageData() {
        const userStorage = await AsyncStorage.getItem(
            DEFAULT_ASYNCSTORAGE_USER,
        );
        const tokenStorage = await AsyncStorage.getItem(
            DEFAULT_ASYNCSTORAGE_TOKEN,
        );

        if (userStorage && tokenStorage) {
            const userLogged = JSON.parse(userStorage) as IUser;
            api.defaults.headers.authorization = `Bearer ${tokenStorage}`;

            setData({ ...userLogged });
        }
    }

    useEffect(() => {
        loadStorageData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data,
                signIn,
                signOut,
                updatedUser,
                updatedUserDevice,
                getUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContextData {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
