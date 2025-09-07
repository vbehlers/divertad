/**
 * SOAR Bell Schedule - Custom Implementation
 * Handles SOAR's unique day-specific schedules without EnhancedBellScheduleManager
 */

// SOAR Calendar Modal Functions - Make them global
window.openCalendarModal = function() {
    console.log('SOAR openCalendarModal called');
    const modal = document.getElementById('calendar-modal');
    const content = document.getElementById('calendar-content');
    const schoolName = document.getElementById('modal-school-name');
    
    console.log('Modal elements found:', { modal: !!modal, content: !!content, schoolName: !!schoolName });
    
    if (modal && content) {
               // Set school name from JSON data
               if (schoolName && window.districtSchedules && window.districtSchedules.schools) {
                   const soarSchool = window.districtSchedules.schools.find(school => school.school_code === 'SOAR');
            if (soarSchool) {
                schoolName.textContent = soarSchool.school_name;
            }
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

// Generate calendar content for SOAR - matching eastside style exactly
window.generateSOARCalendarContent = function() {
    // Get SOAR school data for dynamic content
    let schoolData = null;
    if (window.districtSchedules && window.districtSchedules.schools) {
        schoolData = window.districtSchedules.schools.find(school => school.school_code === 'SOAR');
    }
    
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
    // Get SOAR school data
    let schoolData = null;
    if (window.districtSchedules && window.districtSchedules.schools) {
        schoolData = window.districtSchedules.schools.find(school => school.school_code === 'SOAR');
    }
    
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

// School Hours Test Function - Make it global
window.testSchoolHours = function() {
    console.log('School Hours button clicked');
    // For SOAR, just reload the current schedule
    location.reload();
};
