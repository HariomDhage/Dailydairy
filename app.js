const firebaseConfig = {
    apiKey: "AIzaSyDQpfUn26_9XRLHXc33xU81GGGQUNA6rvY",
    authDomain: "daily-fc1fc.firebaseapp.com",
    projectId: "daily-fc1fc",
    storageBucket: "daily-fc1fc.appspot.com",
    messagingSenderId: "600179425385",
    appId: "1:600179425385:web:4578593e7565105a63a2f8",
    measurementId: "G-Q43FG9TRNC"
  };

  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const colref = db.collection("Diary")
  
  
  
  document.getElementById("date").valueAsDate = new Date()
  
  const getdate = document.getElementById("date")
  getdate.addEventListener("change", () => {
      const enteredDate = document.getElementById('date').value;
      const diaryEntriesDiv = document.getElementById('diary');
  
      
      colref.doc(enteredDate).get().then((doc) => {
          if (doc.exists) {
              const data = doc.data();
              const entryText = data.data;
              diaryEntriesDiv.textContent = `${entryText}`;
  
              document.getElementById('updateButton').style.display = 'block';
              document.getElementById('submitButton').style.display = 'none';
  
              document.getElementById('diary').value = entryText;
          } else {
              alert("No diaries on this date")
  
              document.getElementById('submitButton').style.display = 'block';
              document.getElementById('updateButton').style.display = 'none';
          }
  
      })
          .catch((err) => {
              console.log(err);
          });
  
  })
  
  
  
  
  const Submit = () => {
  
      const inputVal = document.getElementById('diary').value;
      const enteredDate = document.getElementById('date').value;
      
      colref.doc(enteredDate)
          .set({
              data: inputVal,
            
          })
          .then(() => {
              console.log("Document inserted successfully");
            
          })
          .catch((err) => {
              console.log(err);
          });
  };
  

  
const Update = () => {
    const inputVal = document.getElementById('diary').value;
    const enteredDate = document.getElementById('date').value;


    colref.doc(enteredDate)
        .update({
            data: inputVal,
        })
        .then(() => {
            console.log("Document updated successfully");
            // fetchOrCreateDiary();
        })
        .catch((err) => {
            console.log(err);
        });
};


document.addEventListener("DOMContentLoaded", function () {
    const voiceButton = document.getElementById("voiceButton");
    voiceButton.addEventListener("click", startVoiceRecognition);
  });
  
  function startVoiceRecognition() {
    const enteredDate = document.getElementById('date').value;
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
  
    recognition.onresult = function (event) {
      const recognizedText = event.results[0][0].transcript;
      const diaryTextArea = document.getElementById("diary");
      const existingText = diaryTextArea.value;
  
      // Concatenate recognized text with existing content
      const newText = existingText + ' ' + recognizedText;
  
      diaryTextArea.value = newText;
  
      if (recognizedText.trim().toLowerCase()) {
        const todoText = recognizedText.trim();
        if (todoText !== "") {
          colref.doc(enteredDate).set({
            data: newText,
          });
        }
      }
    };
  
    recognition.start();
  }


