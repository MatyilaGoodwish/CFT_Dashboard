'use strict';
function init(e){
let dashboardProps = kendo.observable({
          ourMembers: 0,
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
                              location.replace("./index.php");
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
                          location.replace('./index.php');
                          //kendo.confirm("You are being redirected to website");
                      }, 3000);
                  }
           },
              copyright: {
                     information: `${new Date().getFullYear() } - Powered by RTE`
              }
  });

  
  var userProfileStored = kendo.observable({
      activeMembers: []
  });

  (function(){
          firebase.firestore()
          .collection("Members")
          .get()
          .then(onData)
          .catch(onError);
          function onError(error){
                    console.log(error);
          }
          function onData(snap){
                    dashboardProps.set("ourMembers", snap.size);
                    console.clear();
          }
}())
  
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

dataSynchronization();

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


 
  firebase.auth().onAuthStateChanged(function(user){
      if(user){
        dashboardProps.set("profile.Email", user.email);
      }else{
          location.replace("../index.php");
      }
  })


  kendo.bind(document.body, dashboardProps);

  let Layout = new kendo.Layout("ui-layout");
  let Router = new kendo.Router({
              init: function(){
                Layout.render("#root");
              }
  });

  
  Router.route("/", (queryStrings)=>{
          Layout.showIn("#content", new kendo.View("welcome", { model: dashboardProps }));
  })
  Router.route("/profile", (queryStrings)=>{
          Layout.showIn("#content", new kendo.View("profile", { model: dashboardProps }));

  })
  Router.route("/downloads", (queryStrings)=>{
          Layout.showIn("#content", new kendo.View("downloads", {model: dashboardProps}));
  })



  /**
   * Donation & Pledges App
   */
Router.route("/donation", (queryStrings)=>{
          Layout.showIn("#content", new kendo.View(`
          <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">Donation & Pledges</h5>
                     <p class="text-muted lead mb-4">
                              Help us make that small change in our community
                     </p>
                     <a href="#/donation/pledge" class="btn rounded shadow-sm p-3" > Pledge Now </a>
                </div>
            </div>
        </div>
          `, {model: dashboardProps}));
  })
Router.route("/donation/pledge", function(queryStrings){
          Layout.showIn("#content", new kendo.View(`
            <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">Donation & Pledges</h5>
                     <p class="text-muted lead mb-4">
                              Help us make that small change in our community
                     </p>
                     <a href="#/donation/pledge/financials" class="mx-3 btn rounded shadow-sm p-3" > Financial Pledge </a>

                     <a href="#/donation/pledge/belongings" class="mx-3 btn rounded shadow-sm p-3" > Pledge Personal Items </a>
                </div>
            </div>
        </div>
          `, { model: dashboardProps}))
})
Router.route("/donation/pledge/belongings", function(queryStrings){
          Layout.showIn("#content", new kendo.View(`
            <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">Donation & Clothing </h5>
                     <p class="text-muted lead mb-4">
                              Help us make that small change in our community, use our postal address or call our hotline to have the items collected by our collection agent
                     </p>
                        <p class="text-muted lead mb-4">
                              Physical & Postal Address
                     </p>
                     <div class="my-3">
                              <ul class="" style="list-style-type:none;">
                                        <li class="nav-tem m-2">Building: </li>
                                        <li class="nav-tem m-2">Complex: </li>
                                        <li class="nav-tem m-2">City: </li>
                                        <li class="nav-tem m-2">Region: </li>
                                        <li class="nav-tem m-2">Postal Code: </li>
                              </ul>
                     </div>
                     <a href="#/donation" class="mx-3 btn rounded shadow-sm p-3" > Back </a>

                     <a href="#/donation/pledge/financials" class="mx-3 btn rounded shadow-sm p-3" > Pledge Finance </a>

                     <a href="#/donation/pickup" class="mx-3 btn rounded shadow-sm p-3" > Arrange for Courier </a>
                </div>
            </div>
        </div>
          `, { model: dashboardProps}))
})
Router.route("/donation/pledge/financials", function(queryStrings){
          Layout.showIn("#content", new kendo.View(`
            <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">Financial Pledge</h5>
                     <p class="text-muted lead mb-4">
                              You need to contact our help and support to make financial obligations for an arrangement 
                     </p>
                     
                   
                     <a href="#/donation/banking" class="mx-3 btn rounded shadow-sm p-3" > Banking Information </a>
                </div>
            </div>
        </div>
          `, { model: dashboardProps}))
})
Router.route("/donation/banking", function(queryStrings){
          Layout.showIn("#content", new kendo.View(`
            <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">CFT Banking Details</h5>
                     <p class="text-muted lead mb-4">
                              Our banking information 
                     </p>
                     <div class="my-3">
                              <ul class="" style="list-style-type:none;">
                                        <li class="nav-tem m-2">Name of Bank: </li>
                                        <li class="nav-tem m-2">Account Holder:  CFT Organization </li>
                                        <li class="nav-tem m-2">Account Number: </li>
                                        <li class="nav-tem m-2">Branch Name: </li>
                                        <li class="nav-tem m-2">Branch Code: </li>
                              </ul>
                     </div>
                   
                     <a href="#/donation" class="mx-3 btn rounded shadow-sm p-3" > Back </a>
                </div>
            </div>
        </div>
          `, { model: dashboardProps}))
})
Router.route("/donation/pickup", function(queryStrings){
          Layout.showIn("#content", new kendo.View(`
            <div class="container p-2">
            <div class="row">
                <div class="col-md-12">
                     <h5 class="display-4  text-muted">Item Collection & Packaging </h5>
                     <p class="text-muted lead mb-4">
                              Courier Arrangement from Donor enter details about the parcels on the spreadsheet complete with totals
                     </p>
                     <div class="my-3 ">
                             
                                        
                                                  <div data-role="spreadsheet"></div>
                               
                     </div>

                      <a href="#/donation" class="mx-3 btn rounded shadow-sm p-3" > Back </a>
                   
                     <a href="#/confirm" class="mx-3 btn rounded shadow-sm p-3" > Send Details </a>
                </div>
            </div>
        </div>
          `, { model: dashboardProps}))
})





/**
 * Members App
 */
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
