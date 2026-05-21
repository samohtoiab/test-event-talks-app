document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('categorySearch');
    let allTalks = [];

    // Fetch talks from the API
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderTalks(allTalks);
            // Check for live status every minute
            setInterval(() => renderTalks(getCurrentFilteredTalks()), 60000);
        })
        .catch(error => {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        });

    function getCurrentFilteredTalks() {
        const searchTerm = searchInput.value.toLowerCase();
        return allTalks.filter(talk => {
            if (talk.isBreak) return true;
            const inTitle = talk.title.toLowerCase().includes(searchTerm);
            const inSpeakers = talk.speakers.some(s => s.toLowerCase().includes(searchTerm));
            const inCategories = talk.categories.some(c => c.toLowerCase().includes(searchTerm));
            return inTitle || inSpeakers || inCategories;
        });
    }

    // Handle search/filtering
    searchInput.addEventListener('input', () => {
        renderTalks(getCurrentFilteredTalks());
    });

    function isLive(timeStr) {
        try {
            const [startStr, endStr] = timeStr.split(' - ');
            const parseTime = (t) => {
                const [time, modifier] = t.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                if (modifier === 'PM' && hours !== 12) hours += 12;
                if (modifier === 'AM' && hours === 12) hours = 0;
                // Event is May 21, 2026
                return new Date(2026, 4, 21, hours, minutes);
            };
            const start = parseTime(startStr);
            const end = parseTime(endStr);
            const now = new Date();
            return now >= start && now < end;
        } catch (e) {
            return false;
        }
    }

    function renderTalks(talks) {
        scheduleContainer.innerHTML = '';

        if (talks.length === 0) {
            scheduleContainer.innerHTML = '<p style="text-align:center; color:#64748b;">No talks found matching your search.</p>';
            return;
        }

        talks.forEach(talk => {
            const currentlyLive = isLive(talk.time);
            const card = document.createElement('div');
            card.className = `talk-card ${talk.isBreak ? 'is-break' : ''} ${currentlyLive ? 'is-live' : ''}`;
            card.setAttribute('role', 'article');
            
            if (currentlyLive) {
                const badge = document.createElement('span');
                badge.className = 'live-badge';
                badge.textContent = 'LIVE NOW';
                card.appendChild(badge);
            }

            if (talk.isBreak) {
                card.innerHTML += `
                    <span class="time">${talk.time}</span>
                    <h2 class="title">${talk.title}</h2>
                    <p class="description">${talk.description}</p>
                `;
            } else {
                const categoryTags = talk.categories
                    .map(cat => `<span class="category-tag" role="button" aria-label="Filter by ${cat}">${cat}</span>`)
                    .join('');

                card.innerHTML += `
                    <span class="time">${talk.time}</span>
                    <h2 class="title">${talk.title}</h2>
                    <p class="speakers">By ${talk.speakers.join(' & ')}</p>
                    <p class="description">${talk.description}</p>
                    <div class="categories">${categoryTags}</div>
                `;

                // Add click listeners to tags (Issue #4)
                const tags = card.querySelectorAll('.category-tag');
                tags.forEach(tag => {
                    tag.addEventListener('click', (e) => {
                        e.stopPropagation();
                        searchInput.value = tag.textContent;
                        renderTalks(getCurrentFilteredTalks());
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                });
            }

            scheduleContainer.appendChild(card);
        });
    }
});
