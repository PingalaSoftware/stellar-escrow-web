const Stellar = require('stellar-sdk');
Stellar.Network.useTestNetwork();

const moment = require('moment');
moment().format();

const server = new Stellar.Server('https://horizon-testnet.stellar.org');

export const createContract = async function (pub1, pub2, amount, pub1Secret) {
    const half1 = Math.ceil(amount / 2);
    const escrowKeypair = Stellar.Keypair.random();
    const pub1Keypair = Stellar.Keypair.fromSecret(pub1Secret);

    /**
     * Create an Escrow account with base funds 
     * 
     * */

    // var pub1Account = await server.loadAccount(pub1)
    // const createEscrowTrx = new Stellar.TransactionBuilder(pub1Account)
    //     .addOperation(Stellar.Operation.createAccount({
    //         destination: escrowKeypair.publicKey(),
    //         startingBalance: '10'
    //     }))
    //     .build();

    
    // createEscrowTrx.sign(pub1Keypair);
    // try {
    //     await server.submitTransaction(createEscrowTrx)
    // } catch (error) {
    //     console.log(error);
    // }


    /**
     *  Setup the weight in escrow account to add pub1 and pub2 as signers with equal weight
     *  remove escrow account itself as signer from the account
     *  this will force pub1 and pub2 both to sign any transaction to do anything in escrow account
     */

    // var escrowAccount = await server.loadAccount(escrowKeypair.publicKey());
    // const multiSigTrx = new Stellar.TransactionBuilder(escrowAccount)
    //     // Add pub1 as signer with weight 1
    //     .addOperation(Stellar.Operation.setOptions({
    //         signer: {
    //             ed25519PublicKey: pub1,
    //             weight: 1
    //         }
    //     }))
    //     // set required weight to 2 and set escrow account weight 0 using masterWeight
    //     .addOperation(Stellar.Operation.setOptions({
    //         masterWeight: 0,
    //         lowThreshold: 2,
    //         medThreshold: 2,
    //         highThreshold: 2,
    //         signer: {
    //             ed25519PublicKey: pub2,
    //             weight: 1
    //         }
    //     }))
    //     .build();
    // multiSigTrx.sign(escrowKeypair);
    // try {
    //     await server.submitTransaction(multiSigTrx)
    // } catch (error) {
    //     console.log(error);
    // }

    /**
     *  Send money from pub1 account to Escrow account
     *  Note: We locked escrow account above, thus both pub1 and pub2 will have to sign to
     *  get back the money
     */
    // pub1Account = await server.loadAccount(pub1)
    // const amountTransferTrx = new Stellar.TransactionBuilder(pub1Account)
    //     .addOperation(Stellar.Operation.payment({
    //         destination: escrowKeypair.publicKey(),
    //         asset: Stellar.Asset.native(),
    //         amount: amount.toString()
    //     }))
    //     .build();
    // amountTransferTrx.sign(pub1Keypair);

    // try {
    //     await server.submitTransaction(amountTransferTrx)
    // } catch (error) {
    //     console.log(error);
    // }

    /**
     *  Get date unix timestamps with 5 min difference
     */
    const dateAfter5min = moment().add('5', 'm').unix();
    const dateAfter10min = moment().add('10', 'm').unix();
    const dateAfter15min = moment().add('15', 'm').unix();
    const dateAfter30min = moment().add('30', 'm').unix();

    /**
     *  Transaction from escrow account to Pub2 account with half of the funds
     *  after 5 mins only
     *  This transaction now can only be submitted after signatures from pub1 and pub2
     */

    // escrowAccount = await server.loadAccount(escrowKeypair.publicKey());
    // const payAfter5minTrx = new Stellar.TransactionBuilder(escrowAccount, {
    //     timebounds: {
    //         minTime: dateAfter5min,
    //         maxTime: dateAfter30min
    //     }}
    // ).addOperation(Stellar.Operation.payment({
    //     destination: pub2,
    //     asset: Stellar.Asset.native(),
    //     amount: half1.toString()
    // }))
    // .build();

    /**
     *  Transaction from escrow account to Pub2 account with leftover money
     *  This transaction can happen after 10 mins only
     *  This transaction now can only be submitted after signatures from pub1 and pub2
     */
    // const payAfter10minTrx = new Stellar.TransactionBuilder(escrowAccount, {
    //     timebounds: {
    //         minTime: dateAfter10min,
    //         maxTime: dateAfter30min
    //     }
    // }).addOperation(Stellar.Operation.accountMerge({
    //     destination: pub2,
    // })).build();



    /**
     *  Transaction to recover the money if pub2 has not used any transactions
     *  This can only submited after 15 mins
     *  The sequence number of this transaction is equal to the sequence number of first transaction
     */
    // escrowAccount = await server.loadAccount(escrowKeypair.publicKey());
    // const recoverMoneyTrx = new Stellar.TransactionBuilder(escrowAccount, {
    //     timebounds: {
    //         minTime: dateAfter15min,
    //         maxTime: dateAfter30min
    //     }
    // }).addOperation(Stellar.Operation.accountMerge({
    //     destination: pub1,
    // })).build();

    return {
        envelope1: payAfter5minTrx.toEnvelope().toXDR().toString("base64"),
        envelope2: payAfter10minTrx.toEnvelope().toXDR().toString("base64"),
        envelope3: recoverMoneyTrx.toEnvelope().toXDR().toString("base64")
    }
}

export const signEnvelope = function(envelope, secret){
    var keypair = Stellar.Keypair.fromSecret(secret);
    const transaction = new Stellar.Transaction(envelope);
    transaction.sign(keypair);

    return transaction.toEnvelope().toXDR().toString("base64");
}

export const submitTransaction = async function(envelope){
    const transaction = new Stellar.Transaction(envelope);
    return await server.submitTransaction(transaction)
}
