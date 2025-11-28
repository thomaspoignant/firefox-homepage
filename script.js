// Default links
let links = [
    { name: 'admin GDC', url: 'https://admin-prod.gdc-it.app/home', icon: 'https://d202990a3aa0affcefb966567c73305a.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1700573403959x976856129952687900/Logo%20gdconf.png' },
    { name: 'Amplitude', url: 'https://app.amplitude.com/analytics/gensdeconfiance/home', icon: 'https://cdn.prod.website-files.com/64da81538e9bdebe7ae2fa11/64ee6c441b07b9e11db3dc92_A%20mark%20circle.svg' },
    { name: 'AWS', url: 'https://gensdeconfiance.awsapps.com/start#/', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg' },
    { name: 'Bitwarden', url: 'https://vault.bitwarden.com', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bitwarden.svg' },
    { name: 'Datadog', url: 'https://app.datadoghq.com/', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/datadog.svg' },
    { name: 'GDC (preprod)', url: 'https://preprod.gensdeconfiance.com/fr', icon: 'https://play-lh.googleusercontent.com/Ma6i6s5D4TucDWjQi1BA7mX_eem2hAJCAR7C2mJfvDBIt3vCx7Ja6Gr6KcwIcuBIpg=w240-h480-rw' , keywords: ['gdc', 'preprod'] },
    { name: 'GDC (prod)', url: 'https://gensdeconfiance.com', icon: 'https://play-lh.googleusercontent.com/Ma6i6s5D4TucDWjQi1BA7mX_eem2hAJCAR7C2mJfvDBIt3vCx7Ja6Gr6KcwIcuBIpg=w240-h480-rw', keywords: ['gdc', 'prod'] },
    { name: 'GDC (staging)', url: 'https://staging.gensdeconfiance.com/fr', icon: 'https://play-lh.googleusercontent.com/Ma6i6s5D4TucDWjQi1BA7mX_eem2hAJCAR7C2mJfvDBIt3vCx7Ja6Gr6KcwIcuBIpg=w240-h480-rw' , keywords: ['gdc', 'staging'] },
    { name: 'Gemini', url: 'https://gemini.google.com/', icon: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/gemini-app-icon.png' },
    { name: 'GitHub', url: 'https://github.com', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg' },
    { name: 'Gmail', url: 'https://mail.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/gmail_48dp.png' },
    { name: 'GOFF', url: 'https://code.gofeatureflag.org', icon: 'https://github.com/thomaspoignant/go-feature-flag/raw/main/gofeatureflag.svg' },
    { name: 'Google Calendar', url: 'https://calendar.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/calendar_48dp.png' },
    { name: 'Google Docs', url: 'https://docs.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/docs_48dp.png' },
    { name: 'Google Drive', url: 'https://drive.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/drive_48dp.png' },
    { name: 'Google Meet', url: 'https://meet.google.com/', icon: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/google-meet-app-icon.png' },
    { name: 'Google Sheets', url: 'https://sheets.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/sheets_48dp.png' },
    { name: 'Google Slides', url: 'https://slides.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/slides_48dp.png' },
    { name: 'Linear', url: 'https://linear.app/gensdeconfiance/team/ENG/active', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linear.svg' },
    { name: 'Lucca', url: 'https://gensdeconfiance.ilucca.net/', icon: 'https://peoplespheres.com/wp-content/uploads/2023/02/logo-lucca.png' },
    { name: 'Notion', url: 'https://www.notion.so/gens-de-confiance/', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg' }
];

// Ensure links are always sorted alphabetically
function sortLinks() {
    links.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
}

// Sort links on initialization
sortLinks();

const linksGrid = document.getElementById('linksGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');

// Autocomplete state
let autocompleteSuggestions = [];
let selectedAutocompleteIndex = -1;
let autocompleteTimeout = null;

// Render links
function renderLinks(linksToRender = links) {
    // Sort before rendering
    const sortedLinks = [...linksToRender].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    linksGrid.innerHTML = '';
    sortedLinks.forEach((link) => {
        const card = createLinkCard(link);
        linksGrid.appendChild(card);
    });
}

// Create a link card element
function createLinkCard(link) {
    const card = document.createElement('div');
    card.className = 'group relative block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1';
    
    // Check if icon is a URL (starts with http) or an emoji
    const isImageUrl = link.icon && (link.icon.startsWith('http://') || link.icon.startsWith('https://'));
    
    let iconDisplay;
    if (isImageUrl) {
        iconDisplay = `<div class="w-16 h-16 mb-4 flex items-center justify-center">
            <img src="${link.icon}" alt="${link.name}" class="w-full h-full object-contain rounded" 
                 onerror="this.parentElement.innerHTML='<div class=\\'text-5xl\\'>🔗</div>'">
        </div>`;
    } else {
        iconDisplay = `<div class="text-5xl mb-4">${link.icon || '🔗'}</div>`;
    }
    
    card.innerHTML = `
        <div class="flex flex-col items-center text-center">
            ${iconDisplay}
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">${link.name}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 break-all">${getDomain(link.url)}</p>
        </div>
    `;
    
    // Add click handler to open link
    card.addEventListener('click', (e) => {
        // Prevent any default behavior and ensure same-page navigation
        e.preventDefault();
        e.stopPropagation();
        window.location.href = link.url;
    });
    
    return card;
}

// Get domain from URL
function getDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return url;
    }
}

// Helper function to check if a link matches a search term
function linkMatchesSearch(link, searchTerm) {
    const term = searchTerm.toLowerCase();
    const nameMatch = link.name.toLowerCase().includes(term);
    const urlMatch = link.url.toLowerCase().includes(term);
    const keywordsMatch = link.keywords && link.keywords.some(keyword => keyword.toLowerCase().includes(term));
    return nameMatch || urlMatch || keywordsMatch;
}

// Search functionality
function filterLinks(searchTerm) {
    const filtered = links.filter(link => linkMatchesSearch(link, searchTerm));
    renderLinks(filtered);
}

// Fetch Google autocomplete suggestions using JSONP
function fetchAutocompleteSuggestions(query) {
    if (!query || query.trim().length < 2) {
        hideAutocomplete();
        return;
    }

    if (!autocompleteDropdown) {
        console.error('Autocomplete dropdown not found');
        return;
    }

    // Remove previous script if exists
    const existingScript = document.getElementById('googleAutocompleteScript');
    if (existingScript) {
        existingScript.remove();
    }

    // Create unique callback function name
    const callbackName = 'googleAutocompleteCallback_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Set up callback function
    window[callbackName] = function(data) {
        try {
            if (data && Array.isArray(data) && data.length > 1 && Array.isArray(data[1])) {
                autocompleteSuggestions = data[1].slice(0, 8); // Limit to 8 suggestions
                displayAutocomplete();
            } else {
                hideAutocomplete();
            }
        } catch (error) {
            console.error('Error processing autocomplete:', error);
            hideAutocomplete();
        } finally {
            // Clean up callback and script
            try {
                delete window[callbackName];
                const script = document.getElementById('googleAutocompleteScript');
                if (script) {
                    script.remove();
                }
            } catch (cleanupError) {
                console.error('Error cleaning up:', cleanupError);
            }
        }
    };

    // Create and inject script tag for JSONP
    const script = document.createElement('script');
    script.id = 'googleAutocompleteScript';
    script.src = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}&callback=${callbackName}`;
    script.onerror = () => {
        console.error('Failed to load autocomplete suggestions');
        hideAutocomplete();
        try {
            delete window[callbackName];
        } catch (e) {}
    };
    document.head.appendChild(script);
}

// Display autocomplete suggestions
function displayAutocomplete() {
    if (!autocompleteDropdown) {
        console.error('Autocomplete dropdown element not found');
        return;
    }
    
    if (autocompleteSuggestions.length === 0) {
        hideAutocomplete();
        return;
    }

    // Use document fragment for faster rendering
    const fragment = document.createDocumentFragment();
    autocompleteSuggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = `px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white ${
            index === selectedAutocompleteIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
        }`;
        item.textContent = suggestion;
        item.addEventListener('click', () => {
            searchInput.value = suggestion;
            hideAutocomplete();
            performSearch();
        });
        fragment.appendChild(item);
    });

    autocompleteDropdown.innerHTML = '';
    autocompleteDropdown.appendChild(fragment);
    autocompleteDropdown.classList.remove('hidden');
}

// Hide autocomplete dropdown
function hideAutocomplete() {
    // Clear any pending autocomplete requests
    if (autocompleteTimeout) {
        clearTimeout(autocompleteTimeout);
        autocompleteTimeout = null;
    }
    
    if (autocompleteDropdown) {
        autocompleteDropdown.classList.add('hidden');
        autocompleteDropdown.innerHTML = '';
    }
    autocompleteSuggestions = [];
    selectedAutocompleteIndex = -1;
}

// Search input handler
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    // Clear existing timeout
    if (autocompleteTimeout) {
        clearTimeout(autocompleteTimeout);
    }
    
    // Filter links for local search
    if (searchTerm === '') {
        renderLinks();
        hideAutocomplete();
    } else {
        filterLinks(searchTerm);
        
        // Don't show autocomplete if search starts with http (user is typing a URL)
        if (searchTerm.toLowerCase().startsWith('http')) {
            hideAutocomplete();
        } else {
            // Fetch autocomplete suggestions with debounce (reduced delay for faster response)
            autocompleteTimeout = setTimeout(() => {
                fetchAutocompleteSuggestions(searchTerm);
            }, 150);
        }
    }
    
    selectedAutocompleteIndex = -1;
});

// Perform search or navigate to URL
function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Re-filter to ensure we have the current filtered state
            const filtered = links.filter(link => linkMatchesSearch(link, query));
            
            // First check if there's exactly one filtered service visible
            // If there's a search query and exactly one match, open that card
            if (filtered.length === 1) {
                // Open the single matching service card
                window.location.href = filtered[0].url;
                return;
            }
            
            // Check if it's a URL
            if (query.includes('.') && !query.includes(' ')) {
                const url = query.startsWith('http') ? query : `https://${query}`;
                window.location.href = url;
            } else {
                // Search with Google
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            }
        }
    }

// Handle keyboard navigation in autocomplete
searchInput.addEventListener('keydown', (e) => {
    if (autocompleteSuggestions.length === 0) {
        if (e.key === 'Enter') {
            performSearch();
        }
        return;
    }

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            selectedAutocompleteIndex = Math.min(selectedAutocompleteIndex + 1, autocompleteSuggestions.length - 1);
            displayAutocomplete();
            break;
        case 'ArrowUp':
            e.preventDefault();
            selectedAutocompleteIndex = Math.max(selectedAutocompleteIndex - 1, -1);
            if (selectedAutocompleteIndex === -1) {
                hideAutocomplete();
            } else {
                displayAutocomplete();
            }
            break;
        case 'Enter':
            e.preventDefault();
            if (selectedAutocompleteIndex >= 0 && selectedAutocompleteIndex < autocompleteSuggestions.length) {
                searchInput.value = autocompleteSuggestions[selectedAutocompleteIndex];
                hideAutocomplete();
                performSearch();
            } else {
                performSearch();
            }
            break;
        case 'Escape':
            hideAutocomplete();
            break;
    }
});

// Hide autocomplete when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
        hideAutocomplete();
    }
});

// Handle search button click
searchBtn.addEventListener('click', () => {
    performSearch();
});

// Initialize
renderLinks();

// Focus search input on page load
if (searchInput) {
    searchInput.focus();
}

// Daily inspirational quote functionality
async function fetchDailyQuote() {
    const quoteElement = document.getElementById('dailyQuote');
    if (!quoteElement) return;
    
    const today = new Date().toDateString();
    const cachedQuote = localStorage.getItem('dailyQuote');
    const cachedDate = localStorage.getItem('dailyQuoteDate');
    
    // If we have a cached quote for today, use it
    if (cachedQuote && cachedDate === today) {
        quoteElement.textContent = cachedQuote;
        return;
    }
    
    // Otherwise, fetch a new quote
    try {
        const response = await fetch('https://api.quotable.io/random?tags=inspirational');
        if (!response.ok) throw new Error('Failed to fetch quote');
        
        const data = await response.json();
        const quote = `"${data.content}" — ${data.author}`;
        
        // Cache the quote and date
        localStorage.setItem('dailyQuote', quote);
        localStorage.setItem('dailyQuoteDate', today);
        
        quoteElement.textContent = quote;
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Fallback to a default quote if API fails
        quoteElement.textContent = '"The only way to do great work is to love what you do." — Steve Jobs';
    }
}

// Load daily quote when page loads
fetchDailyQuote();