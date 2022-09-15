import {app} from '../src/Server';
import {getAccountsBalances} from '../src/data-source-gateway/EtherscanClient'
import {GetAccountsBalancesResponse} from '../src/data-source-gateway/EtherscanClient'
import {BigNumber} from 'bignumber.js'
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

chai.use(chaiHttp);

const account1Addr = '0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b';
const account2Addr = '0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b';

describe('Testing /get-balances-of-addresses API', () => {
  it('Test1 - Opmitimistc Path / passing all in correct way and expect all to work fine.',async () => {
    

    let addressParam = `${account1Addr},${account2Addr}`;
    
    /** calling Etherscan.io API */
    let etherScanResponse : GetAccountsBalancesResponse = await getAccountsBalances(addressParam);
    
    // asserting Etherscan response. 
    chai.expect(etherScanResponse.status).to.eql("1");
    chai.expect(etherScanResponse.message).to.eql("OK");
    chai.expect(etherScanResponse.result.length).to.eql(2);
  
    let account1Balance = etherScanResponse.result[0].balance;
    let account2Balance = etherScanResponse.result[1].balance;
    let totalBalance = (new BigNumber(account1Balance)).plus(new BigNumber(account2Balance));

    /**Calling etherscan-client-proxy API service */
    return chai.request(app).get(`/get-balances-of-addresses?address=${addressParam}`)
      .then(res => {
        chai.expect(res.text).to.eql(`{"addresses":[{"account":"${account1Addr}","balance":"${account1Balance}"},{"account":"${account2Addr}","balance":"${account2Balance}"}],"totalBalance":"${totalBalance.toString()}"}`);
      })
  })
})