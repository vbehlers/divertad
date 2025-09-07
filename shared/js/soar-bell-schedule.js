/**
 * SOAR High School - Standalone Bell Schedule Manager
 * This file contains all SOAR-specific schedule logic and data
 */

// SOAR Schedule Data - Standalone
const soarSchedules = {
    "school_name": "SOAR High School",
    "school_code": "SOAR",
    "display_info": {
        "page_title": "Bell Schedule - SOAR High School",
        "modal_title": "Complete Bell Schedule - SOAR High School",
        "calendar_title": "Academic Calendar - SOAR High School"
    },
    "general_academic_info": {
        "academic_year": "2025-2026",
        "first_day_of_school": "2025-08-11",
        "last_day_of_school": "2026-06-04",
        "graduation_date": "TBD"
    },
    "campus_details": [
        {
            "campus_name": "Lancaster Campus",
            "address": "3041 West Avenue K, Lancaster, CA 93536",
            "phone": "(661) 722-6509"
        },
        {
            "campus_name": "Palmdale Campus",
            "address": "2270 East Avenue Q, Palmdale, CA 93550",
            "phone": "(661) 274-4619"
        }
    ],
    "bell_schedules": {
        "monday_wednesday_schedule": [
            {
                "period_name": "Period 1M",
                "start_time": "8:30",
                "end_time": "10:05",
                "duration_minutes": 95
            },
            {
                "period_name": "Period 2M",
                "start_time": "10:15",
                "end_time": "11:50",
                "duration_minutes": 95
            },
            {
                "period_name": "Lunch",
                "start_time": "11:50",
                "end_time": "12:20",
                "duration_minutes": 30
            },
            {
                "period_name": "Period 3M",
                "start_time": "12:30",
                "end_time": "2:05",
                "duration_minutes": 95
            },
            {
                "period_name": "Period 4M",
                "start_time": "2:15",
                "end_time": "3:50",
                "duration_minutes": 95
            }
        ],
        "tuesday_thursday_schedule": [
            {
                "period_name": "Period 1T",
                "start_time": "8:30",
                "end_time": "10:05",
                "duration_minutes": 95
            },
            {
                "period_name": "Period 2T",
                "start_time": "10:15",
                "end_time": "11:50",
                "duration_minutes": 95
            },
            {
                "period_name": "Lunch",
                "start_time": "11:50",
                "end_time": "12:20",
                "duration_minutes": 30
            },
            {
                "period_name": "STAR Hour",
                "start_time": "12:30",
                "end_time": "1:20",
                "duration_minutes": 50
            },
            {
                "period_name": "Period 3T",
                "start_time": "1:30",
                "end_time": "3:05",
                "duration_minutes": 95
            },
            {
                "period_name": "Period 4T",
                "start_time": "3:15",
                "end_time": "4:50",
                "duration_minutes": 95
            }
        ],
        "friday_schedule": [
            {
                "period_name": "Period 1F",
                "start_time": "8:30",
                "end_time": "9:15",
                "duration_minutes": 45
            },
            {
                "period_name": "Period 2F",
                "start_time": "9:20",
                "end_time": "10:05",
                "duration_minutes": 45
            },
            {
                "period_name": "Period 3F",
                "start_time": "10:10",
                "end_time": "10:55",
                "duration_minutes": 45
            },
            {
                "period_name": "Break",
                "start_time": "10:55",
                "end_time": "11:05",
                "duration_minutes": 10
            },
            {
                "period_name": "Period 4F",
                "start_time": "11:10",
                "end_time": "11:55",
                "duration_minutes": 45
            },
            {
                "period_name": "Period 5F",
                "start_time": "12:00",
                "end_time": "12:45",
                "duration_minutes": 45
            },
            {
                "period_name": "Lunch",
                "start_time": "12:45",
                "end_time": "1:15",
                "duration_minutes": 30
            },
            {
                "period_name": "Period 6F",
                "start_time": "1:20",
                "end_time": "2:05",
                "duration_minutes": 45
            },
            {
                "period_name": "Period 7F",
                "start_time": "2:10",
                "end_time": "2:55",
                "duration_minutes": 45
            }
        ]
    },
    "holidays_and_important_dates": {
        "holidays": [
            {
                "name": "Labor Day",
                "start_date": "2025-09-01",
                "end_date": null
            },
            {
                "name": "Veterans Day",
                "start_date": "2025-11-11",
                "end_date": null
            },
            {
                "name": "Thanksgiving Break",
                "start_date": "2025-11-24",
                "end_date": "2025-11-28"
            },
            {
                "name": "Winter Break",
                "start_date": "2025-12-22",
                "end_date": "2026-01-09"
            },
            {
                "name": "Martin Luther King Jr. Day",
                "start_date": "2026-01-19",
                "end_date": null
            },
            {
                "name": "Lincoln's Birthday",
                "start_date": "2026-02-13",
                "end_date": null
            },
            {
                "name": "Presidents' Day",
                "start_date": "2026-02-16",
                "end_date": null
            },
            {
                "name": "Spring Break",
                "start_date": "2026-04-06",
                "end_date": "2026-04-10"
            },
            {
                "name": "Memorial Day",
                "start_date": "2026-05-25",
                "end_date": null
            }
        ],
        "non_student_days": [
            {
                "date": "2025-10-24",
                "description": "Student Free Day"
            },
            {
                "date": "2026-03-27",
                "description": "Student Free Day"
            },
            {
                "date": "2026-06-04",
                "description": "Student Free Day"
            }
        ],
        "back_to_school_nights": [
            {
                "date": "2025-08-15",
                "description": "LANC Back to School Night BBQ"
            },
            {
                "date": "2025-08-22",
                "description": "PALM Back to School Night BBQ"
            },
            {
                "date": "2026-02-06",
                "description": "Back to School Night"
            }
        ],
        "other_minimum_days_with_activities": [
            {
                "date": "2025-10-10",
                "description": "PSAT/Activity Day"
            },
            {
                "date": "2025-12-19",
                "description": "Student Activity Day"
            },
            {
                "date": "2026-05-22",
                "description": "Student Activity Day"
            }
        ]
    },
    "special_bell_schedule_notes": "Note: 9/5, 1/23, 2/20, 5/29 will follow a M-W schedule; 11/14 T-R schedule.",
    "disclaimer": "All dates and times are subject to change."
};

// SOAR Calendar Modal Functions - Make them global
window.openCalendarModal = function() {
    console.log('SOAR openCalendarModal called');
    const modal = document.getElementById('calendar-modal');
    const content = document.getElementById('calendar-content');
    const schoolName = document.getElementById('modal-school-name');
    
    console.log('Modal elements found:', { modal: !!modal, content: !!content, schoolName: !!schoolName });
    
    if (modal && content) {
        // Set school name from standalone data
        if (schoolName) {
            schoolName.textContent = soarSchedules.school_name;
        }
        
        // Generate calendar content
        console.log('Generating calendar content...');
        content.innerHTML = window.generateSOARCalendarContent();
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal should be visible now');
    } else {
        console.error('Modal or content element not found');
    }
};

window.closeCalendarModal = function() {
    const modal = document.getElementById('calendar-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Generate calendar content for SOAR - using standalone data
window.generateSOARCalendarContent = function() {
    // Use standalone SOAR data
    const schoolData = soarSchedules;
    
    // Format dates properly
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString();
    };
    
    const formatEventDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    return `
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
                            <td class="type-p5 p-4 text-left">${schoolData?.general_academic_info?.academic_year || '2024-2025'}</td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">First Day</td>
                            <td class="type-p5 p-4 text-left">${schoolData?.general_academic_info?.first_day_of_school ? formatDate(schoolData.general_academic_info.first_day_of_school) : '8/19/2024'}</td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">Last Day</td>
                            <td class="type-p5 p-4 text-left">${schoolData?.general_academic_info?.last_day_of_school ? formatDate(schoolData.general_academic_info.last_day_of_school) : '5/30/2025'}</td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 font-medium text-left">Graduation</td>
                            <td class="type-p5 p-4 text-left">${schoolData?.general_academic_info?.graduation_date || '6/6/2025'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="mb-12">
            <div class="mb-6">
                <h3 class="type-h3 font-normal text-primary">Important Dates & Events</h3>
                <p class="type-p5 text-gray-600 mt-2">All holidays, special days, and important events throughout the academic year.</p>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr>
                            <th class="type-p5 py-4 pr-4 font-medium text-left">Date</th>
                            <th class="type-p5 py-4 pr-4 font-medium text-left">Event</th>
                            <th class="type-p5 py-4 pr-4 font-medium text-left">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2024-09-02')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Labor Day</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-red-600">Holiday</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2024-09-12')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Back to School Night</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-green-600">Back to School</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2024-10-12')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">PSAT</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-blue-600">Assessment</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2024-10-24')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Parent Conferences</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-green-600">Back to School</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2024-11-25')} - ${formatEventDate('2024-11-29')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Thanksgiving Break</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-red-600">Holiday</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2024-12-23')} - ${formatEventDate('2025-01-03')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Winter Break</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-red-600">Holiday</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2025-01-20')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Martin Luther King Jr. Day</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-red-600">Holiday</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2025-02-17')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Presidents' Day</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-red-600">Holiday</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2025-03-08')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">SAT</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-blue-600">Assessment</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2025-03-31')} - ${formatEventDate('2025-04-04')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Spring Break</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-red-600">Holiday</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2025-05-05')} - ${formatEventDate('2025-05-16')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">AP Exams</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-blue-600">Assessment</span></td>
                        </tr>
                        <tr>
                            <td class="type-p5 py-4 pr-4 text-left">${formatEventDate('2025-06-06')}</td>
                            <td class="type-p5 py-4 pr-4 text-left">Graduation</td>
                            <td class="type-p5 py-4 pr-4 text-left"><span class="text-green-600">Special Event</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Generate schedule modal content for SOAR
window.generateSOARScheduleModalContent = function() {
    // Use standalone SOAR data
    const schoolData = soarSchedules;
    
    if (!schoolData) {
        return '<p class="text-gray-500">Schedule data not available.</p>';
    }
    
    let html = '<div class="space-y-8">';
    
    // M/W Schedule
    if (schoolData.bell_schedules && schoolData.bell_schedules.monday_wednesday_schedule) {
        html += `
            <div>
                <h3 class="type-h3 font-normal text-primary mb-4">Monday / Wednesday Schedule</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Period</th>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Time</th>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        schoolData.bell_schedules.monday_wednesday_schedule.forEach(period => {
            html += `
                <tr>
                    <td class="type-p5 py-4 pr-4 text-left">${period.period_name}</td>
                    <td class="type-p5 py-4 pr-4 text-left">${period.start_time} - ${period.end_time}</td>
                    <td class="type-p5 py-4 pr-4 text-left">${period.duration_minutes} min</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // T/Th Schedule
    if (schoolData.bell_schedules && schoolData.bell_schedules.tuesday_thursday_schedule) {
        html += `
            <div>
                <h3 class="type-h3 font-normal text-primary mb-4">Tuesday / Thursday Schedule</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Period</th>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Time</th>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        schoolData.bell_schedules.tuesday_thursday_schedule.forEach(period => {
            html += `
                <tr>
                    <td class="type-p5 py-4 pr-4 text-left">${period.period_name}</td>
                    <td class="type-p5 py-4 pr-4 text-left">${period.start_time} - ${period.end_time}</td>
                    <td class="type-p5 py-4 pr-4 text-left">${period.duration_minutes} min</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // Friday Schedule
    if (schoolData.bell_schedules && schoolData.bell_schedules.friday_schedule) {
        html += `
            <div>
                <h3 class="type-h3 font-normal text-primary mb-4">Friday Schedule</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Period</th>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Time</th>
                                <th class="type-p5 py-4 pr-4 font-medium text-left">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        schoolData.bell_schedules.friday_schedule.forEach(period => {
            html += `
                <tr>
                    <td class="type-p5 py-4 pr-4 text-left">${period.period_name}</td>
                    <td class="type-p5 py-4 pr-4 text-left">${period.start_time} - ${period.end_time}</td>
                    <td class="type-p5 py-4 pr-4 text-left">${period.duration_minutes} min</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
};

// Schedule Modal Functions - Make them global
window.openScheduleModal = function() {
    const modal = document.getElementById('scheduleModal');
    if (modal) {
        // Generate and populate the modal content
        const content = document.getElementById('modal-schedule-content');
        if (content) {
            content.innerHTML = window.generateSOARScheduleModalContent();
        }
        modal.style.display = 'block';
    }
};

window.closeScheduleModal = function() {
    const modal = document.getElementById('scheduleModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

// Function to update SOAR KPI panels
function updateSOARKPIs(scheduleData, currentTime) {
    // Find current period and next bell
    let currentPeriod = null;
    let nextBell = null;
    
    // Parse current time
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    
    // Find current period
    for (let i = 0; i < scheduleData.length; i++) {
        const period = scheduleData[i];
        const [startHour, startMin] = period.start_time.split(':').map(Number);
        const [endHour, endMin] = period.end_time.split(':').map(Number);
        const startTimeMinutes = startHour * 60 + startMin;
        const endTimeMinutes = endHour * 60 + endMin;
        
        if (currentTimeMinutes >= startTimeMinutes && currentTimeMinutes < endTimeMinutes) {
            currentPeriod = period;
            // Next bell is the end of current period
            nextBell = {
                time: period.end_time,
                countdown: formatCountdown(endTimeMinutes - currentTimeMinutes)
            };
            break;
        }
    }
    
    // If no current period, find next period
    if (!currentPeriod) {
        for (let i = 0; i < scheduleData.length; i++) {
            const period = scheduleData[i];
            const [startHour, startMin] = period.start_time.split(':').map(Number);
            const startTimeMinutes = startHour * 60 + startMin;
            
            if (currentTimeMinutes < startTimeMinutes) {
                nextBell = {
                    time: period.start_time,
                    countdown: formatCountdown(startTimeMinutes - currentTimeMinutes)
                };
                break;
            }
        }
    }
    
    // Update KPI panels
    const currentPeriodElement = document.getElementById('current-period-kpi');
    if (currentPeriodElement) {
        const periodNumber = currentPeriod ? currentPeriod.period_name.replace(/[^\d]/g, '') || '0' : '0';
        currentPeriodElement.textContent = periodNumber;
    }
    
    const currentTimeElement = document.getElementById('current-time');
    if (currentTimeElement) {
        const timeString = currentTime.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        currentTimeElement.textContent = timeString;
    }
    
    const nextBellElement = document.getElementById('next-bell');
    if (nextBellElement && nextBell) {
        nextBellElement.textContent = `${nextBell.time} / ${nextBell.countdown}`;
    } else if (nextBellElement) {
        nextBellElement.textContent = 'After Hours';
    }
}

// Helper function to format countdown
function formatCountdown(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}h`;
    } else {
        return `${mins}m`;
    }
}

// School Hours Test Function - Make it global
window.testSchoolHours = function() {
    console.log('Testing regular day schedule for SOAR debugging');
    
    // Force a regular day schedule (Monday/Wednesday schedule for SOAR)
    const scheduleData = soarSchedules.bell_schedules.monday_wednesday_schedule;
    const scheduleName = 'Monday / Wednesday Schedule (Debug)';
    
    // Set a time that's during school hours (e.g., 10:30 AM - between Period 2 and 3)
    const schoolHoursDate = new Date();
    schoolHoursDate.setHours(10, 30, 0, 0); // 10:30 AM
    
    // Update the schedule type display
    const scheduleDisplay = document.getElementById('schedule-type-display');
    if (scheduleDisplay) {
        scheduleDisplay.textContent = scheduleName;
    }
    
    // Update the table
    const tbody = document.getElementById('schedule-table-body');
    const scheduleModule = tbody?.closest('.module-3');
    
    if (tbody) {
        tbody.innerHTML = '';
        
        // Show schedule module for debugging
        if (scheduleModule) {
            scheduleModule.style.display = 'block';
        }
        
        scheduleData.forEach((period, index) => {
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
    }
    
    // Update KPI panels with school hours data
    updateSOARKPIs(scheduleData, schoolHoursDate);
    
    // Show feedback
    const buttons = document.querySelectorAll('button[onclick^="test"]');
    buttons.forEach(btn => btn.classList.remove('ring-2', 'ring-blue-500'));
    
    const activeButton = document.querySelector('button[onclick="testSchoolHours()"]');
    if (activeButton) {
        activeButton.classList.add('ring-2', 'ring-blue-500');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { soarSchedules };
} else {
    // Browser environment
    window.soarSchedules = soarSchedules;
}
