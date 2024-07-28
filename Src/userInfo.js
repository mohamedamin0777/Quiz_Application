import {
    auth,
    firestore,
    doc,
    getDoc,
    updateDoc,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword
} from "../Src/FirebaseConfig.js";

document.addEventListener('DOMContentLoaded', async function () {
    auth.onAuthStateChanged(async function (user) {
        if (user) {
            const userId = user.uid;
            const docRef = doc(firestore, "users", userId);

            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('username').value = userData.username;
                    document.getElementById('email').value = userData.email;
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        } else {
            console.log("No user is signed in.");
            // Example: Redirect to login page or show a message to the user
            // Replace this with your application's logic
            window.location.href = "../components/LoginUser.html";
        }
    });

    const updateForm = document.getElementById('update-form');
    updateForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        //const newUsername = document.getElementById('new-username').value;
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;

        const user = auth.currentUser;
        if (user && currentPassword) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);

            try {
                await reauthenticateWithCredential(user, credential);

                if (newPassword) {
                    await updatePassword(user, newPassword);
                    alert("Password updated successfully!");
                }

            } catch (error) {
                console.error("Error updating user info: ", error);
                alert("Error updating user info: " + error.message);
            }
        } else {
            alert("Please enter your current password to update your information.");
        }
    });
});
