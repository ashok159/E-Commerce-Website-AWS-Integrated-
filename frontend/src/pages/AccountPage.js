import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AccountPage.css";
import { Link } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import {Amplify} from "aws-amplify"
import awsExports from "../components/aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";
import * as AWS from 'aws-sdk';

function AccountPageLoginIn() {
  const [user, setUser] = useState(null);

  Amplify.configure({
    Auth: {
        region: awsExports.REGION,
        userPoolId: awsExports.USER_POOL_ID,
        userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
    }
  })

  const formFields = {
    signUp: {
      username: {
        order: 2
      },
      email: {
        order: 1
      },
      name: {
        order: 3
      },
      birthdate: {
        order: 4
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
   }

  const signUpAttributes=['username', 'birthdate', 'name', "email"]

  const checkUserLegacy = (username) => {
    const dynamodb = new AWS.DynamoDB({
      region: '...',
      endpoint: '...',
      accessKeyId: "...",
      secretAccessKey: "..."
    });
    const getParams = {
      TableName: 'nozama_table1',
      Key: {
        'username': {S: username}
      }
    };
    dynamodb.getItem(getParams, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if(data.Item){
          for(let i = 0; i < data.Item.cartItems.L.length; i++){
            console.log(data.Item.cartItems.L[i].N)
          }
        }
        else{
          console.log("NOOOO")
          AWS.config.update({
            region: '...',
            endpoint: '...',
            accessKeyId: "...",
            secretAccessKey: "..."
          });
          const docClient = new AWS.DynamoDB.DocumentClient();
          const putParams = {
            TableName: 'nozama_table1',
            Item: {
              username: username,
              cartItems: [] //test data
              // Add more attributes as needed
            },
          };
          docClient.put(putParams, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              console.log(data);
            }
          });
        }
      }
    });
  }
  
  // {console.log(Auth.currentAuthenticatedUser())}
  function SetLogin(userString)
  {
    localStorage.setItem('isLoggedIn', true);
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    localStorage.setItem('currentUser', userString);
    let currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    console.log(isLoggedIn);
  }

  function Leave()
  {
    // return new Promise((resolve, reject) =>{
      localStorage.setItem('isLoggedIn', false);
      let isLoggedIn = localStorage.getItem('isLoggedIn');
      localStorage.setItem('currentUser', null);
      let currentUser = localStorage.getItem('currentUser');
      console.log(currentUser);
      console.log(isLoggedIn);
      // resolve( );
    // })
  }

  return (
    <div className="signInBox">
      <Authenticator formFields={formFields} signUpAttributes={signUpAttributes}>
              {({ signOut, user }) => (
                  <div className="signInContainerCognito">
                      {/* <p>Welcome {user.username}</p> */}
                      <p className="welcomeMessageCognito"><span className="highlight">Welcome</span> {(user.attributes.name)}</p>
                      {SetLogin(user.username)}
                      <p className="welcomeMessageSubHeading">{(user.attributes.email)}</p>
                      <button className="signOutButtonCognito"
                        onClick={async () => {
                          await Auth.signOut();
                          Leave();
                          }}
                        >
                          Sign out
                      </button>
                      {checkUserLegacy(user.username)}
                  </div>
              )}
      </Authenticator>
    </div>
  );
}

export default AccountPageLoginIn;