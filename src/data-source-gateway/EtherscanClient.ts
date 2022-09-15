import fetch from 'node-fetch';
import log from '../Logging';
require('dotenv').config()
const NAMESPACE = 'Etherscan-Client'

export type AccountBalanceType = {
    account : string;
    balance : string;
};

export type GetAccountsBalancesResponse = {
    status: string;
    message: string;
    result: AccountBalanceType[];
};

async function getAccountsBalances(address : string) : Promise<GetAccountsBalancesResponse> {
  try {
    // 👇️ const response: Response
    let url = `${process.env.ETHERSCAN_ENDPOINT_URL}/api`;
        url += `?module=account`;
        url += `&action=balancemulti`;
        url += `&address=${address}`;
        url += `&tag=latest`;
        url += `&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const response = await fetch(url , {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
 
    const result = (await response.json()) as GetAccountsBalancesResponse;

    log.info(NAMESPACE, `Result From Etherscan.io is: \n`,  result);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      log.error(NAMESPACE, `error message: , ${error.message}`);
      throw new Error(`error message: ${error.message}`);
    } else {
      log.error(NAMESPACE, `unexpected error: , ${error}`);
      throw new Error(`An unexpected error occurred`);
    }
  }
}

export {getAccountsBalances};