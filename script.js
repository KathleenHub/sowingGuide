import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOS7R_l0Hg4m6jxak4_n8otbacrKPotVY",
    authDomain: "sowingguide.firebaseapp.com",
    projectId: "sowingguide",
    storageBucket: "sowingguide.appspot.com",
    messagingSenderId: "1019506440289",
    appId: "1:1019506440289:web:0446fcb79f737ed5651220",
    measurementId: "G-DE0NZPJ3F0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchSowingData(month) {
    const status = document.getElementById("status");
    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = "";
    status.textContent = "Loading data...";

    try {
        const docRef = doc(collection(db, "SowingGuide"), month);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const sowingData = docSnap.data();
            sowingData.crops.forEach(crop => {
                const cropDiv = document.createElement("div");
                cropDiv.className = "crop";

                const name = document.createElement("h3");
                name.textContent = crop.name;

                const tips = document.createElement("p");
                tips.textContent = `Tips: ${crop.tips}`;

                cropDiv.appendChild(name);
                cropDiv.appendChild(tips);
                dataContainer.appendChild(cropDiv);
            });

            status.textContent = `Sowing guide for ${month}`;
        } else {
            status.textContent = `No data found for ${month}`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        status.textContent = "Error loading data. Please try again.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".month-slice").forEach(slice => {
        slice.addEventListener("click", event => {
            const month = event.target.getAttribute("data-month");
            fetchSowingData(month);
        });
    });
});
