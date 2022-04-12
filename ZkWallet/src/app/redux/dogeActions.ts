/* eslint-disable prettier/prettier */
import axios from 'axios';
import { Payload } from './btcModels';
import {NativeModules} from 'react-native';
import { BTC_URL, BTC_TOKEN, BTC_API_URL } from '../config';

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Auth-Token': BTC_TOKEN,
};

export const getClosestHash = (
    blockchainId: number,
    password: string,
    contractAddress: string,
    abi: string,
    target: number,
  ) => {
    return async (dispatch: any) => {
      NativeModules.CommunicationNative.getClosestHash(
        blockchainId,
        password,
        contractAddress,
        abi,
        target,
        (str: any) => {
          dispatch({
            type: GET_DOGE_CLOSEST_HASH,
            payload: str,
          });
        },
      );
    };
  };

export const setCredentials = (address: string, pk: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: SET_DOGE_CREDENTIALS,
            payload: {address, pk},
        });
    };
};

export const getAllTransactionsAtHeight = (height: number)  => {
    return async (dispatch: any) => {
        // get first 500 txses in block
        axios({
            method: 'get',
            url: BTC_API_URL + '/doge/main/blocks/' + height + '?limit=500',
            headers: headers,
        })
        .then(response => {
            dispatch({
                type: GET_DOGE_TRANSACTIONS,
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
    };
};

export const getBalanceSummary = (address: string)  => {
    return async (dispatch: any) => {
        axios({
            method: 'get',
            url: BTC_API_URL + '/doge/main/addrs/' + address + '/full',
            headers: headers,
        })
        .then(response => {
            dispatch({
                type: GET_DOGE_TRANSACTIONS,
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error);
        });
    };
};

// finds set of headers by theirs height
export const getBtcHeaders = (begining: number, end: number) => {
    const blockNumbers: Payload[] = [];
    for (let i = begining; i < end; i++) {
        blockNumbers.push(new Payload(i, [i], 'getblockhash'));
    }

    return async (dispatch: any) => {
        // get header hashes by their numbers
        axios({
            method: 'post',
            url: BTC_URL,
            headers: headers,
            data: blockNumbers,
        })
            .then(response => {
                // get full headers by their hashes
                const hashes: Payload[] = [];
                response.data.forEach((element: any) => {
                    hashes.push(new Payload(element.id, [element.result], 'getblock'));
                });
                axios({
                    method: 'post',
                    url: BTC_URL,
                    headers: headers,
                    data: hashes,
                })
                    .then(res => {
                        dispatch({
                            type: GET_DOGE_HEADERS,
                            payload: res.data,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
        return 'true';
    };
};

export const GET_DOGE_CLOSEST_HASH = 'GET_DOGE_CLOSEST_HASH';
export const GET_DOGE_TRANSACTIONS = 'GET_DOGE_TRANSACTIONS';
export const GET_DOGE_HEADERS = 'GET_DOGE_HEADERS';
export const SET_DOGE_CREDENTIALS = 'SET_DOGE_CREDENTIALS';

