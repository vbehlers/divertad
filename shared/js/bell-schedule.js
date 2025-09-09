// Initialize the enhanced bell schedule system
document.addEventListener('DOMContentLoaded', function() {
    // Check if required data is available
    if (typeof districtSchedules === 'undefined') {
        console.error('districtSchedules not loaded');
        document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: District schedules data not loaded. Please check the JavaScript files.</div>';
        return;
    }
    
    if (typeof EnhancedBellScheduleManager === 'undefined') {
        console.error('EnhancedBellScheduleManager not loaded');
        document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Enhanced Bell Schedule Manager not loaded. Please check the JavaScript files.</div>';
        return;
    }
    
    try {
        // Initialize the enhanced manager - use school code from window or default to AVHS
        const schoolCode = window.BELL_SCHOOL_CODE || 'AVHS';
        
        const bellManager = new EnhancedBellScheduleManager(districtSchedules, schoolCode);
        
        // Start auto-updating
        bellManager.startAutoUpdate();
        
        // Make it globally available
        window.bellManager = bellManager;
        
        // Initialize modal functionality
        initializeModal();
        
        console.log('Bell Schedule System initialized successfully');
    } catch (error) {
        console.error('Error initializing bell schedule system:', error);
        document.body.innerHTML = '<div style="padding: 20px; color: red;">Error initializing bell schedule system: ' + error.message + '</div>';
    }
});

function initializeModal() {
    // Modal functionality
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Update modal content
            updateModalContent();
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    function updateModalContent() {
        const content = document.getElementById('modal-schedule-content');
        
        if (content && window.bellManager) {
            content.innerHTML = window.bellManager.generateModalContent();
        }
    }

    // Bind modal events
    document.querySelectorAll('[data-modal-target]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const sel = btn.getAttribute('data-modal-target');
            const modal = sel ? document.querySelector(sel) : null;
            openModal(modal);
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.fixed');
            closeModal(modal);
        });
    });

    document.querySelectorAll('.fixed').forEach((modal) => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal(modal);
        });
    });
}

// Test functions for schedule simulation
function testSchedule(scheduleType) {
    if (window.bellManager) {
        console.log(`Testing ${scheduleType} schedule`);
        
        // Set schedule type override
        window.bellManager.scheduleTypeOverride = scheduleType;
        
        // Force update
        window.bellManager.updateDashboard();
        
        // Show feedback
        const buttons = document.querySelectorAll('button[onclick^="testSchedule"]');
        buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
        
        const activeButton = document.querySelector(`button[onclick="testSchedule('${scheduleType}')"]`);
        if (activeButton) {
            activeButton.classList.add('ring-2', 'ring-blue-500');
        }
    }
}

function testAfterHours() {
    if (window.bellManager) {
        console.log('Testing after hours scenario');
        
        // Set a time that's definitely after school hours (e.g., 10:00 PM)
        const afterHoursDate = new Date();
        afterHoursDate.setHours(22, 0, 0, 0); // 10:00 PM
        window.bellManager.dateOverride = afterHoursDate;
        
        // Force update
        window.bellManager.updateDashboard();
        
        // Show feedback
        const buttons = document.querySelectorAll('button[onclick^="test"]');
        buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
        
        const activeButton = document.querySelector('button[onclick="testAfterHours()"]');
        if (activeButton) {
            activeButton.classList.add('ring-2', 'ring-blue-500');
        }
    }
}

function testSchoolHours() {
    if (window.bellManager) {
        console.log('Testing school hours scenario');
        
        // Force a regular day schedule (override any weekend/holiday logic)
        window.bellManager.scheduleTypeOverride = 'regular_day';
        
        // Create a dynamic override that starts at 11:30 AM and continues ticking
        const baseTime = new Date();
        baseTime.setHours(11, 30, 0, 0); // 11:30 AM
        const realTime = new Date();
        const timeOffset = baseTime.getTime() - realTime.getTime();
        
        // Store the offset so we can create dynamic dates
        window.bellManager.timeOffset = timeOffset;
        window.bellManager.dateOverride = null; // Clear static override
        
        // Force update
        window.bellManager.updateDashboard();
        
        // Show feedback
        const buttons = document.querySelectorAll('button[onclick^="test"]');
        buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
        
        const activeButton = document.querySelector('button[onclick="testSchoolHours()"]');
        if (activeButton) {
            activeButton.classList.add('ring-2', 'ring-blue-500');
        }
    }
}

function resetSchedule() {
    if (window.bellManager) {
        console.log('Resetting to normal schedule');
        
        // Clear overrides
        window.bellManager.scheduleTypeOverride = null;
        window.bellManager.dateOverride = null;
        window.bellManager.timeOffset = null;
        
        // Force update
        window.bellManager.updateDashboard();
        
        // Remove active styling
        const buttons = document.querySelectorAll('button[onclick^="test"]');
        buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
    }
}

// Calendar modal functions
function openCalendarModal() {
    if (window.bellManager) {
        const modal = document.getElementById('calendar-modal');
        const content = document.getElementById('calendar-content');
        const schoolName = document.getElementById('modal-school-name');
        
        // Set school name
        if (schoolName) {
            schoolName.textContent = window.bellManager.currentSchool.school_name;
        }
        
        // Generate calendar content
        content.innerHTML = generateCalendarContent();
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeCalendarModal() {
    const modal = document.getElementById('calendar-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function generateCalendarContent() {
    if (!window.bellManager) return '<p>Error: Bell manager not available</p>';
    
    const school = window.bellManager.currentSchool;
    const allDates = [];
    
    // Collect all dates from different categories
    if (school.holidays_and_important_dates) {
        const dates = school.holidays_and_important_dates;
        
        // Add holidays
        if (dates.holidays) {
            dates.holidays.forEach(holiday => {
                if (holiday.start_date && holiday.start_date !== 'N/A' && holiday.start_date !== '') {
                    const holidayDate = new Date(holiday.start_date);
                    if (!isNaN(holidayDate.getTime())) {
                        allDates.push({
                            date: holidayDate,
                            endDate: holiday.end_date ? new Date(holiday.end_date) : null,
                            type: 'holiday',
                            name: holiday.name,
                            description: holiday.name
                        });
                    }
                }
            });
        }
        
        // Add non-student days
        if (dates.non_student_days) {
            dates.non_student_days.forEach(day => {
                if (day.date && day.date !== 'N/A' && day.date !== '') {
                    const dayDate = new Date(day.date);
                    if (!isNaN(dayDate.getTime())) {
                        allDates.push({
                            date: dayDate,
                            type: 'non_student',
                            name: day.description,
                            description: day.description
                        });
                    }
                }
            });
        }
        
        // Add back-to-school nights
        if (dates.back_to_school_nights) {
            dates.back_to_school_nights.forEach(event => {
                if (event.date && event.date !== 'N/A' && event.date !== '') {
                    const eventDate = new Date(event.date);
                    if (!isNaN(eventDate.getTime())) {
                        allDates.push({
                            date: eventDate,
                            type: 'back_to_school',
                            name: event.description,
                            description: event.description
                        });
                    }
                }
            });
        }
        
        // Add end of quarter/semester dates
        if (dates.end_of_quarter_semester_dates) {
            dates.end_of_quarter_semester_dates.forEach(event => {
                if (event.date && event.date !== 'N/A' && event.date !== '') {
                    const eventDate = new Date(event.date);
                    if (!isNaN(eventDate.getTime())) {
                        allDates.push({
                            date: eventDate,
                            type: 'end_quarter',
                            name: event.name || event.description || 'End of Quarter',
                            description: event.name || event.description || 'End of Quarter'
                        });
                    }
                }
            });
        }
        
        // Add testing dates
        if (dates.testing_dates) {
            dates.testing_dates.forEach(test => {
                const testDate = test.start_date || test.date;
                if (testDate && testDate !== 'N/A' && testDate !== '') {
                    const eventDate = new Date(testDate);
                    if (!isNaN(eventDate.getTime())) {
                        allDates.push({
                            date: eventDate,
                            endDate: test.end_date ? new Date(test.end_date) : null,
                            type: 'testing',
                            name: test.test_name || test.description || 'Testing',
                            description: test.test_name || test.description || 'Testing'
                        });
                    }
                }
            });
        }
        
        // Add other minimum days with activities
        if (dates.other_minimum_days_with_activities) {
            dates.other_minimum_days_with_activities.forEach(event => {
                if (event.date && event.date !== 'N/A' && event.date !== '') {
                    const eventDate = new Date(event.date);
                    if (!isNaN(eventDate.getTime())) {
                        allDates.push({
                            date: eventDate,
                            type: 'activity',
                            name: event.description,
                            description: event.description
                        });
                    }
                }
            });
        }
        
        // Add flex days (if they exist in the data)
        if (dates.flex_days) {
            dates.flex_days.forEach(event => {
                allDates.push({
                    date: new Date(event.date),
                    type: 'flex_day',
                    name: event.description,
                    description: event.description
                });
            });
        }
        
        // Add minimum days (if they exist in the data)
        if (dates.minimum_days) {
            dates.minimum_days.forEach(event => {
                allDates.push({
                    date: new Date(event.date),
                    type: 'minimum_day',
                    name: event.description,
                    description: event.description
                });
            });
        }
    }
    
    // Sort dates chronologically
    allDates.sort((a, b) => a.date - b.date);
    
    // Generate HTML (same styling as schedule modal)
    let html = '';
    
    // Academic year info
    html += `
        <div class="mb-12">
            <div class="mb-6">
                <h3 class="type-h3 font-normal text-primary">Academic Year Information</h3>
                <p class="type-p5 text-gray-600 mt-2">Important dates and information for the current academic year.</p>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <tbody>
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">Academic Year</td>
                            <td class="type-p5 p-4 text-left">${school.general_academic_info.academic_year}</td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">First Day</td>
                            <td class="type-p5 p-4 text-left">${new Date(school.general_academic_info.first_day_of_school).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">Last Day</td>
                            <td class="type-p5 p-4 text-left">${new Date(school.general_academic_info.last_day_of_school).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                        ${school.general_academic_info.graduation_date && school.general_academic_info.graduation_date !== 'TBD' && school.general_academic_info.graduation_date !== 'N/A' && school.general_academic_info.graduation_date !== '' ? `
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">Graduation</td>
                            <td class="type-p5 p-4 text-left">${new Date(school.general_academic_info.graduation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // Calendar events
    html += '<div class="mb-12">';
    html += '<div class="mb-6">';
    html += '<h3 class="type-h3 font-normal text-primary">Important Dates & Events</h3>';
    html += '<p class="type-p5 text-gray-600 mt-2">All holidays, special days, and important events throughout the academic year.</p>';
    html += '</div>';
    
    if (allDates.length === 0) {
        html += '<p class="type-p5 text-gray-500 italic">No calendar events found.</p>';
    } else {
        html += '<div class="overflow-x-auto">';
        html += '<table class="w-full text-left">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="type-h5 text-primary font-normal py-4 pr-4 w-1/3 text-left">Date</th>';
        html += '<th class="type-h5 text-primary font-normal p-4 w-1/3 text-left">Event</th>';
        html += '<th class="type-h5 text-primary font-normal p-4 w-1/3 text-left">Type</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        
        allDates.forEach(event => {
            const dateStr = event.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const endDateStr = event.endDate ? 
                ' - ' + event.endDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }) : '';
            
            const typeLabels = {
                'holiday': 'Holiday',
                'non_student': 'Non-Student Day',
                'back_to_school': 'Back to School',
                'end_quarter': 'End of Quarter',
                'testing': 'Testing',
                'activity': 'Activity Day',
                'flex_day': 'Flex Day',
                'minimum_day': 'Minimum Day'
            };
            
            const typeColors = {
                'holiday': 'text-red-600',
                'non_student': 'text-yellow-600',
                'back_to_school': 'text-green-600',
                'end_quarter': 'text-blue-600',
                'testing': 'text-purple-600',
                'activity': 'text-orange-600',
                'flex_day': 'text-indigo-600',
                'minimum_day': 'text-pink-600'
            };
            
            html += `
                <tr>
                    <td class="type-p5 py-4 pr-4 whitespace-nowrap text-left">${dateStr}${endDateStr}</td>
                    <td class="type-p5 p-4 whitespace-nowrap text-left">${event.name}</td>
                    <td class="type-p5 p-4 whitespace-nowrap text-left ${typeColors[event.type]}">${typeLabels[event.type]}</td>
                </tr>
            `;
        });
        
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
    }
    
    html += '</div>';
    
    return html;
}

// Update current date header dynamically
function updateCurrentDate() {
    const currentDateHeader = document.getElementById('current-date-header');
    if (currentDateHeader) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        currentDateHeader.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update the current date
    updateCurrentDate();
});
