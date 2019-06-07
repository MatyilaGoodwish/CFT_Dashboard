/**
 * @author RTE
 * @copyright 2019
 * @license RTE Group SA
 */
angular.module("cft-app", [])
.controller("cft-controller", function($scope, $http){
  //service account main class
    class ServiceAccount{
        checkState(){
            firebase.auth().onAuthStateChanged(function(user){
                if(user){
                    $("#notification").html("<br/><br/><div class='alert alert-success'> You are signed in</div>"); //notifications
                    return user;
                }
                else{
                    $("#notification").html("<br/><br/><div class='alert alert-danger'> You are not logged in</div>");
                    return false;
                }
            })
        }
        attemptRegistration(email,password){
            let currentState = new ServiceAccount().checkState();
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(success=>{
                $("#notification").html("<br/><br/><div class='alert alert-success'> We taking you to dashboard</div>");
            })
            .catch(error=>{
                $("#notification").html(`<br/><br/><div class='alert alert-danger'> ${ error.message }</div>`);
            })
        }

        //this is a login attempt takes email and password it uses cloud verifications for emails and passwords
        attemptLogin(email, password){
            let currentState = new ServiceAccount().checkState();
          //  console.table(email,password)

            //this is the auth responsible for the api auth
            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(success=>{
                $("#notification").html(`<br/><br/><div class='alert alert-success'> You are signed in</div>`);
            })
            .catch(error=>{
                console.log(error)
                $("#notification").html(`<br/><br/><div class='alert alert-success'> ${ error.message }</div>`);
            })
        }
    }

    //we init service to check if the user is loggedin or // NOTE:
    new ServiceAccount().checkState();


    app = $scope; //angular scope
    app.email = "";
    app.password = "";
    app.login = function(){

       //storing a localstorage object to the browser for Ux reasons but for production this we delete
        localStorage.setItem("loginCredentials", JSON.stringify({
            email: app.email,
            password: btoa(app.password)
        }));
        new ServiceAccount().attemptLogin(app.email, app.password);
    }
    app.reg_email = "";
    app.reg_password = "";
    app.register = function(){
        localStorage.setItem("registerCredentials", JSON.stringify({
            email: app.email,
            password: btoa(app.password)
        }));
        new ServiceAccount().attemptRegistration(app.reg_email, app.reg_password);
    }
})
