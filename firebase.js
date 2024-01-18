import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
const api = "https://um-api.dreamnity.in/";
const firebaseConfig = {
	apiKey: "AIzaSyBB6soKBXBBOAMYwWQq2ldkERkKKS_-uNA",
	authDomain: "dreamnity-unimetrics.firebaseapp.com",
	databaseURL:
		"https://dreamnity-unimetrics-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "dreamnity-unimetrics",
	storageBucket: "dreamnity-unimetrics.appspot.com",
	messagingSenderId: "701986868815",
	appId: "1:701986868815:web:657e378b58bf01fcaae43a",
	measurementId: "G-XLS949FTQQ",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const login = () =>
	signInWithPopup(auth, provider)
		.then(result => {
			/*// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					// The signed-in user info.
					const user = result.user;
					// IdP data available using getAdditionalUserInfo(result)
					// ...*/
			return result?.user?.uid;
		})
		.catch(error => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
window.firebase = {
	auth,
	app,
	login,
	getToken() {
		if (!auth.currentUser) return { then: fn => fn(null) };
		return auth.currentUser
			.getIdToken()
			.then(e =>
				fetch(api + "account/login?" + new URLSearchParams({ token: e }))
			)
			.then(e => e.text());
	},
};
