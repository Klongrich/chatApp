import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {useEffect, useState, useCallback, useReducer} from "react";

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref, set, onValue, get, child, remove} from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers'

import { FirebaseConfig } from "../static/firbaseConfig";

import SendBox from "../components/SendBox";
import Inbox from "../components/Inbox";

import { ParseInboxPayload } from "../utils/parseInboxPayload"


// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const auth = getAuth();
signInAnonymously(auth);
const database = getDatabase();

// Initalize web3 provider options
const providerOptions = {
  walletconnect: {
      package: WalletConnectProvider, // required
      options: {
          infuraId: process.env.INFURA_ID // required - Move to Envoirment Vairable
      },
  },
};

let web3Modal : any
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
  })
}

type StateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
}

type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER'
      provider?: StateType['provider']
      web3Provider?: StateType['web3Provider']
      address?: StateType['address']
      chainId?: StateType['chainId']
    }
  | {
      type: 'SET_ADDRESS'
      address?: StateType['address']
    }
  | {
      type: 'SET_CHAIN_ID'
      chainId?: StateType['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: "",
  chainId: 0x4,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
}

const Home: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const [userMessages, setUserMessages] = useState([{from: "", message: "", time: ""}]);

  // async function parseInboxPayload(payload : any) {
  //   let _rawData = JSON.stringify(payload);
  //   let _temp = _rawData.split("From");
  //   let currentInbox = [{from: "", message: "", time: null}];

  //   for (let i = 0; i < _temp.length; i++) {
  //     let _temp2 = _temp[i].split("\"");

  //     let _dataType = {
  //       from : _temp2[2],
  //       message : _temp2[6],
  //       time : _temp2[10]
  //     };
  //     //@ts-ignore
  //     currentInbox.push(_dataType);
  //   }
  //   //@ts-ignore
  //   setUserMessages(currentInbox);
  //   return(currentInbox);
  // }

  async function ListenForMessages(userAddress: string) {

    console.log(userAddress);
      const listining = ref(database, 'messages/' + userAddress + '/unread');

      console.log("hello");
      onValue(listining, (snapshot) => {
        const data = snapshot.val();

        console.log("Hello again");
        console.log(data);
        ParseInboxPayload(data, setUserMessages);
    });
  }

  // async function readData() {
  //   if (address) {
  //     const dbRef = ref(getDatabase());
  //     let userAddress = address.toLowerCase();

  //     get(child(dbRef, 'messages/' + userAddress + '/unread')).then((snapshot) => {
  //       if (snapshot.exists()) {
  //         let data = snapshot.val();
  //         ParseInboxPayload(data, setUserMessages);
  //       } else {
  //         console.log(address);
  //         //@ts-ignore
  //         setUserMessages([{from: "", message: "", time: null}]);
  //         console.log("No data available");
  //       }
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  //   }
  // }

  // async function getReadMessages() {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `messages/` + address + `/read`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       let data = snapshot.val();
  //       ParseInboxPayload(data, setUserMessages);
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await (await signer.getAddress()).toLowerCase()

    //call function to listen for messages.
    ListenForMessages(address);

    const network = await web3Provider.getNetwork();

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })

    setLoggedIn(true);
  }, [loggedIn])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      setLoggedIn(false);
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider, loggedIn]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  // async function writeData(toAddress : string, message : string) {
  //   const database = getDatabase();
  //   const currentTime = await new Date().getTime()

  //   set(ref(database, 'messages/' + toAddress + '/unread/'+ address+ '/' + currentTime.toString()), {
  //     From: address,
  //     Time: currentTime.toString(),
  //     Message: message
  //   });

  //   console.log("set")
  // }

  // async function updateMessageStatus(from : string, time: any, message: string) {
  //   const db = getDatabase();

  //   remove(ref(db, 'messages/' + address + '/unread/' + from + '/' + time))

  //   set(ref(db, 'messages/' + address + '/read/'+ from + '/' + time), {
  //     From: from,
  //     Time: time,
  //     Message: message
  //   });
  // }

  //Have a create user function than be able to append and add contracts to firestore.
  async function saveContact() {
    const db = getFirestore();

    const docRef = await addDoc(collection(db, "UserName"), {
      address: "TestInputDatas"
    });

    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loggedIn && <>
          <h2> Welcom to Crypto Chat! </h2>
          <h3> Connect your web3 wallet to sign in </h3>
          <button type="button" onClick={() => connect()}>
            Connect
          </button>

          <h4> Logged Out </h4>
      </>}

      {loggedIn && <>
        <h2>Logged In</h2>

        {web3Provider ? ( <>
          <h3> User: {address} </h3>
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button> </>
        ) : (
          <button type="button" onClick={() => connect()}>
            Connect
          </button>
        )}

        <br /> <br />

        {address && <>
          <SendBox userAddress={address} />
        </>}

        {/* <InputAddress type="text"
                placeholder="Input To Address"
                onChange={e => setToAddress(e.target.value)}/>
        <br /> <br />

        <textarea
                placeholder="Input Message"
                cols={40}
                rows={5}
                onChange={e => setMessage(e.target.value)}/>
        <br /> <br />

        <button onClick={() => writeData(toAddress, message)}>
          Send Message
        </button>
        */}

        <p> We noticed this address is not saved in your contacts, would you like to save it?</p>

        <button>
          show contacts
        </button>

        <button onClick={() => saveContact()}>
          test save contact
        </button>

        <br /> <br />

        <Inbox userAddress={address}
              database={database}/>

        {/* <h2>Inbox</h2>

        <ul>
          <li>Read</li>
          <li>unread</li>
        </ul>

        <h3> User: {address} </h3>
        <button onClick={() => GetUnreadMessages(address, setUserMessages)}>
          Show Unread Messages
        </button>

        <br /> <br />

        <button onClick={() => GetReadMessages(address, setUserMessages)}>
          Show Read Messages
        </button>

        {userMessages.map((data) =>
          <>
          {data.time != null && <>
            <div onClick={() => UpdateMessageStatus(data.from, address, data.time, data.message)}>
              <p> From: {data.from} </p>
              <p> Time: {data.time} </p>
              <p> Message: <br /> <br /> <br />{data.message} </p>
            </div>
            <br /> <br />
            </>}
          </>
        )} */}
      </>}
    </div>
  )
}

export default Home
