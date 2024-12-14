// signup.js

document.getElementById("signupBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Debug log to confirm user creation
      console.log("User created:", user);

      // Save user data in Realtime Database
      database.ref("users/" + user.uid).set({
        email: user.email,
        role: "user" // Automatically assign 'user' role
      })
      .then(() => {
        console.log("User role successfully assigned in database.");
        alert("Signup successful! Redirecting to login page...");
        window.location.href = "login.html";
      })
      .catch((dbError) => {
        console.error("Database error:", dbError);
        alert("Failed to assign role in the database. Please try again.");
      });
    })
    .catch((authError) => {
      console.error("Authentication error:", authError);
      alert("Error: " + authError.message);
    });
});
