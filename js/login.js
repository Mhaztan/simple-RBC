// login.js

document.getElementById("loginBtn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Get user role from Firebase Realtime Database
        database.ref("users/" + user.uid).once("value").then((snapshot) => {
          const userData = snapshot.val();
  
          if (userData && userData.role === "user") {
            alert("Login successful! Redirecting to User Dashboard...");
            window.location.href = "user-dashboard.html";
          } else {
            alert("Unauthorized role. Please contact support.");
          }
        });
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
  