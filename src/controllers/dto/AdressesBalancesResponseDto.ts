import {BigNumber} from 'bignumber.js'

class AccountBalance {
    account : string;
    balance : string;

    constructor(_account : string, _balance : string){
        this.account = _account;
        this.balance = _balance;
    }
}

class BalancesOfAddressesResponseDto{
    addresses : AccountBalance[];
    totalBalance : BigNumber; 

    constructor(_addresses: AccountBalance[], _totalBalance : BigNumber){
        this.addresses = _addresses;
        this.totalBalance = _totalBalance;
    }
}

export {BalancesOfAddressesResponseDto, AccountBalance};
