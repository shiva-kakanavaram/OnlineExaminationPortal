const timetableData = {
    0: [ // Sunday
        {   
            time: 'Sunday',
            roomNumber: 'Holiday',
            subject: 'No Class Scheduled',
            type: ''
        }
    ],
    1: [ // Monday
        {   
            time: '9:00 AM - 10:00 AM',
            roomNumber: '304CM',
            subject: 'DBMS',
            type: 'Theory'
        },
        {   
            time: '10:00 AM - 11:00 AM',
            roomNumber: '312CM',
            subject: 'ADSJ',
            type: 'Tutorial'
        },
        {   
            time: '11:10 AM - 1:10 PM',
            roomNumber: '304CM',
            subject: 'Linux',
            type: 'Theory'
        },
        {   
            time: '2:00 PM - 3:40 PM',
            roomNumber: '001 Cellar Lab',
            subject: 'Data Mining',
            type: 'Lab'
        }
    ],
    2: [ // Tuesday
        {   
            time: '9:00 AM - 11:00 AM',
            roomNumber: '312CM',
            subject: 'Linux',
            type: 'Tutorial'
        },
        {   
            time: '11:10 PM - 12:10 PM',
            roomNumber: '304CM',
            subject: 'ADSJ',
            type: 'Lecture'
        },
        {   
            time: '12:10 PM - 01:10 PM',
            roomNumber: '304CM',
            subject: 'DBMS',
            type: 'Lecture'
        },
        {   
            time: '02:00 PM - 03:00 PM',
            roomNumber: '304CM',
            subject: 'Data Mining',
            type: 'Lecture'
        }
    ],
    3: [ // Wednesday
        {   
            time: '10:00 - 11:00 AM',
            roomNumber: '304CM',
            subject: 'DBMS',
            type: 'Lecture'
        },
        {   
            time: '11:00 AM - 12:00 PM',
            roomNumber: '306CM',
            subject: 'Social Psychology',
            type: 'Lecture'
        },
        {   
            time: '2:00 PM - 3:40 PM',
            roomNumber: '204 CB Lab',
            subject: 'Linux',
            type: 'Lab'
        }
    ],
    4: [ // Thursday
        {   
            time: '10:00 AM - 11:00 AM',
            roomNumber: 'Library',
            subject: 'Library',
            type: 'Research'
        },
        {   
            time: '11:10 AM - 12:10 PM',
            roomNumber: '304CM',
            subject: 'Data Mining',
            type: 'Lecture'
        },
        {   
            time: '01:00 PM - 02:00 PM',
            roomNumber: '304CM',
            subject: 'Linux',
            type: 'Lecture'
        },
        {   
            time: '02:00 PM - 03:00 PM',
            roomNumber: '304CM',
            subject: 'ADSJ',
            type: 'Lecture'
        }
    ],
    5: [ // Friday
        {   
            time: '10:00 AM - 11:00 AM',
            roomNumber: '304CM',
            subject: 'Linux',
            type: 'Lecture'
        },
        {   
            time: '11:10 AM - 12:10 PM',
            roomNumber: '306CM',
            subject: 'Social Psychology',
            type: 'Lecture'
        },
        {   
            time: '02:00 PM - 03:00 PM',
            roomNumber: '312CM',
            subject: 'Data Mining',
            type: 'Tutorial'
        }
    ],
    6: [ // Saturday
        {   
            time: '09:00 AM - 10:00 AM',
            roomNumber: '312CM',
            subject: 'DBMS',
            type: 'Tutorial'
        },
        {   
            time: '10:00 AM - 11:00 AM',
            roomNumber: '304CM',
            subject: 'Linux',
            type: 'Lecture'
        }
    ]
};

// Initialize day variables
let now = new Date();
let today = now.getDay();
let day = today;

function setData(day) {
    const tbody = document.querySelector('table tbody');
    const heading = document.querySelector('.timetable div h2');
    
    if (!tbody || !heading) return; // Ensure elements exist
    
    tbody.innerHTML = ''; // Clear table content
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    heading.innerHTML = daylist[day]; // Set day heading

    // Populate timetable rows
    const subjectsForDay = timetableData[day] || [];
    subjectsForDay.forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sub.time}</td>
            <td>${sub.roomNumber}</td>
            <td>${sub.subject}</td>
            <td>${sub.type}</td>`;
        tbody.appendChild(tr);
    });
}

function timeTableAll() {
    setData(day); // Show today's timetable on load
}

// Navigation for next and previous days
window.onload = function() {
    const nextDay = document.getElementById('nextDay');
    const prevDay = document.getElementById('prevDay');

    // Add event listeners only if elements exist
    if (nextDay && prevDay) {
        nextDay.onclick = () => {
            day = (day + 1) % 7; // Cycle to next day, wrap to 0 if over
            setData(day);
        };
        prevDay.onclick = () => {
            day = (day - 1 + 7) % 7; // Cycle to previous day, wrap to 6 if below 0
            setData(day);
        };
    }

    // Navigation bar active tab logic
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.navbar a').forEach(tab => {
        if (tab.href.includes(currentPage)) {
            tab.classList.add('active');
            if (tab.id === 'timetableLink') {
                timeTableAll();
            }
        } else {
            tab.classList.remove('active');
        }
    });
};


const mockTests = [
    { id: 1, title: 'HTML QUIZ ', description: 'Test your knowledge on HTML Concepts'  },
    { id: 2, title: 'Logical Reasoning', description: 'Assess your analytical and problem-solving abilities' },
    { id: 3, title: 'Advanced Data Structures using Java', description: 'Evaluate your coding knowledge and skills' },
    { id: 4, title: 'General Awareness', description: 'Test your awareness of current events and general knowledge' }
];

// Function to create and append the mock test cards
function createMockTestCards() {
    const mockTestListContainer = document.getElementById('mock-test-list');

    if (!mockTestListContainer) {
        console.error('Error: Could not find the mock test list container element.');
        return;
    }

    let selectedTest = null;

    mockTests.forEach((test) => {
        const card = document.createElement('div');
        card.classList.add('mock-test-card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('mock-test-card-header');
        const cardTitle = document.createElement('h3');
        cardTitle.textContent = test.title;
        cardHeader.appendChild(cardTitle);

        const cardContent = document.createElement('div');
        cardContent.classList.add('mock-test-card-content');
        const cardDescription = document.createElement('p');
        cardDescription.textContent = test.description;
        cardContent.appendChild(cardDescription);

        const cardAction = document.createElement('div');
        cardAction.classList.add('mock-test-card-action');
        const startTestButton = document.createElement('button');
        startTestButton.classList.add('start-test-button');
        startTestButton.textContent = 'Start Test';
        startTestButton.addEventListener('click', () => {
            window.location.href = `quiz.html?testId=${test.id}`;
        });
        cardAction.appendChild(startTestButton);

        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        card.appendChild(cardAction);

        card.addEventListener('click', () => {
            selectedTest = test;
            card.classList.add('selected');
        });

        mockTestListContainer.appendChild(card);
    });
}

// Call the function to create the mock test cards
createMockTestCards();

