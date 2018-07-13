import React from 'react';
import ReactDomServer from 'react-dom/server';
import axios from 'axios';

import DataApi from 'state-api';
import App from '../components/App';

import config from 'config';

const serverRender = async () => {
    const resp = await axios.get(`http://${config.host}:${config.port}/data`);
    const api = new DataApi(resp.data);

    const initialData = {
        articles: api.getArticles(),
        authors: api.getAuthors(),
    };

    return {
        initialMarkup: ReactDomServer.renderToString(
        <App initialData={initialData} />
        ),
        initialData,
    };
};

export default serverRender;