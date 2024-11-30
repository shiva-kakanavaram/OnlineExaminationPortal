const sideMenu = document.querySelector("aside");
const profileBtn = document.querySelector("#profile-btn");

const nextDay = document.getElementById('nextDay');
const prevDay = document.getElementById('prevDay');
const themeToggler = document.querySelector(".theme-toggler");

// Toggle theme function
themeToggler.onclick = function() {
    document.body.classList.toggle('dark-theme');
    
    // Update icon states based on the active theme
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

    // Save the theme in localStorage for persistence across pages
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Apply the saved theme on page load
window.onload = function() {
    setActiveLink();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggler.querySelector('span:nth-child(2)').classList.add('active');
        themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
    } else {
        themeToggler.querySelector('span:nth-child(1)').classList.add('active');
        themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
    }
};

// Existing code for timetable navigation and active link handling...



profileBtn.onclick = function() {
    sideMenu.classList.toggle('active');
}
window.onscroll = () => {
    sideMenu.classList.remove('active');
    if(window.scrollY > 0){document.querySelector('header').classList.add('active');}
    else{document.querySelector('header').classList.remove('active');}
}

themeToggler.onclick = function() {
    document.body.classList.toggle('dark-theme');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
}

let setData = (day) =>{
    document.querySelector('table tbody').innerHTML = ' '; //To clear out previous table data;  
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    document.querySelector('.timetable div h2').innerHTML = daylist[day];
    switch(day){
        case(0): day = Sunday; break;
        case(1): day = Monday; break;
        case(2): day = Tuesday; break;
        case(3): day = Wednesday; break;
        case(4): day = Thursday; break;
        case(5): day = Friday; break;
        case(6): day = Saturday; break;
    }

    day.forEach(sub => {
        const tr = document.createElement('tr');
        const trContent = `
                            <td>${sub.time}</td>
                            <td>${sub.roomNumber}</td>
                            <td>${sub.subject}</td>
                            <td>${sub.type}</td>
                        `
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr)                        
    });
}

let now = new Date();
let today = now.getDay(); // Will return the present day in numerical value; 
let day = today; //To prevent the today value from changing;


function timeTableAll(){
    document.getElementById('timetable').classList.toggle('active');
    setData(today);
    document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
}
nextDay.onclick = function() {
    day<=5 ? day++ : day=0;  // If else one liner
    setData(day);
}
prevDay.onclick = function() {
    day>=1 ? day-- : day=6;    
    setData(day);
}
// Existing code ...

// Function to set active link based on the current URL
function setActiveLink() {
    const links = document.querySelectorAll('.navbar a');
    const currentUrl = window.location.href; // Get the current page URL

    links.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active'); // Add active class if it matches
        } else {
            link.classList.remove('active'); // Remove active class if it doesn't match
        }
    });
}

// Call the function to set the active link on page load
window.onload = function() {
    setActiveLink();
};

// Existing code ...


setData(day); //To set the data in the table on loading window.
document.querySelector('.timetable div h2').innerHTML = "Today's Timetable"; //To prevent overwriting the heading on loading;