// Bell Schedule System - Working version based on AVHS-old
// This replaces the broken external system with working logic

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing bell schedule system...');
    
    // Check if View Transitions API is supported
    if ('startViewTransition' in document) {
        console.log('View Transitions API supported!');
    } else {
        console.log('View Transitions API not supported, using fallback transitions');
    }

    // Disable auto view transitions to prevent weird scrolling effects
    if ('startViewTransition' in document) {
        document.documentElement.style.viewTransitionName = 'none';
    }

    // Wait a bit for districtSchedules to load
    setTimeout(() => {
        if (typeof districtSchedules === 'undefined') {
            console.error('districtSchedules not loaded');
            return;
        }
        
        // Start the system
        startBellScheduleSystem();
    }, 100);
});

// Real-time clock and countdown functionality
function updateTime() {
    const now = window.testTimeOverride || new Date();
    
    // Update current time with View Transitions API
    const currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
        const newTimeText = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                currentTimeElement.textContent = newTimeText;
            });
        } else {
            currentTimeElement.textContent = newTimeText;
        }
    }

    // Get school data and current period
    const schoolCode = window.BELL_SCHOOL_CODE || 'AVHS';
    console.log('Using school code:', schoolCode);
    const school = getSchoolByCode(schoolCode);
    
    if (!school) {
        console.error('School not found:', schoolCode);
        return;
    }
    
    console.log('Found school:', school.school_name);

    // Get current schedule
    const schedule = getCurrentSchedule(school);
    const currentPeriod = getCurrentPeriod(schedule, now);
    const nextBell = getNextBell(schedule, now);

    // Update current period KPI
    const currentPeriodElement = document.getElementById('current-period-kpi');
    if (currentPeriodElement) {
        const periodNumber = currentPeriod.name.replace(/[^\d]/g, '') || '0';
        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                currentPeriodElement.textContent = periodNumber;
            });
        } else {
            currentPeriodElement.textContent = periodNumber;
        }
    }

    // Update next bell
    const nextBellElement = document.getElementById('next-bell');
    if (nextBellElement) {
        // Check if countdown contains HTML
        const countdownText = nextBell.countdown.includes('<') ? 'After Hours' : nextBell.countdown;
        const newText = `${nextBell.time} / ${countdownText}`;
        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                nextBellElement.textContent = newText;
            });
        } else {
            nextBellElement.textContent = newText;
        }
    }
    
    // Update table status dynamically
    updateTableStatus(currentPeriod, now);
}

// Helper function to get school by code
function getSchoolByCode(schoolCode) {
    if (typeof districtSchedules === 'undefined') {
        console.error('districtSchedules not loaded');
        return null;
    }
    return districtSchedules.schools.find(school => school.school_code === schoolCode);
}

// Helper function to get current schedule
function getCurrentSchedule(school) {
    const now = window.testTimeOverride || new Date();
    const dayOfWeek = now.getDay();
    
    // Check for test schedule override first
    if (window.testScheduleType) {
        const schedule = school.bell_schedules?.[window.testScheduleType];
        if (schedule) {
            return {
                type: window.testScheduleType,
                name: getScheduleTypeName(window.testScheduleType),
                periods: schedule,
                isSchoolDay: true,
                isTest: true
            };
        }
    }
    
    // Check for weekends first
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
        return {
            type: 'weekend',
            name: 'Weekend',
            periods: [],
            isSchoolDay: false
        };
    }
    
    // Default to regular day for weekdays
    return {
        type: 'regular_day',
        name: 'Regular Day',
        periods: school.bell_schedules?.regular_day || [],
        isSchoolDay: true
    };
}

// Helper function to get current period
function getCurrentPeriod(schedule, now) {
    if (!schedule || !schedule.periods || schedule.periods.length === 0) {
        return {
            name: 'No Active Period',
            status: 'outside_hours',
            timeRemaining: 0
        };
    }

    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    for (let i = 0; i < schedule.periods.length; i++) {
        const period = schedule.periods[i];
        const startTime = timeToMinutes(period.start_time);
        const endTime = timeToMinutes(period.end_time);

        if (currentTime >= startTime && currentTime < endTime) {
            return {
                name: period.period_name,
                status: 'active',
                timeRemaining: endTime - currentTime,
                startTime: period.start_time,
                endTime: period.end_time,
                duration: period.duration_minutes
            };
        }
    }

    // Check if we're outside school hours entirely
    const firstPeriod = schedule.periods[0];
    const lastPeriod = schedule.periods[schedule.periods.length - 1];
    const schoolStart = timeToMinutes(firstPeriod.start_time);
    const schoolEnd = timeToMinutes(lastPeriod.end_time);
    
    if (currentTime < schoolStart || currentTime > schoolEnd) {
        return {
            name: 'No Active Period',
            status: 'outside_hours',
            timeRemaining: 0
        };
    }
    
    return {
        name: 'Between Periods',
        status: 'between_periods',
        timeRemaining: 0
    };
}

// Helper function to get next bell
function getNextBell(schedule, now) {
    if (!schedule || !schedule.periods || schedule.periods.length === 0) {
        return {
            time: 'After Hours',
            countdown: 'School Day Complete',
            period: 'School Day Complete'
        };
    }

    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Find the next period that starts after current time
    for (let i = 0; i < schedule.periods.length; i++) {
        const period = schedule.periods[i];
        const startTime = timeToMinutes(period.start_time);

        if (startTime > currentTime) {
            const timeUntil = startTime - currentTime;
            const hours = Math.floor(timeUntil / 60);
            const minutes = timeUntil % 60;
            
            let countdown = '';
            if (hours > 0) {
                countdown = `${hours}:${minutes.toString().padStart(2, '0')}m`;
            } else {
                countdown = `${minutes}:00m`;
            }
            
            return {
                time: period.start_time,
                countdown: countdown,
                period: period.period_name,
                timeUntil: timeUntil
            };
        }
    }

    // If no future periods found, we're after school hours
    return {
        time: 'After Hours',
        countdown: 'School Day Complete',
        period: 'School Day Complete'
    };
}

// Helper function to convert time string to minutes
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

// Function to update table status dynamically
function updateTableStatus(currentPeriod, now) {
    const periodRows = document.querySelectorAll('tbody tr');
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    console.log('Updating table status. Found', periodRows.length, 'rows');
    
    periodRows.forEach((row) => {
        // Remove existing status classes
        row.classList.remove('current-period', 'flash-next-period');
        
        const statusCell = row.querySelector('td:last-child span');
        if (statusCell) {
            statusCell.className = 'text-gray-400';
            statusCell.textContent = 'Upcoming';
        }
        
        // Get period info from first column
        const periodCell = row.querySelector('td:first-child');
        if (!periodCell) return;
        
        const periodText = periodCell.textContent.trim();
        
        // Get school data to find period times
        const schoolCode = window.BELL_SCHOOL_CODE || 'AVHS';
        const school = getSchoolByCode(schoolCode);
        if (!school) return;
        
        const schedule = getCurrentSchedule(school);
        if (!schedule || !schedule.periods) return;
        
        // Find the period in the schedule
        const period = schedule.periods.find(p => p.period_name === periodText);
        if (!period) return;
        
        const startTime = timeToMinutes(period.start_time);
        const endTime = timeToMinutes(period.end_time);
        
        // Check if this period is current, completed, or upcoming
        if (currentTime >= startTime && currentTime < endTime) {
            // Current period
            row.classList.add('current-period');
            if (statusCell) {
                statusCell.className = 'text-primary';
                statusCell.textContent = 'Current';
            }
        } else if (currentTime >= endTime) {
            // Completed period
            if (statusCell) {
                statusCell.className = 'text-gray-400';
                statusCell.textContent = 'Completed';
            }
        } else {
            // Upcoming period - check if it's within 5 minutes of starting
            const timeUntilPeriod = startTime - currentTime;
            if (timeUntilPeriod <= 5 && timeUntilPeriod > 0) {
                // Next period within 5 minutes - add flashing
                row.classList.add('flash-next-period');
                if (statusCell) {
                    statusCell.textContent = 'Starting Soon';
                }
            }
        }
    });
}

// Start the bell schedule system
function startBellScheduleSystem() {
    console.log('Starting bell schedule system...');
    
    // Populate the schedule table
    populateScheduleTable();
    
    // Update time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call
    
    // Initialize modal functionality
    initializeModal();
    
    // Update current date
    updateCurrentDate();
    
    console.log('Bell schedule system started successfully');
}

// Function to populate the schedule table
function populateScheduleTable() {
    const schoolCode = window.BELL_SCHOOL_CODE || 'AVHS';
    const school = getSchoolByCode(schoolCode);
    
    if (!school) {
        console.error('School not found for table population:', schoolCode);
        return;
    }
    
    const schedule = getCurrentSchedule(school);
    const tbody = document.getElementById('schedule-table-body');
    
    if (!tbody) {
        console.error('Schedule table body not found');
        return;
    }
    
    if (!schedule || !schedule.periods || schedule.periods.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center p-4">No schedule available</td></tr>';
        return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add new rows
    schedule.periods.forEach((period, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100';
        
        row.innerHTML = `
            <td class="type-p5 p-4">${period.period_name}</td>
            <td class="type-p5 p-4">${period.start_time} - ${period.end_time}</td>
            <td class="type-p5 p-4">${period.duration_minutes} min</td>
            <td class="type-p5 p-4"><span class="text-gray-400">Upcoming</span></td>
        `;
        
        tbody.appendChild(row);
    });
    
    console.log('Populated schedule table with', schedule.periods.length, 'periods');
}

// Function to generate modal content
function generateModalContent() {
    const schoolCode = window.BELL_SCHOOL_CODE || 'AVHS';
    const school = getSchoolByCode(schoolCode);
    
    if (!school || !school.bell_schedules) {
        return '<p>No schedule data available</p>';
    }
    
    let content = '';
    
    // Generate content for each schedule type
    Object.keys(school.bell_schedules).forEach(scheduleType => {
        const schedule = school.bell_schedules[scheduleType];
        if (schedule && schedule.length > 0) {
            content += `
                <div class="mb-12">
                    <div class="mb-6">
                        <h3 class="type-h3 font-normal text-primary">${getScheduleTypeName(scheduleType)}</h3>
                        <p class="type-p5 text-gray-600 mt-2">${getScheduleDescription(scheduleType)}</p>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b-3 border-gray-200">
                                    <th class="type-h5 text-primary font-normal py-4 pr-4 w-1/6">Period</th>
                                    <th class="type-h5 text-primary font-normal p-4 w-1/3">Time</th>
                                    <th class="type-h5 text-primary font-normal p-4 w-1/6">Duration</th>
                                    <th class="type-h5 text-primary font-normal p-4 w-1/6">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            schedule.forEach(period => {
                content += `
                    <tr class="border-b-3 border-gray-100">
                        <td class="type-p5 p-4">${period.period_name}</td>
                        <td class="type-p5 p-4">${period.start_time} - ${period.end_time}</td>
                        <td class="type-p5 p-4">${period.duration_minutes} min</td>
                        <td class="type-p5 p-4 text-gray-500">-</td>
                    </tr>
                `;
            });
            
            content += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }
    });
    
    return content;
}

// Helper function to get schedule type name
function getScheduleTypeName(scheduleType) {
    const names = {
        'regular_day': 'Regular Day',
        'flex_day': 'Flex Day',
        'minimum_day': 'Minimum Day',
        'mtss_day': 'MTSS Day',
        'weekend': 'Weekend',
        'holiday': 'Holiday',
        'non_student_day': 'Non-Student Day'
    };
    return names[scheduleType] || scheduleType;
}

// Helper function to get schedule description
function getScheduleDescription(scheduleType) {
    const descriptions = {
        'regular_day': 'Standard daily schedule with all periods and normal timing.',
        'flex_day': 'Modified schedule with extended periods and flexible time blocks.',
        'minimum_day': 'Shortened schedule with reduced class times and early dismissal.',
        'mtss_day': 'Schedule with Multi-Tiered System of Supports (MTSS) periods.',
        'weekend': 'No classes scheduled for weekends.',
        'holiday': 'School is closed for holiday observance.',
        'non_student_day': 'No classes - professional development or administrative day.'
    };
    return descriptions[scheduleType] || 'Standard schedule format.';
}

// Modal functionality
function initializeModal() {
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            // Update modal content when opening
            updateModalContent();
        }
    }

    function closeModal(modal) {
        if (modal) modal.style.display = 'none';
    }
    
    function updateModalContent() {
        const content = document.getElementById('modal-schedule-content');
        if (content) {
            content.innerHTML = generateModalContent();
        }
    }

    function bindModalEvents() {
        // Bind openers
        document.querySelectorAll('[data-modal-target]').forEach((btn) => {
            if (btn.dataset.modalBound === 'true') return;
            btn.dataset.modalBound = 'true';
            btn.addEventListener('click', () => {
                const sel = btn.getAttribute('data-modal-target');
                const modal = sel ? document.querySelector(sel) : null;
                openModal(modal);
            });
        });

        // Bind closers
        document.querySelectorAll('[data-modal-close]').forEach((btn) => {
            if (btn.dataset.modalBound === 'true') return;
            btn.dataset.modalBound = 'true';
            btn.addEventListener('click', () => {
                const modal = btn.closest('.fixed');
                closeModal(modal);
            });
        });

        // Bind overlay click-to-close
        document.querySelectorAll('.fixed').forEach((modal) => {
            if (modal.dataset.modalBound === 'true') return;
            modal.dataset.modalBound = 'true';
            modal.addEventListener('click', (event) => {
                if (event.target === modal) closeModal(modal);
            });
        });
    }

    // Initial bind
    bindModalEvents();
}

// Test functions for schedule simulation
function testSchedule(scheduleType) {
    console.log(`Testing ${scheduleType} schedule`);
    
    // Set a global override for testing
    window.testScheduleType = scheduleType;
    
    // Repopulate table with test schedule
    populateTestScheduleTable(scheduleType);
    
    // Show feedback
    const buttons = document.querySelectorAll('button[onclick^="testSchedule"]');
    buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
    
    const activeButton = document.querySelector(`button[onclick="testSchedule('${scheduleType}')"]`);
    if (activeButton) {
        activeButton.classList.add('ring-2', 'ring-blue-500');
    }
}

function testAfterHours() {
    console.log('Testing after hours scenario');
    
    // Set time to after hours (10 PM)
    window.testTimeOverride = new Date();
    window.testTimeOverride.setHours(22, 0, 0, 0);
    
    // Show feedback
    const buttons = document.querySelectorAll('button[onclick^="test"]');
    buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
    
    const activeButton = document.querySelector('button[onclick="testAfterHours()"]');
    if (activeButton) {
        activeButton.classList.add('ring-2', 'ring-blue-500');
    }
}

function testSchoolHours() {
    console.log('Testing school hours scenario');
    
    // Set time to during school hours (11:30 AM)
    window.testTimeOverride = new Date();
    window.testTimeOverride.setHours(11, 30, 0, 0);
    
    // Show feedback
    const buttons = document.querySelectorAll('button[onclick^="test"]');
    buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
    
    const activeButton = document.querySelector('button[onclick="testSchoolHours()"]');
    if (activeButton) {
        activeButton.classList.add('ring-2', 'ring-blue-500');
    }
}

function resetSchedule() {
    console.log('Resetting to normal schedule');
    
    // Clear test overrides
    window.testScheduleType = null;
    window.testTimeOverride = null;
    
    // Repopulate with normal schedule
    populateScheduleTable();
    
    // Remove active styling
    const buttons = document.querySelectorAll('button[onclick^="test"]');
    buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
}

// Function to populate test schedule table
function populateTestScheduleTable(scheduleType) {
    const schoolCode = window.BELL_SCHOOL_CODE || 'AVHS';
    const school = getSchoolByCode(schoolCode);
    
    if (!school) {
        console.error('School not found for test table population:', schoolCode);
        return;
    }
    
    const schedule = school.bell_schedules?.[scheduleType];
    const tbody = document.getElementById('schedule-table-body');
    
    if (!tbody) {
        console.error('Schedule table body not found');
        return;
    }
    
    if (!schedule || schedule.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center p-4">No test schedule available</td></tr>';
        return;
    }
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Add new rows
    schedule.forEach((period, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100';
        
        row.innerHTML = `
            <td class="type-p5 p-4">${period.period_name}</td>
            <td class="type-p5 p-4">${period.start_time} - ${period.end_time}</td>
            <td class="type-p5 p-4">${period.duration_minutes} min</td>
            <td class="type-p5 p-4"><span class="text-gray-400">Test Mode</span></td>
        `;
        
        tbody.appendChild(row);
    });
    
    console.log('Populated test schedule table with', schedule.length, 'periods');
}

// Calendar modal functions
function openCalendarModal() {
    const modal = document.getElementById('calendar-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeCalendarModal() {
    const modal = document.getElementById('calendar-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function closeScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    if (modal) {
        modal.style.display = 'none';
    }
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