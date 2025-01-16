import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOS7R_l0Hg4m6jxak4_n8otbacrKPotVY",
    authDomain: "sowingguide.firebaseapp.com",
    projectId: "sowingguide",
    storageBucket: "sowingguide.firebasestorage.app",
    messagingSenderId: "1019506440289",
    appId: "1:1019506440289:web:0446fcb79f737ed5651220",
    measurementId: "G-DE0NZPJ3F0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Chart.js Configuration
const ctx = document.getElementById("sowingPieChart").getContext("2d");
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const sowingPieChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: months,
        datasets: [{
            label: "Sowing Guide",
            data: Array(12).fill(1), // Equal slices for 12 months
            backgroundColor: [
                "#f94144", "#f3722c", "#f8961e", "#f9c74f", "#90be6d", "#43aa8b",
                "#4d908e", "#577590", "#277da1", "#6a4c93", "#9d5bb5", "#c857ff",
            ],
        }],
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
        onClick: async (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index; // Get the clicked slice index
                const selectedMonth = months[index];

                // Fetch data from Firestore
                const docRef = doc(db, "SowingGuide", selectedMonth);
                const docSnap = await getDoc(docRef);

                const dataContainer = document.getElementById("data-container");
                if (docSnap.exists()) {
                    const crops = docSnap.data().crops;
                    dataContainer.innerHTML = `<h2>${selectedMonth}</h2>` +
                        crops.map(crop => `
                            <div class="crop">
                                <strong>${crop.name}</strong><br>
                                <em>${crop.tips}</em>
                            </div>
                        `).join("");
                } else {
                    dataContainer.innerHTML = `<h2>${selectedMonth}</h2><p>No data available.</p>`;
                }
            }
        },
    },
});
