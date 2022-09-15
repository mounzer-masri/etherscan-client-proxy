import {BigNumber} from 'bignumber.js'
import * as dtos from '../controllers/dto/AdressesBalancesResponseDto';
import * as etherscanClient from '../data-source-gateway/EtherscanClient';

/** Service Layer */
async function getAccountsBalances(addresses : String[]) : Promise<dtos.BalancesOfAddressesResponseDto>{
    var balancesArr : dtos.AccountBalance[] = [];

    //Etherscan has a limit 20 addresses per call. 
    let addressChunks = chunk(addresses, 20);
    var totalBalance = new BigNumber('0');
    
    for(const addrChunk of addressChunks){
        //Retrieve data from Etherscan.io
        let res : etherscanClient.GetAccountsBalancesResponse = await etherscanClient.getAccountsBalances(addrChunk.toString());
        balancesArr = balancesArr.concat(res.result);
    }

    //Calculate TotalBalance
    balancesArr.forEach(bal => {totalBalance = totalBalance.plus(new BigNumber(bal.balance))})

    let response  : dtos.BalancesOfAddressesResponseDto = new dtos.BalancesOfAddressesResponseDto(balancesArr, totalBalance);
    return response; 
}

const chunk = <T>(arr: T[], size: number): T[][] =>
  [...Array(Math.ceil(arr.length / size))].map((_, i) =>
    arr.slice(size * i, size + size * i)
  );



export = getAccountsBalances;