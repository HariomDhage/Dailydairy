const firebaseConfig = {
    apiKey: "AIzaSyDQpfUn26_9XRLHXc33xU81GGGQUNA6rvY",
    authDomain: "daily-fc1fc.firebaseapp.com",
    projectId: "daily-fc1fc",
    storageBucket: "daily-fc1fc.appspot.com",
    messagingSenderId: "600179425385",
    appId: "1:600179425385:web:4578593e7565105a63a2f8",
    measurementId: "G-Q43FG9TRNC"
  };

  
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db=firebase.firestore()
const  Login =()=>
{
const  email=document.getElementById("email").value

const  password=document.getElementById("Password").value

auth.signInWithEmailAndPassword(email,password).then(
    ()=>{

        window.location.href="diary.html"
    }
).catch(
()=>{
    console.log("ERROR WITH LOGIN")
})
    
}


