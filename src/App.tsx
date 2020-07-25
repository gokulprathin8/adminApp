import * as React from 'react';
import { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';

import referrals from './offerly/reference/referrals';
import masterProducts from './offerly/reference/masterProducts';
import adminUsers from './offerly/reference/adminUsers';
import productsServices from './offerly/reference/products_services';   
import offers from './offerly/reference/offers';
import stores from './offerly/reference/store';
import shoppingZones from './offerly/reference/shoppingZones';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

const App = () => {
    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        let restoreFetch;

        const fetchDataProvider = async () => {
            restoreFetch = await fakeServerFactory(
                process.env.REACT_APP_DATA_PROVIDER || ''
            );
            const dataProviderInstance = await dataProviderFactory(
                process.env.REACT_APP_DATA_PROVIDER || ''
            );
            setDataProvider(
                // GOTCHA: dataProviderInstance can be a function
                () => dataProviderInstance
            );
        };

        fetchDataProvider();

        return restoreFetch;
    }, []);

    if (!dataProvider) {
        return (
            <div className="loader-container">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <Admin
            title="Offerly Admin"
            dataProvider={dataProvider}
            customReducers={{ theme: themeReducer }}
            customRoutes={customRoutes}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
        >
            <Resource name="customers" {...visitors} />
            <Resource
                name="commands"
                {...orders}
                options={{ label: 'Orders' }}
            />
            <Resource name="invoices" {...invoices} />
            <Resource name="products" {...products} />
            <Resource name="categories" {...categories} />
            <Resource name="reviews" {...reviews} />
            <Resource name="referrals" {...referrals}/>
            <Resource name="masterProducts" {...masterProducts}/>
            <Resource name="adminUsers"  {...adminUsers}/>
            <Resource name="productsServices" {...productsServices}/>
            <Resource name="offers" {...offers} />
            <Resource name="stores" {...stores}/>
            <Resource name="shoppingZones" {...shoppingZones}/>
        </Admin>
    );
};

export default App;
