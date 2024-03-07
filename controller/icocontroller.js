require("dotenv").config();
const Web3 = require("web3");
const { abiICO } = require("./abifile");
const icoContractAddress = process.env.ICO_CONTRACT_ADDRESS;
const wallet = process.env.MY_ACCOUNT_ADDRESS;
const vishalAddress = process.env.VISHAL;

const tokenAddress = process.env.TOKEN_ADDRESS;
const tokenAmount = 100;
const pricePerToken = 10;
const icoID = 2;
const ethvalue = 100;
const newPrice = 30;

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.PROVIDER)
);
const contract = new web3.eth.Contract(abiICO, icoContractAddress);

module.exports = {
  getICO: async (req, res) => {
    try {
      const result = await contract.methods.NumberOfICO().call();
      console.log(result);
      res.json(result);
      // console.log(result);
      res.end();
    } catch (err) {
      res.json(err);
      res.end();
      console.log(err);
    }
  },

  getallICO: async (req, res) => {
    try {
      const i = await contract.methods.NumberOfICO().call();
      let abc = [];
      for (let index = 0; index < i; index++) {
        const result = await contract.methods.ICOmap(index + 1).call();
        abc.push(result);
      }
      // const iid = req.params.id;
      // const result = await contract.methods.ICOmap(iid).call();
      console.log(abc);
      res.json(abc);
      res.end();
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      console.log(err);
      res.json(err);
      res.end();
    }
  },

  gettokenBalance: async (req, res) => {
    try {
      const result = await contract.methods.tokenBalance(icoID).call();
      const result2 = Web3.utils.fromWei(result, "ether");
      console.log(result2);
      res.json(result2);
      res.end();
    } catch (err) {
      console.log(err);
      res.json(err);
      res.end();
    }
  },

  getMyTokenBalance: async (req, res) => {
    try {
      const result = await contract.methods
        .myTokenBalance(icoID)
        .call({ from: vishalAddress });
      const result2 = Web3.utils.fromWei(result, "ether");
      console.log(result2);
      res.json(result2);
      res.end();
    } catch (err) {
      console.log(err);
      res.json(err);
      res.end();
    }
  },

  getEvents: async (req, res) => {
    try {
      const events = await contract.getPastEvents(
        { fromBlock: "0" },
        (err, event) => {
          console.log(event.length);
          // res.json(event.length)
        }
      );
      console.log(events);
      res.json(events);
      res.end();
    } catch (err) {
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
        data: contract.methods
          .createNewICO(
            tokenAddress,
            startTime,
            endTime,
            tokenAmount,
            pricePerToken
          )
          .encodeABI(),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.PRIVATE_KEY
      );

      // Send the signed transaction to the network
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
      res.json(receipt);
      res.end();
    } catch (err) {
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
        data: contract.methods.buyToken(icoID).encodeABI(),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.VISHAL_PRIVATE_KEY
      );

      // Send the signed transaction to the network
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
      res.json(receipt);
      res.end();
    } catch (err) {
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
        data: contract.methods.sellToken(icoID, tokenAmount).encodeABI(),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.VISHAL_PRIVATE_KEY
      );

      // Send the signed transaction to the network
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
      res.json(receipt);
      res.end();
    } catch (err) {
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
        data: contract.methods.newRate(icoID, newPrice).encodeABI(),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.PRIVATE_KEY
      );

      // Send the signed transaction to the network
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
      res.json(receipt);
      res.end();
    } catch (err) {
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
        data: contract.methods.etherWithdraw().encodeABI(),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.PRIVATE_KEY
      );

      // Send the signed transaction to the network
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
      res.json(receipt);
      res.end();
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      console.log(err);
      res.json(err);
      res.end();
    }
  },

  getMyInstallmentToken: async (req, res) => {
    try {
      const result = await contract.methods
        .myInstallmentToken(icoID)
        .call({ from: vishalAddress });
      console.log(result);
      res.json(result);
      res.end();
    } catch (err) {
      console.log(err);
      res.json(err);
      res.end();
    }
  },

  getMyAllInstallment: async (req, res) => {
    try {
      const i = await contract.methods.NumberOfICO().call();
      let abc = [];
      for (let index = 0; index < i; index++) {
        const result = await contract.methods
          .myInstallmentToken(index + 1)
          .call({ from: req.params.address });
        abc.push(result);
      }
      // const iid = req.params.id;
      // const result = await contract.methods.ICOmap(iid).call();
      console.log(abc);
      res.json(abc);
      res.end();
    } catch (err) {
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
    } catch (err) {
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
        data: contract.methods.GetInstallment(icoID).encodeABI(),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        process.env.VISHAL_PRIVATE_KEY
      );

      // Send the signed transaction to the network
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
      res.json(receipt);
      res.end();
    } catch (err) {
      console.log(err);
      res.json(err);
      res.end();
    }
  },
};
