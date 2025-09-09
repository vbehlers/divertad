/**
 * Enhanced Bell Schedule Manager
 * Simple, working bell schedule system
 */

class EnhancedBellScheduleManager {
    constructor(districtData, schoolCode = 'AVHS') {
        this.districtData = districtData;
        this.schoolCode = schoolCode;
        this.currentSchool = this.getSchoolByCode(schoolCode);
        
        if (!this.currentSchool) {
            throw new Error(`School with code '${schoolCode}' not found in district data`);
        }
        
        this.updateInterval = null;
        this.currentSchedule = null;
        
        // Override settings
        this.dateOverride = null;
        this.scheduleTypeOverride = null;
        
        this.updatePageTitles();
    }

    getSchoolByCode(schoolCode) {
        return this.districtData.schools.find(school => 
            school.school_code === schoolCode
        );
    }

    switchSchool(schoolCode) {
        this.schoolCode = schoolCode;
        this.currentSchool = this.getSchoolByCode(schoolCode);
        this.updatePageTitles();
        this.updateDashboard();
    }

    setDateOverride(date) {
        this.dateOverride = date;
    }

    clearDateOverride() {
        this.dateOverride = null;
    }

    setScheduleTypeOverride(scheduleType) {
        this.scheduleTypeOverride = scheduleType;
    }

    clearScheduleTypeOverride() {
        this.scheduleTypeOverride = null;
    }

    clearAllOverrides() {
        this.dateOverride = null;
        this.scheduleTypeOverride = null;
    }

    getScheduleForDate(date = null) {
        const targetDate = this.dateOverride || date || new Date();
        const dayOfWeek = targetDate.getDay();
        
        // Check for schedule type override first
        if (this.scheduleTypeOverride) {
            const schedule = this.getScheduleByType(this.scheduleTypeOverride);
            if (schedule) {
                return {
                    ...schedule,
                    isOverride: true
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
            periods: this.currentSchool.bell_schedules?.regular_day || [],
            isSchoolDay: true
        };
    }

    getScheduleByType(scheduleType) {
        const schedule = this.currentSchool.bell_schedules?.[scheduleType];
        if (schedule) {
            return {
                type: scheduleType,
                name: this.getScheduleTypeName(scheduleType),
                periods: schedule,
                isSchoolDay: true,
                isOverride: true
            };
        }
        return null;
    }

    getScheduleTypeName(scheduleType) {
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

    getKPIData() {
        const now = this.dateOverride || (this.timeOffset ? new Date(Date.now() + this.timeOffset) : new Date());
        const todaySchedule = this.getScheduleForDate(now);
        this.currentSchedule = todaySchedule;

        const kpiData = {
            // Current time (use override if available)
            currentTime: now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            }),

            // Current date
            currentDate: now.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }),

            // Schedule type
            scheduleType: todaySchedule.name,
            scheduleTypeCode: todaySchedule.type,

            // Current period
            currentPeriod: this.getCurrentPeriod(todaySchedule),

            // Next bell
            nextBell: this.getNextBell(todaySchedule),

            // School day status
            isSchoolDay: todaySchedule.isSchoolDay,

            // Additional info
            schoolName: this.currentSchool.school_name,
            academicYear: this.currentSchool.general_academic_info.academic_year
        };

        return kpiData;
    }

    getCurrentPeriod(schedule) {
        if (!schedule || !schedule.periods || schedule.periods.length === 0) {
            return {
                name: 'No Active Period',
                status: 'outside_hours',
                timeRemaining: 0
            };
        }

        const now = this.dateOverride || (this.timeOffset ? new Date(Date.now() + this.timeOffset) : new Date());
        const currentTime = now.getHours() * 60 + now.getMinutes();
        

        for (let i = 0; i < schedule.periods.length; i++) {
            const period = schedule.periods[i];
            const startTime = this.timeToMinutes(period.start_time);
            const endTime = this.timeToMinutes(period.end_time);

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
        const schoolStart = this.timeToMinutes(firstPeriod.start_time);
        const schoolEnd = this.timeToMinutes(lastPeriod.end_time);
        
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

    getNextBell(schedule) {
        if (!schedule || !schedule.periods || schedule.periods.length === 0) {
            return {
                time: 'After Hours',
                countdown: '<span class="sleeping-emoji">(ᴗ˳ᴗ)<span class="z1">ᶻ</span><span class="z2">𝗓</span><span class="z3">𐰁</span></span>',
                period: 'School Day Complete'
            };
        }

        const now = this.dateOverride || (this.timeOffset ? new Date(Date.now() + this.timeOffset) : new Date());
        const currentTime = now.getHours() * 60 + now.getMinutes();

        // Find the next period that starts after current time
        for (let i = 0; i < schedule.periods.length; i++) {
            const period = schedule.periods[i];
            const startTime = this.timeToMinutes(period.start_time);

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
            countdown: '<span class="sleeping-emoji">(ᴗ˳ᴗ)<span class="z1">ᶻ</span><span class="z2">𝗓</span><span class="z3">𐰁</span></span>',
            period: 'School Day Complete'
        };
    }

    updatePageTitles() {
        const displayInfo = this.currentSchool.display_info;
        if (displayInfo) {
            // Update page title
            document.title = displayInfo.page_title;
            
            // Update modal title
            const modalTitle = document.querySelector('#scheduleModal h2');
            if (modalTitle) {
                modalTitle.textContent = displayInfo.modal_title;
            }
            
            // Update current date header
            const currentDateHeader = document.getElementById('current-date-header');
            if (currentDateHeader) {
                const now = new Date();
                const options = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                };
                currentDateHeader.textContent = now.toLocaleDateString('en-US', options);
            }
            
            // Update calendar modal title
            const calendarTitle = document.querySelector('#calendar-modal h2');
            if (calendarTitle) {
                calendarTitle.textContent = displayInfo.calendar_title;
            }
            
            // Update modal school name span
            const modalSchoolName = document.getElementById('modal-school-name');
            if (modalSchoolName) {
                modalSchoolName.textContent = this.currentSchool.school_name;
            }
        }
    }

    updateDashboard() {
        const kpiData = this.getKPIData();

        // Update current time
        this.updateElement('current-time', kpiData.currentTime);

        // Update schedule type
        this.updateElement('schedule-type-display', kpiData.scheduleType);

        // Update next bell
        this.updateElement('next-bell', `${kpiData.nextBell.time} / ${kpiData.nextBell.countdown}`);

        // Update current period KPI - extract just the number
        const periodNumber = kpiData.currentPeriod.name.replace(/[^\d]/g, '') || '0';
        this.updateElement('current-period-kpi', periodNumber);

        // Update date header
        const dateHeaderElement = document.getElementById('schedule-date');
        if (dateHeaderElement) {
            this.updateElement('schedule-date', kpiData.currentDate);
        }

        // Update the schedule table
        this.updateScheduleTable(this.currentSchedule);
    }

    updateElement(elementId, newContent) {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Check if content contains HTML tags
        const isHTML = /<[^>]*>/g.test(newContent);

        // Only update if content has actually changed to prevent unnecessary updates
        const currentContent = isHTML ? element.innerHTML : element.textContent;
        if (currentContent === newContent) return;

        // Update without View Transitions to prevent layout shifts
        if (isHTML) {
            element.innerHTML = newContent;
        } else {
            element.textContent = newContent;
        }
    }

    updateScheduleTable(schedule) {
        const tbody = document.getElementById('schedule-table-body');
        const scheduleModule = tbody?.closest('.module-3');
        
        if (!tbody || !schedule || !schedule.periods) {
            if (tbody) tbody.innerHTML = '<tr><td colspan="3" class="text-center p-4">No schedule available</td></tr>';
            return;
        }

        // Hide entire schedule module on weekends, holidays, and non-student days
        if (schedule.type === 'weekend' || schedule.type === 'holiday' || schedule.type === 'non_student_day') {
            if (scheduleModule) {
                scheduleModule.style.display = 'none';
            }
            return;
        }

        // Show schedule module for regular school days
        if (scheduleModule) {
            scheduleModule.style.display = 'block';
        }

        this.updateScheduleTableContent(tbody, schedule);
    }

    updateScheduleTableContent(tbody, schedule) {
        // Clear existing rows
        tbody.innerHTML = '';

        // Add new rows
        schedule.periods.forEach((period, index) => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-100';
            
            const status = this.getPeriodStatus(period, index);
            
            row.innerHTML = `
                <td class="type-p5 p-4">${period.period_name}</td>
                <td class="type-p5 p-4">${period.start_time} - ${period.end_time}</td>
                <td class="type-p5 p-4">${period.duration_minutes} min</td>
                <td class="type-p5 p-4"><span class="${status.class}">${status.text}</span></td>
            `;

            // Add status classes
            if (status.class.includes('text-primary')) {
                row.classList.add('current-period');
            } else if (status.class.includes('flash')) {
                row.classList.add('flash-next-period');
            }

            tbody.appendChild(row);
        });
    }

    getPeriodStatus(period, index) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const startTime = this.timeToMinutes(period.start_time);
        const endTime = this.timeToMinutes(period.end_time);
        
        console.log(`${period.period_name}: current=${currentTime} (${now.getHours()}:${now.getMinutes()}), start=${startTime} (${period.start_time}), end=${endTime} (${period.end_time})`);

        // Handle overlapping periods - check if current time is within this period
        if (currentTime >= startTime && currentTime < endTime) {
            return { class: 'text-primary', text: 'Current' };
        } 
        // Period has ended
        else if (currentTime >= endTime) {
            return { class: 'text-gray-400', text: 'Completed' };
        } 
        // Period hasn't started yet
        else {
            const timeUntil = startTime - currentTime;
            if (timeUntil <= 5 && timeUntil > 0) {
                return { class: 'text-orange-500', text: 'Starting Soon' };
            }
            return { class: 'text-gray-400', text: 'Upcoming' };
        }
    }

    generateModalContent() {
        let content = '';
        
        // Generate content for each schedule type
        Object.keys(this.currentSchool.bell_schedules).forEach(scheduleType => {
            const schedule = this.currentSchool.bell_schedules[scheduleType];
            if (schedule && schedule.length > 0) {
                content += `
                    <div class="mb-12">
                        <div class="mb-6">
                            <h3 class="type-h3 font-normal text-primary">${this.getScheduleTypeName(scheduleType)}</h3>
                            <p class="type-p5 text-gray-600 mt-2">${this.getScheduleDescription(scheduleType)}</p>
                        </div>
                        
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="border-b-3 border-gray-200">
                                        <th class="type-h5 text-primary font-normal py-4 pr-4 w-1/6">Period</th>
                                        <th class="type-h5 text-primary font-normal p-4 w-1/3">Time</th>
                                        <th class="type-h5 text-primary font-normal p-4 w-1/6">Duration</th>
                                        <th class="type-h5 text-primary font-normal p-4 w-1/6">Status</th>
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

    getScheduleDescription(scheduleType) {
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

    startAutoUpdate(interval = 1000) {
        this.updateInterval = setInterval(() => {
            this.updateDashboard();
        }, interval);
        
        // Initial update
        this.updateDashboard();
    }

    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    exportScheduleData() {
        return {
            currentSchool: this.currentSchool,
            currentSchedule: this.currentSchedule,
            kpiData: this.getKPIData(),
            overrides: {
                dateOverride: this.dateOverride,
                scheduleTypeOverride: this.scheduleTypeOverride
            }
        };
    }

    // Helper methods
    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnhancedBellScheduleManager };
} else {
    // Browser environment
    window.EnhancedBellScheduleManager = EnhancedBellScheduleManager;
}
