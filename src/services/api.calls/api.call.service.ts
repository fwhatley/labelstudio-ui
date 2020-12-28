import { v4 as uuidv4 } from 'uuid';

import {ApiDataService} from "./api.data.service";
import {ApiErrorModel} from "../../data.models/api/api.error.model";

const jwtDecode = require('jwt-decode');

class ApiCallService {
    private static instance: ApiCallService;

    public constructor() {
        if (!ApiCallService.instance) {
            ApiCallService.instance = this;
        }
        return ApiCallService.instance;
    }

    callService(apiKey = '', payload: any = {}, headers = {}) {
        const requestHeaders = this.getHeaders(headers);
        const apiData: any = ApiDataService.getApiDataByKey(apiKey);
        // const host = ApiHostService.getHost(apiData.apiType);
        // let url = apiData ? `${host}${apiData.path}` : '';
        let url = apiData ? `${apiData.path}` : '';

        if (apiData) {
            const findUrlParam = /{\s*[\w.]+\s*}/g;
            const paramNameRegExp = /[\w.]+/;

            // if we have url params then make sure they are properly encoded
            (url.match(findUrlParam) || []).map((x) => {
                const paramName = x.match(paramNameRegExp)[0];
                // eslint-disable-next-line no-prototype-builtins
                if (payload.hasOwnProperty(paramName)) {
                    url = url.replace(`{${paramName}}`, encodeURIComponent(payload[paramName]));
                    /* value not required in payload as it is now an encoded url parameter */
                    // eslint-disable-next-line no-param-reassign
                    delete payload[paramName];
                }
                return false;
            });

            const options: any = {
                method: apiData.method, // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: requestHeaders,
                redirect: 'error', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
            };
            if (apiData.method !== 'GET') {
                options.body = JSON.stringify(payload);
            }

            // Default options are marked with *
            return fetch(url, options)
                .then((res) => res.text())
                .then((text) => {
                    try {
                        return text.length ? JSON.parse(text) : {};
                    } catch (e) {
                        // couldn't parse text because it's not in JSON format
                        return new ApiErrorModel({message: text});
                    }
                })
                .catch((error) => {
                    throw error;
                });
        }
        throw Error(`api.call.service function callService: api data not found for "${apiKey}"`);
    }

    getHeaders(startingHeaders: any) {
        const headers = startingHeaders;
        const idToken = localStorage.getItem('id_token');
        if (idToken) {
            headers['x-id-token'] = idToken;
        }

        const userName = 'anonymous'; // todo: if user is logged in, use the username
        headers['Content-Type'] = 'application/json; charset=utf-8';
        headers['x-reai-conversation-id'] = `${userName}~REAI~${uuidv4()}`;
        return headers;
    }
}

const instance = new ApiCallService();

// since there are no changing values in this class, let's lock it down
Object.freeze(instance);

export { instance as ApiCallService};
