// Default links
let links = [
    { name: 'AWS', url: 'https://gensdeconfiance.awsapps.com/start#/', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg' },
    { name: 'admin GDC', url: 'https://admin-prod.gdc-it.app/home', icon: 'https://d202990a3aa0affcefb966567c73305a.cdn.bubble.io/cdn-cgi/image/w=,h=,f=auto,dpr=1,fit=contain/f1700573403959x976856129952687900/Logo%20gdconf.png' },
    { name: 'Gmail', url: 'https://mail.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/gmail_48dp.png' },
    { name: 'Google Docs', url: 'https://docs.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/docs_48dp.png' },
    { name: 'Google Drive', url: 'https://drive.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/drive_48dp.png' },
    { name: 'Google Meet', url: 'https://meet.google.com/', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTayrTZwfe00-1p6u8ZrDWN7EY4Rsn3BwAOhw&s' },
    { name: 'Google Sheets', url: 'https://sheets.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/sheets_48dp.png' },
    { name: 'Google Slides', url: 'https://slides.google.com/', icon: 'https://www.gstatic.com/images/branding/product/2x/slides_48dp.png' },
    { name: 'GitHub', url: 'https://github.com', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg' },
    { name: 'Linear', url: 'https://linear.app/gensdeconfiance/team/ENG/active', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linear.svg' },
    { name: 'Notion', url: 'https://www.notion.so/gens-de-confiance/', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/notion.svg' }
];

// Sort links alphabetically by name
function sortLinks() {
    links.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
}

const linksGrid = document.getElementById('linksGrid');
const addLinkBtn = document.getElementById('addLinkBtn');
const addLinkModal = document.getElementById('addLinkModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const linkForm = document.getElementById('linkForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Track currently filtered/visible links
let currentFilteredLinks = links;

// Render links
function renderLinks(linksToRender = links) {
    // Update current filtered links
    currentFilteredLinks = linksToRender;
    // Sort before rendering
    const sortedLinks = [...linksToRender].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    linksGrid.innerHTML = '';
    sortedLinks.forEach((link, index) => {
        // Find the actual index in the original links array
        const actualIndex = links.findIndex(l => l.name === link.name && l.url === link.url);
        const card = createLinkCard(link, actualIndex);
        linksGrid.appendChild(card);
    });
}

// Create a link card element
function createLinkCard(link, index) {
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
    card.addEventListener('click', () => {
        window.open(link.url, '_blank');
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

// Save links function removed - no longer using localStorage

// Add new link
function addLink(name, url, icon) {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // If no icon provided, try to get logo from simple-icons or clearbit
    let iconUrl = icon;
    if (!iconUrl) {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            // Try simple-icons first (better quality SVGs), then clearbit as fallback
            iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${domain.split('.')[0]}.svg`;
        } catch {
            try {
                const domain = new URL(url).hostname;
                iconUrl = `https://logo.clearbit.com/${domain}`;
            } catch {
                iconUrl = '🔗';
            }
        }
    }
    
    links.push({ name, url, icon: iconUrl });
    sortLinks();
    renderLinks();
}


// Search functionality
function filterLinks(searchTerm) {
    const filtered = links.filter(link => 
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderLinks(filtered);
}

// Search input handler
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm === '') {
        renderLinks();
    } else {
        filterLinks(searchTerm);
    }
});

// Perform search or navigate to URL
function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Re-filter to ensure we have the current filtered state
            const filtered = links.filter(link => 
                link.name.toLowerCase().includes(query.toLowerCase()) ||
                link.url.toLowerCase().includes(query.toLowerCase())
            );
            
            // First check if there's exactly one filtered service visible
            // If there's a search query and exactly one match, open that card
            if (filtered.length === 1) {
                // Open the single matching service card
                window.open(filtered[0].url, '_blank');
                searchInput.value = '';
                renderLinks();
                return;
            }
            
            // Check if it's a URL
            if (query.includes('.') && !query.includes(' ')) {
                const url = query.startsWith('http') ? query : `https://${query}`;
                window.open(url, '_blank');
            } else {
                // Search with Google
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            }
            searchInput.value = '';
            renderLinks();
        }
    }

// Handle Enter key in search to navigate
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Handle search button click
searchBtn.addEventListener('click', () => {
    performSearch();
});

// Modal handlers
addLinkBtn.addEventListener('click', () => {
    addLinkModal.classList.remove('hidden');
    addLinkModal.classList.add('flex');
    document.getElementById('linkName').focus();
});

closeModal.addEventListener('click', () => {
    addLinkModal.classList.add('hidden');
    addLinkModal.classList.remove('flex');
    linkForm.reset();
});

cancelBtn.addEventListener('click', () => {
    addLinkModal.classList.add('hidden');
    addLinkModal.classList.remove('flex');
    linkForm.reset();
});

// Close modal when clicking outside
addLinkModal.addEventListener('click', (e) => {
    if (e.target === addLinkModal) {
        addLinkModal.classList.add('hidden');
        addLinkModal.classList.remove('flex');
        linkForm.reset();
    }
});

// Form submission
linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('linkName').value.trim();
    const url = document.getElementById('linkUrl').value.trim();
    const icon = document.getElementById('linkIcon').value.trim();
    
    if (name && url) {
        addLink(name, url, icon);
        addLinkModal.classList.add('hidden');
        addLinkModal.classList.remove('flex');
        linkForm.reset();
    }
});

// Initialize - sort links first
sortLinks();
renderLinks();