'use strict';
firebase.auth().onAuthStateChanged(function(user){
          function AccountsManager(){
                    this.email ;
                    this.setUser = function(user){
                              this.email = user.email;
                    }
                    this.notUser = function(state){
                              console.clear();
                              console.log("user not logged in")
                    }
                    this.getUserEmail = function(){
                              return this.email;
                    }
          }
          if(user){
                    new AccountsManager().setUser(user);
                    console.log( new AccountsManager().getUserEmail()); 
          }else{
                    new AccountsManager().isUser(null);
          }
}) 