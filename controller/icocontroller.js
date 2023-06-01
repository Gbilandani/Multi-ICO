require('dotenv').config()
const Web3 = require('web3');
const icoContractAddress = process.env.ICO_CONTRACT_ADDRESS;
const wallet = process.env.MY_ACCOUNT_ADDRESS;
const vishalAddress = process.env.VISHAL;

const abiICO = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "icoID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "FundsGiven",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "RefundFunds",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "ICOTokenBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "icoID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "FundsGiven",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "ICOTokenSold",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "icoID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "currentTime",
				"type": "uint256"
			}
		],
		"name": "NewICOCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawEthers",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "icoID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "TokenAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "installmentTokentransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "icoID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "oldPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "priceChange",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			}
		],
		"name": "GetInstallment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "IcoId",
				"type": "uint256"
			}
		],
		"name": "ICOInstallmentToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "InstallmentTokens",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "icoID",
				"type": "uint256"
			}
		],
		"name": "ICOmap",
		"outputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pricePerToken",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NumberOfICO",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			}
		],
		"name": "buyToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerToken",
				"type": "uint256"
			}
		],
		"name": "createNewICO",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "etherBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "etherWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			}
		],
		"name": "myInstallmentToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "installmentToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "installmentTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			}
		],
		"name": "myTokenBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "newRate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			}
		],
		"name": "returnICOToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokenAmount",
				"type": "uint256"
			}
		],
		"name": "sellToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_icoID",
				"type": "uint256"
			}
		],
		"name": "tokenBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalInstallmentToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenAmount = 100;
const pricePerToken = 10;
const icoID = 2;
const ethvalue = 100;
const newPrice = 30;

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.PROVIDER));
const contract = new web3.eth.Contract(abiICO, icoContractAddress);

module.exports = {
	getICO: async (req, res) => {
		try {
			const result = await contract.methods.NumberOfICO().call();
			console.log(result);
			res.json(result);
			// console.log(result);
			res.end();
		}
		catch (err) {
			res.json(err);
			res.end();
			console.log(err);
		}
	},

	getallICO: async (req, res) => {
		try {
			const i = await contract.methods.NumberOfICO().call();;
			let abc = [];
			for (let index = 0; index < i; index++) {
				const result = await contract.methods.ICOmap(index + 1).call();;
				abc.push(result);
			}
			// const iid = req.params.id;
			// const result = await contract.methods.ICOmap(iid).call();
			console.log(abc);
			res.json(abc);
			res.end();
		}
		catch (err) {
			res.json(err);
			res.end();
			console.log(err);
		}
	},

	getICOMap: async (req, res) => {
		try {
			const iid = req.params.id;
			const result = await contract.methods.ICOmap(iid).call();
			console.log(result);
			res.json(result);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	getethBalance: async (req, res) => {
		try {
			const result = await contract.methods.etherBalance().call();
			console.log(result);
			res.json(result);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	gettokenBalance: async (req, res) => {
		try {
			const result = await contract.methods.tokenBalance(icoID).call();
			const result2 = Web3.utils.fromWei(result, 'ether');
			console.log(result2);
			res.json(result2);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	getMyTokenBalance: async (req, res) => {
		try {
			const result = await contract.methods.myTokenBalance(icoID).call({ from: vishalAddress });
			const result2 = Web3.utils.fromWei(result, 'ether');
			console.log(result2);
			res.json(result2);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	getEvents: async (req, res) => {
		try {
			const events = await contract.getPastEvents({ fromBlock: '0' }, (err, event) => {
				console.log(event.length);
				// res.json(event.length)
			});
			console.log(events);
			res.json(events);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	CreateICO: async (req, res) => {
		try {
			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Get the nonce for the sender address
			const nonce = await web3.eth.getTransactionCount(wallet);

			const startTime = 0;
			const endTime = 0;
			const tx = {
				from: wallet,
				to: icoContractAddress,
				gasPrice: gasPrice,
				gasLimit: 400000,
				nonce: nonce,
				data: contract.methods.createNewICO(tokenAddress, startTime, endTime, tokenAmount, pricePerToken).encodeABI()
			};
			// Sign the transaction with the sender's private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

			// Send the signed transaction to the network
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt);
			res.json(receipt);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	BuyICOToken: async (req, res) => {
		try {
			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Get the nonce for the sender address
			const nonce = await web3.eth.getTransactionCount(vishalAddress);

			const tx = {
				from: vishalAddress,
				to: icoContractAddress,
				value: ethvalue,
				gasPrice: gasPrice,
				gasLimit: 400000,
				nonce: nonce,
				data: contract.methods.buyToken(icoID).encodeABI()
			};
			// Sign the transaction with the sender's private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.VISHAL_PRIVATE_KEY);

			// Send the signed transaction to the network
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt);
			res.json(receipt);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	SellICOToken: async (req, res) => {
		try {
			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Get the nonce for the sender address
			const nonce = await web3.eth.getTransactionCount(vishalAddress);

			const tx = {
				from: vishalAddress,
				to: icoContractAddress,
				gasPrice: gasPrice,
				gasLimit: 400000,
				nonce: nonce,
				data: contract.methods.sellToken(icoID, tokenAmount).encodeABI()
			};
			// Sign the transaction with the sender's private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.VISHAL_PRIVATE_KEY);

			// Send the signed transaction to the network
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt);
			res.json(receipt);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}

	},

	ChangePrice: async (req, res) => {
		try {
			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Get the nonce for the sender address
			const nonce = await web3.eth.getTransactionCount(wallet);

			const tx = {
				from: wallet,
				to: icoContractAddress,
				gasPrice: gasPrice,
				gasLimit: 100000,
				nonce: nonce,
				data: contract.methods.newRate(icoID, newPrice).encodeABI()
			};
			// Sign the transaction with the sender's private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

			// Send the signed transaction to the network
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt);
			res.json(receipt);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	EtherWithdraw: async (req, res) => {
		try {
			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Get the nonce for the sender address
			const nonce = await web3.eth.getTransactionCount(wallet);

			const tx = {
				from: wallet,
				to: icoContractAddress,
				gasPrice: gasPrice,
				gasLimit: 100000,
				nonce: nonce,
				data: contract.methods.etherWithdraw().encodeABI()
			};
			// Sign the transaction with the sender's private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

			// Send the signed transaction to the network
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt);
			res.json(receipt);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	// Installment Functions
	getTotalInstallmentToken: async (req, res) => {
		try {
			const result = await contract.methods.totalInstallmentToken().call();
			console.log(result);
			res.json(result);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	getCurrentTime: async (req, res) => {
		try {
			const result = await contract.methods.currentTime().call();
			console.log(result);
			res.json(result);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	getMyInstallmentToken: async (req, res) => {
		try {
			const result = await contract.methods.myInstallmentToken(icoID).call({ from: vishalAddress });
			console.log(result);
			res.json(result);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	getMyAllInstallment: async (req, res) => {
		try {
			const i = await contract.methods.NumberOfICO().call();;
			let abc = [];
			for (let index = 0; index < i; index++) {
				const result = await contract.methods.myInstallmentToken(index + 1).call({ from: req.params.address });;
				abc.push(result);
			}
			// const iid = req.params.id;
			// const result = await contract.methods.ICOmap(iid).call();
			console.log(abc);
			res.json(abc);
			res.end();
		}
		catch (err) {
			res.json(err);
			res.end();
			console.log(err);
		}
	},

	getICOInstallment: async (req, res) => {
		try {
			const result = await contract.methods.ICOInstallmentToken(icoID).call();
			console.log(result);
			res.json(result);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},

	Installment: async (req, res) => {
		try {
			// Get the current gas price
			const gasPrice = await web3.eth.getGasPrice();

			// Get the nonce for the sender address
			const nonce = await web3.eth.getTransactionCount(vishalAddress);

			const tx = {
				from: vishalAddress,
				to: icoContractAddress,
				gasPrice: gasPrice,
				gasLimit: 400000,
				nonce: nonce,
				data: contract.methods.GetInstallment(icoID).encodeABI()
			};
			// Sign the transaction with the sender's private key
			const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.VISHAL_PRIVATE_KEY);

			// Send the signed transaction to the network
			const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
			console.log(receipt);
			res.json(receipt);
			res.end();
		}
		catch (err) {
			console.log(err);
			res.json(err);
			res.end();
		}
	},
}