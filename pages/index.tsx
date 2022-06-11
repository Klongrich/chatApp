import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';

import {useEffect, useState, useCallback, useReducer} from "react";

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { addDoc, collection, getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore/lite";

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';

import { GetUserTransactions } from "../utils/getUserTransacitons";
import { Inbox } from "../components/Inbox";
import { ContactBox } from "../components/ContactBox";
import { NewContact } from "../components/NewContact";

import { NewMessageScreen } from "../components/NewMessage";
import { ChatRoom } from "../components/ChatRoom";
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import { Message } from "@styled-icons/boxicons-regular/Message";

import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";

import { slide as Menu } from 'react-burger-menu'
import { deleteField } from '@firebase/firestore';

const FirebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
signInAnonymously(auth);
const database = getDatabase();

// Initalize web3 provider options
const providerOptions = {
  walletconnect: {
      package: WalletConnectProvider,
      options: {
          infuraId: process.env.INFURA_ID
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

const HeaderBox = styled.div`
  color: white;
  background-color: black;

  font-family: SanFransico;

  margin-top: -20px;
  padding-top: 30px;
  padding-bottom: 10px;

  h2 {
    margin-left: 20px;
    font-size: 28px;
    margin-bottom: 37px;
  }

  ul {
    list-style-type: none;
    padding-bottom: 20px;
    margin-bottom: 30px;
    margin-left: -30px;
  }

  li {
    display: inline-block;
    font-size: 19px;
    padding-left: 12px;
    padding-right: 12px;

    color: #d8d8d8;

    :hover {
      color: blue;
      cursor: pointer;
    }
  }
`

const LogInBox = styled.div`
  background-color: black;
  color: white;

  text-align: center;
  height: 1000px;
  margin-top: -20px;

  padding-top: 150px;

  h2 {
    padding-bottom: 20px;
    font-size: 28px;
  }

  h3 {
    padding-bottom: 20px;
    font-size: 22px;
  }

  button {
    width: 220px;
    height: 32px;
    padding: 2px;
    margin-bottom: 20px;
  }
`

const NewMessageBox = styled.div`
  border-radius: 50%;
  width: 65px;
  height: 65px;

  padding-left: 13px;
  padding-top: 15px;

  background-color: #737373;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);

  margin-top: -410px;
  margin-left: 70%;
`

const LogOutArrow = styled.div`
  text-align: right;
  padding-top: 30px;
  padding-right: 32px;
  margin-bottom: -53px;
`

const NewMessageArrowBox = styled.div`
  margin-bottom: -50px;
  padding-top: 40px;
  background-color: black;
  padding-left: 25px;
`

const BackArrowBox = styled.div`
  background-color: black;
  padding-left: 7%;

  padding-top: 30px;
`

const AddContactBox = styled.div`
  margin-top: -30px;
  border: 1px solid black;
  background-color: black;

  padding-left: 83%;

  margin-bottom: -55px;
`

const NewContactBackArrowBox = styled.div`
  border: 1px solid black;
  background-color: black;

  padding-left: 83%;
`

const AddContactButton = styled.div`
  border-radius: 50%;
  width: 65px;
  height: 65px;

  padding-left: 13px;
  padding-top: 15px;

  background-color: #737373;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25);

  margin-top: -410px;
  margin-left: 70%;
`

const EditMessageBox = styled.div`
  background-color: yellow;
`

var burgerStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: 'black'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#363636',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    borderRadius: '30px'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: 'white',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
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

  const [cutUserAddress, setCutUserAddress] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [chatRoom, setChatRoom] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [newContact, setNewContact] = useState(false);

  const [editMessages, setEditMessages] = useState(false);

  const [chatToAddress, setChatToAddress] = useState("");
  const [chatFromAddress, setChatFromAddress] = useState("");

  const [toAlias, setToAlias] = useState("");

  //Hot fix for rendering shit in typescript / next
  const [txsData, setTxsData] = useState([{blocknumber : "", address: ""}]);

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

    const cutUserAddress = await address.substring(0, 5) + "...." + address.substring(address.length - 5, address.length)
    setCutUserAddress(cutUserAddress);

    const network = await web3Provider.getNetwork();

    //Fecthing recent transcations the users wallet has made
    //Should be moved to Contacts, compnents as a "reccomened" or "recent"
    let txsDatas = await GetUserTransactions(address);
    setTxsData(txsDatas);

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
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
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

  //Have a create user function than be able to append and add contracts to firestore.
  async function saveContact() {
    const db = getFirestore();

    const docRef = await addDoc(collection(db, "UserName"), {
      address: "TestInputDatas"
    });
    console.log("Document written with ID: ", docRef.id);
  }

  function updateToChatRoom(toAddress: string, fromAddress: string, toAlias: string ) {
    setChatRoom(true);
    setChatToAddress(toAddress);
    setChatFromAddress(fromAddress);
    setToAlias(toAlias);
  }

  async function deleteContact(addressToDelete : string) {
    //@ts-ignore
    const docRef = doc(db, address, "Inbox");
    const docSnap = await getDoc(docRef);

    let _data = docSnap.data();

    if (_data) {

      console.log(_data);

      for (let e = 0; e < 10; e++) {
        console.log(_data[e]);
        if (_data[e] == addressToDelete) {
          console.log("Found Address");
          _data[e] = "Free"
        }
      }

      await setDoc(docRef, _data);
      console.log("Updated Doc");
      setNewContact(false);
      setEditMessages(false);
      setChatRoom(false);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Chat</title>
        <meta name="description" content="Next Generation Chat App!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loggedIn && <>
        <LogInBox>
          <h2> Welcom to Crypto Chat! </h2>
          <h3> Connect your web3 wallet to sign in </h3>
          <button type="button" onClick={() => connect()}>
            Connect
          </button>
          <h4> Logged Out </h4>
        </LogInBox>
      </>}

      {loggedIn && <>
        {newMessage && <>
          <NewMessageArrowBox>
            <ArrowBack size={28} color="white" onClick={() => setNewMessage(false)} />
          </NewMessageArrowBox>

          {address && <>
            <NewMessageScreen userAddress={address}
                              updateToChatRoom={updateToChatRoom}
                              setNewMessage={setNewMessage}
                              db={db}
                              />
          </>}

        </>}

        {!newMessage && <>
          {!chatRoom && <>
            <HeaderBox>
              <LogOutArrow>
                <ArrowBack size={30} color="white" onClick={() => disconnect()} />
              </LogOutArrow>
              <h2>Messages</h2>
              <ul>
                <li onClick={() => setShowContacts(false)}>All</li>
                <li onClick={() => setShowContacts(true)}>Contacts</li>
                <li onClick={() => setNewMessage(true)}>+</li>
              </ul>
            </HeaderBox>

            {!showContacts && <>
              <Inbox userAddress={address}
                    database={database}
                    updateToChatRoom={updateToChatRoom}
                    db={db}
              />
              <NewMessageBox>
                <Message size={40} color="white" onClick={() => setNewMessage(true)} />
              </NewMessageBox>
            </>}

            {showContacts && <>
              <ContactBox userAddress={address} db={db} updateToChatRoom={updateToChatRoom} />

                <AddContactButton onClick={() => setNewContact(true)}>
                  <Add size={35} color="white" />
                </AddContactButton>
            </>}
          </>}

          {chatRoom && <>
            {!newContact && <>
              <BackArrowBox>
                <ArrowBack size={28} color="white" onClick={() => setChatRoom(false)} />
              </BackArrowBox>

              <AddContactBox>
                <Add size={28} color="white" onClick={() => setNewContact(true)}  />
              </AddContactBox>

              <ChatRoom toAddress={chatToAddress}
                      fromAddress={chatFromAddress}
                      database={database}
                      db={db}
                      toAlias={toAlias} />
            </>}

            {/* Update To Chat Room */}
            {newContact && <>
              <BackArrowBox>
                <ArrowBack size={28} color="white" onClick={() => setNewContact(false)} />
              </BackArrowBox>

              <AddContactBox>
                <ThreeDotsVertical size={28} color="white" onClick={() => setEditMessages(!editMessages)} />
              </AddContactBox>

              {editMessages && <>
              <EditMessageBox>
                <Menu right styles={burgerStyles} width={'70%'} isOpen={editMessages} onClose={() => setEditMessages(false)}>
                  <p onClick={() => deleteContact(chatToAddress)}>Delete Messages</p>
                  <p>Delete Contact</p>
                  <p>Edit Contact</p>
                </Menu>
              </EditMessageBox>
              </>}

              <NewContact userAddress={address}
                          contactPublicKey={chatToAddress}
                          db={db}
                          setNewContact={setNewContact}
                          updateToChatRoom={updateToChatRoom}
                          setEditMessages={setEditMessages}
              />
            </>}
          </>}
        </>}
      </>}
    </div>
  )
}

export default Home
