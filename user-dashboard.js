// user-dashboard.js
document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const userEmailSpan = document.getElementById("userEmail");
  const userRoleSpan = document.getElementById("userRole");
    const lastLoginSpan = document.getElementById("lastLogin");
  const logoutBtn = document.getElementById("logoutBtn");
   const editProfileBtn = document.getElementById("editProfileBtn");
    const changePasswordBtn = document.getElementById("changePasswordBtn");

    const profileModal = document.getElementById("profileModal");
     const closeModalBtn = document.getElementById("closeModal");
     const editDisplayNameInput = document.getElementById("editDisplayName");
     const saveProfileBtn = document.getElementById("saveProfileBtn");
      let userDetails;
auth.onAuthStateChanged(async (user) => {
      if (user) {
          const userId = user.uid;
          try {
              const snapshot = await database.ref("users/" + userId).once("value");
              const userData = snapshot.val();
              if (userData) {
                 userDetails = userData
                  welcomeMessage.textContent = `Hello, ${userData.email}!`;
                  userEmailSpan.textContent = userData.email;
                  userRoleSpan.textContent = userData.role;

                    const lastLoginDate = new Date(user.metadata.lastSignInTime).toLocaleString()
                    lastLoginSpan.textContent = lastLoginDate;


              } else {
                  alert("User data not found in the database.");
                  await auth.signOut();
                  window.location.href = "login.html";
              }
          } catch (error) {
              console.error("Error fetching user data:", error);
              alert("An error occurred while fetching your details.");
          }
      } else {
          alert("You need to log in to access this page.");
          window.location.href = "login.html";
      }
   });

       logoutBtn.addEventListener("click", async () => {
      try {
          await auth.signOut();
          alert("You have been logged out.");
          window.location.href = "login.html";
      } catch (error) {
          console.error("Error logging out:", error);
          alert("An error occurred while logging out. Please try again.");
      }
  });

     editProfileBtn.addEventListener("click", () => {
      profileModal.style.display = "block";
      if(userDetails && userDetails.displayName) editDisplayNameInput.value = userDetails.displayName
  });

     changePasswordBtn.addEventListener("click", () => {
    alert("You will be redirected to reset password page");
    auth.sendPasswordResetEmail(auth.currentUser.email).then(()=>{
      alert("A password reset link has been sent to your email");
    }).catch(error => alert("There was an error in sending the reset link."))

  });
  closeModalBtn.addEventListener("click", () => {
      profileModal.style.display = "none";
   });
     saveProfileBtn.addEventListener("click", async()=>{
       const newDisplayName = editDisplayNameInput.value;

        if(!newDisplayName){
              alert("Display name cannot be empty");
                return;
        }
        try {
              await auth.currentUser.updateProfile({
                 displayName: newDisplayName
              });
               await database.ref("users/" + auth.currentUser.uid).update({
                 displayName: newDisplayName
               });
             alert("Profile Updated Successfully");
               profileModal.style.display = "none";
             window.location.reload()

         } catch(error){
           console.error("Error updating profile:", error);
           alert("There was an error updating the profile");
         }
      });
       window.addEventListener("click", (event) => {
      if (event.target === profileModal) {
          profileModal.style.display = "none";
      }
  });
});