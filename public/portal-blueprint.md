<!-- Main Content Container -->
<div class="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-gray-100 mt-8">

    <!-- Header / Hero Section -->
    <header class="text-center py-6 border-b border-gray-100 mb-8">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-indigo-700 leading-tight">
            Project AI Hub
        </h1>
        <p class="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            A single-file app powered by the Gemini API.
        </p>
    </header>

    <!-- New: AI Content Generator Section -->
    <section class="mb-10 p-6 bg-indigo-50 rounded-xl ai-card">
        <h2 class="text-3xl font-bold text-indigo-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7 mr-3 text-indigo-600">
                <path d="M12 2a10 10 0 0 0-9 15.6l.8.8A7 7 0 1 0 12 5V2"/><path d="M12 2c-.1 0-.3.1-.4.2L8.6 6.5C8 7.2 7 8 7 9c0 1.3 1.2 2.5 2.5 2.5h5C16.8 11.5 18 10.3 18 9c0-1-.7-1.7-1.4-2.5L12.4 2.2c-.1-.1-.3-.2-.4-.2z"/><path d="M12 5v0"/>
            </svg>
            AI Content Generator
        </h2>
        <p class="text-gray-700 mb-4 text-sm">Use the Gemini model to instantly draft emails, summarize concepts, or brainstorm ideas.</p>

        <label for="ai-prompt" class="block text-sm font-medium text-gray-700 mb-2">Your Prompt:</label>
        <textarea id="ai-prompt" rows="3" placeholder="e.g., Write a catchy tagline for a coffee shop that specializes in reading books."
                  class="w-full p-3 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"></textarea>

        <button onclick="generateAIContent()" id="generate-btn"
                class="w-full mt-4 py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.01] flex items-center justify-center disabled:opacity-50"
                disabled>
            <span id="btn-text">Generate Response</span>
            <span id="loading-spinner" class="hidden animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></span>
        </button>

        <div class="mt-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Generated Content:</h3>
            <div id="ai-output" class="bg-white p-4 rounded-lg border border-gray-200 min-h-[100px] whitespace-pre-wrap text-gray-800 shadow-inner">
                Enter a prompt above and click "Generate Response" to see the output.
            </div>
        </div>
    </section>

    <!-- Feature Cards Section (Existing Content) -->
    <div class="grid md:grid-cols-3 gap-6 mt-10">
        <!-- Card 1 -->
        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-200 hover:shadow-md transition duration-300">
            <div class="text-2xl font-bold text-indigo-800 mb-2">
                <span role="img" aria-label="Bolt">⚡</span> Fast
            </div>
            <p class="text-gray-700 text-sm">Built with Tailwind CSS for rapid, utility-first styling.</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-green-50 p-6 rounded-xl border border-green-200 hover:shadow-md transition duration-300">
            <div class="text-2xl font-bold text-green-800 mb-2">
                <span role="img" aria-label="Mobile phone">📱</span> Responsive
            </div>
            <p class="text-gray-700 text-sm">Optimized to look great on desktop, tablet, and mobile screens.</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-yellow-50 p-6 rounded-xl border border-yellow-200 hover:shadow-md transition duration-300">
            <div class="text-2xl font-bold text-yellow-800 mb-2">
                <span role="img" aria-label="File">📄</span> Single File
            </div>
            <p class="text-gray-700 text-sm">All code (HTML/CSS/JS) is kept in one simple, self-contained file.</p>
        </div>
    </div>

    <!-- Call to Action Footer (Existing Content) -->
    <footer class="mt-12 text-center pt-6 border-t border-gray-100">
        <a href="#" class="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300 transform hover:scale-[1.02]">
            Explore Project Details
        </a>
    </footer>
</div>

<!-- Firebase SDK and Gemini API Logic -->
<script type="module">
    // --- Firebase Setup (Required for canvas environment) ---
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
    import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

    // Global variables provided by the environment
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    let db, auth;

    const initFirebase = async () => {
        if (firebaseConfig) {
            try {
                setLogLevel('Debug');
                const app = initializeApp(firebaseConfig);
                auth = getAuth(app);
                db = getFirestore(app);

                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
                console.log(`Firebase Initialized. User ID: ${auth.currentUser?.uid || 'N/A'}, App ID: ${appId}`);

                // Enable the button once the environment is ready
                document.getElementById('generate-btn').disabled = false;
                document.getElementById('btn-text').textContent = 'Generate Response';

            } catch (error) {
                console.error("Error initializing Firebase:", error);
                // Fallback to enable button but warn about potential environment issues
                document.getElementById('generate-btn').disabled = false;
                document.getElementById('btn-text').textContent = 'Generate (Error in setup)';
            }
        } else {
             // Still enable the button to allow API calls to work even without Firebase config
             document.getElementById('generate-btn').disabled = false;
             document.getElementById('btn-text').textContent = 'Generate Response';
        }
    };

    // --- Core Gemini API Logic ---

    const fetchWithRetry = async (url, options, retries = 3) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(`API returned status ${response.status}`);
                }
            } catch (error) {
                if (i < retries - 1) {
                    const delay = Math.pow(2, i) * 1000 + Math.random() * 500;
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    throw error;
                }
            }
        }
    };

    window.generateAIContent = async () => {
        const prompt = document.getElementById('ai-prompt').value.trim();
        const outputElement = document.getElementById('ai-output');
        const button = document.getElementById('generate-btn');
        const btnText = document.getElementById('btn-text');
        const spinner = document.getElementById('loading-spinner');

        if (!prompt) {
            outputElement.textContent = "Please enter a detailed prompt to generate content.";
            return;
        }

        // Set loading state
        button.disabled = true;
        btnText.textContent = 'Generating...';
        spinner.classList.remove('hidden');
        outputElement.textContent = 'Awaiting model response...';

        try {
            const apiKey = ""; // API key is provided by the environment
            const model = 'gemini-2.5-flash-preview-09-2025';
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: {
                    parts: [{ text: "You are a creative, helpful, and professional assistant. Provide a concise, well-formatted, and helpful response." }]
                },
            };

            const response = await fetchWithRetry(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
                outputElement.textContent = text;
            } else {
                outputElement.textContent = "Error: Could not retrieve a valid text response from the API.";
                console.error("API Response Error:", result);
            }

        } catch (error) {
            console.error("Gemini API call failed:", error);
            outputElement.textContent = `API Request Failed: ${error.message}. Please check the console for details.`;
        } finally {
            // Reset loading state
            button.disabled = false;
            btnText.textContent = 'Generate Response';
            spinner.classList.add('hidden');
        }
    };

    // Initialize Firebase on window load
    window.onload = initFirebase;
</script>