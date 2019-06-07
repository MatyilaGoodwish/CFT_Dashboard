'use strict';
function init(e){

let dashboardProps = kendo.observable({
    profile:{
        ID: "0",
        Names:"",
        Surname: "",
        Phone:"",
        Email:"",
        Update: function(){
          function dataSynchronizationProfile(){
            return firebase.auth().onAuthStateChanged(function(user){
              if(user){
                  firebase.firestore().collection("Members").doc(user.uid).set({
                    ID: dashboardProps.get("profile.ID"),
                    Names:dashboardProps.get("profile.Names"),
                    Surname:dashboardProps.get("profile.Surname"),
                    Phone:dashboardProps.get("profile.Phone"),
                    Email: user.email
                  })
                  
                  .catch(function(error){
                    kendo.confirm("Kindly check your fields again");
                  });

                  setTimeout(function(){
                    location.replace("./index.html");
                  },3000);
              }
            })
          }
          dataSynchronizationProfile();
          kendo.alert("Profile Updated");
        }
    },
    user:{
        signout: function(){
            firebase.auth().signOut();
            setTimeout(function(){
                location.replace('index.html');
            }, 3000);
        }
    },
    copyright: {
      information: `${new Date().getFullYear() } - RTE IT Systems, Version 1.0.0 - All rights reserved`
    }
  })

  
  var userProfileStored = kendo.observable({
      activeMembers: []
  });

  function dataSynchronization(){
     firebase.auth().onAuthStateChanged(function(user){
        if(user){
           let userDefined =   firebase.firestore()
            .collection("Members").get()
           userDefined.then(function(snapshot){
             snapshot.forEach(client=>{

               userProfileStored.get("activeMembers").slice([]);

               userProfileStored.get("activeMembers").push(client.data());
             });
            userDefined.catch(function(error){
              kendo.alert("kindly check your internet connectivity or speed");
            })
           })
        }
    })
}

(function(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      let customer =  firebase.firestore().collection("Members").doc(user.uid).get();
      customer.then(function(myprofile){
        let {ID , Email, Phone, Names, Surname } = myprofile.data();
        console.log( ID );
          dashboardProps.set("profile.ID", ID);
          dashboardProps.set("profile.Email", Email );
          dashboardProps.set("profile.Names", Names);
          dashboardProps.set("profile.Surname", Surname);
          dashboardProps.set("profile.Phone", Phone);
      });

      customer.catch(function(error){
        kendo.confirm("Kindly complete your CFT Profile")
      })
    }
  })
}())

dataSynchronization();
 
  firebase.auth().onAuthStateChanged(function(user){
      if(user){
        dashboardProps.set("profile.Email", user.email);
      }else{
          location.replace("../index.html");
      }
  })


  kendo.bind(document.body, dashboardProps);

  let Layout = new kendo.Layout("ui-layout");
 
  let Router = new kendo.Router({
    init: function(){
      Layout.render("#root");
    }
  })

  
  Router.route("/", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("welcome", { model: dashboardProps }));
  })
  Router.route("/profile", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("profile", { model: dashboardProps }));

  })
  Router.route("/downloads", (queryStrings)=>{
    Layout.showIn("#content", new kendo.View("downloads", {model: dashboardProps}));
  })
  Router.route("/members", (queryStrings)=>{ 
    Layout.showIn("#content", new kendo.View("members", {model: dashboardProps}));

    $("#members-registered").kendoGrid({
      dataSource: userProfileStored.activeMembers,
      sortable: true,
      pageSize: 5,
      filterable: true,
      selectable:true
    });
  })

  Router.start();
}


$(document).ready(init.bind(this)); 
