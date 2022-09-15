import {Request, Response, NextFunction} from 'express';
import logging from '../Logging';
import {BalancesOfAddressesResponseDto} from './dto/AdressesBalancesResponseDto';
import getAccountsBalances from '../services/AccountReporterService';

const NAMESPACE = 'Account-Balances-Controller'


const getAccountsBalancesApi = async (req : Request,  res : Response, next : NextFunction) => {
    logging.info(NAMESPACE, `getAccountsBalancesApi called`);

     if(req.query.address === undefined){
        res.status(400).send('Address parameter is missing!');
     }

    let address : String = req.query.address as String;
    let addressArr = address.split(','); 

    if(addressArr.length > 100){
        res.status(414).send('Cannot process >100 address at once!');
    }

    let result : BalancesOfAddressesResponseDto = await getAccountsBalances(addressArr);
    logging.info(NAMESPACE, `getAccountsBalancesApi Response is ready: \n`, result);
    return res.status(200).json(result);
}


export default{getAccountsBalancesApi};