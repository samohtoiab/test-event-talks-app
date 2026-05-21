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
        })
        .catch(error => {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        });

    // Handle search/filtering
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        const filteredTalks = allTalks.filter(talk => {
            if (talk.isBreak) return true; // Always show the lunch break
            
            return talk.categories.some(category => 
                category.toLowerCase().includes(searchTerm)
            );
        });

        renderTalks(filteredTalks);
    });

    function renderTalks(talks) {
        scheduleContainer.innerHTML = '';

        if (talks.length === 0) {
            scheduleContainer.innerHTML = '<p style="text-align:center; color:#64748b;">No talks found for this category.</p>';
            return;
        }

        talks.forEach(talk => {
            const card = document.createElement('div');
            card.className = `talk-card ${talk.isBreak ? 'is-break' : ''}`;

            if (talk.isBreak) {
                card.innerHTML = `
                    <span class="time">${talk.time}</span>
                    <h2 class="title">${talk.title}</h2>
                    <p class="description">${talk.description}</p>
                `;
            } else {
                const categoryTags = talk.categories
                    .map(cat => `<span class="category-tag">${cat}</span>`)
                    .join('');

                card.innerHTML = `
                    <span class="time">${talk.time}</span>
                    <h2 class="title">${talk.title}</h2>
                    <p class="speakers">By ${talk.speakers.join(' & ')}</p>
                    <p class="description">${talk.description}</p>
                    <div class="categories">${categoryTags}</div>
                `;
            }

            scheduleContainer.appendChild(card);
        });
    }
});
