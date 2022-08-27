var web3 = require('web3')// ethers alternative
const axios = require('axios')
const ABI = require('../abi/dai')// dai contract abi


const Web3 = new web3("https://mainnet.infura.io/v3/b3aa0147f2614ce38cd33ac545149f06")//provider
const daiToUsd = async(daiAmount) =>{
    try{
        const {data} = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd")// get price dai & usd
        const daiPrice = data.dai.usd// calculate conversion rate
        const equivalentDai = (((daiAmount/daiPrice) / 1e18).toFixed(2))// convert account balance to dai to 2dp
        console.log(equivalentDai)
        return equivalentDai
    } catch(error){
        console.log(error)
    }
}
const DAIContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
//const infura_url = "https://mainnet.infura.io/v3/b3aa0147f2614ce38cd33ac545149f06"
const getBalance = async(Address) => {
    try{
        const contract = new Web3.eth.Contract(ABI, DAIContractAddress)//read contract using abi & dai contract address
        const balance = await contract.methods.balanceOf(Address).call()// use balanceOf gx to get (user Address balance)
        console.log("DAI", balance)
        let  price =  await daiToUsd(balance)// call daiToUsd function and pass in the address
        console.log("$", price)
        return {balance, price}
    } catch (error){
        console.log(error)
    }
}
// getBalance("0xad02e683a43F1Dee052301C6D78436e0eF15122E")
export default getBalance;
