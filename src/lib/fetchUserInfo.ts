import { Fetcher } from './fetcher';
import Promise = require('bluebird');
let urlJoin = require('url-join');
import { SalesforceOptions, formatApiVersion } from './salesforceOptions'
import { RequestOptions } from './requestOptions';
import * as querystring from 'querystring';


export class FetchUserInfo {
    fetcher: Fetcher;
    options: SalesforceOptions;

    static Create(fetcher: Fetcher, options: SalesforceOptions): FetchUserInfo {
        return new FetchUserInfo(fetcher, options);
    }

    constructor(fetcher: Fetcher, options: SalesforceOptions){
        this.fetcher = fetcher;
        this.options = options;
    }

    private getBaseUserInfoURL(){
        return urlJoin(this.options.instanceURL, 'services/oauth2/userinfo');
    }

    get(): Promise<any> {
        let fetchUrl = this.getBaseUserInfoURL();

        let fetchOptions: RequestInit = {
            method: 'GET',
            cache: 'no-cache'
        };
        return this.fetcher.fetchJSON(fetchUrl, fetchOptions);
    }
}