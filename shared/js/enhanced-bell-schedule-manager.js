/**
 * Enhanced Bell Schedule Manager with KPI Integration
 * Integrates with existing bell-schedule-notification.html
 */

class EnhancedBellScheduleManager {
    constructor(districtData, schoolCode = 'AVHS') {
        this.districtData = districtData;
        this.schoolCode = schoolCode;
        this.currentSchool = this.getSchoolByCode(schoolCode);
        
        // Validate that we found the school
        if (!this.currentSchool) {
            throw new Error(`School with code '${schoolCode}' not found in district data`);
        }
        
        this.updateInterval = null;
        this.currentSchedule = null;
        
        // Override settings
        this.dateOverride = null;
        this.scheduleTypeOverride = null;
        this.specialEventsOverride = null;
        
        // Dynamic date management
        this.dynamicMinimumDays = [];
        this.dynamicFlexDays = [];
        this.dynamicHolidays = [];
        
        // Update page titles after school is set
        this.updatePageTitles();
    }

    /**
     * Get school data by school code
     */
    getSchoolByCode(schoolCode) {
        return this.districtData.schools.find(school => 
            school.school_code === schoolCode
        );
    }

    /**
     * Switch to a different school
     */
    switchSchool(schoolCode) {
        this.schoolCode = schoolCode;
        this.currentSchool = this.getSchoolByCode(schoolCode);
        this.updatePageTitles();
        this.updateDashboard();
    }

    /**
     * Set date override for testing
     */
    setDateOverride(date) {
        this.dateOverride = date;
    }

    /**
     * Clear date override
     */
    clearDateOverride() {
        this.dateOverride = null;
    }

    /**
     * Set schedule type override
     */
    setScheduleTypeOverride(scheduleType) {
        this.scheduleTypeOverride = scheduleType;
    }

    /**
     * Clear schedule type override
     */
    clearScheduleTypeOverride() {
        this.scheduleTypeOverride = null;
    }

    /**
     * Set special events count override
     */
    setSpecialEventsCount(count) {
        this.specialEventsOverride = count;
    }

    /**
     * Clear all overrides
     */
    clearAllOverrides() {
        this.dateOverride = null;
        this.scheduleTypeOverride = null;
        this.specialEventsOverride = null;
    }

    /**
     * Get the appropriate schedule for a given date
     */
    getScheduleForDate(date = null) {
        const targetDate = this.dateOverride || date || new Date();
        const dateString = targetDate.toISOString().split('T')[0];
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
        
        // Check for holidays first
        if (this.isHoliday(targetDate)) {
            return {
                type: 'holiday',
                name: this.getHolidayName(targetDate),
                periods: [],
                isSchoolDay: false
            };
        }

        // Check for non-student days
        if (this.isNonStudentDay(targetDate)) {
            return {
                type: 'non_student_day',
                name: this.getNonStudentDayDescription(targetDate),
                periods: [],
                isSchoolDay: false
            };
        }

        // Check for special schedule exceptions (SOAR specific)
        if (this.currentSchool.special_bell_schedule_notes) {
            const specialSchedule = this.getSpecialScheduleForDate(targetDate);
            if (specialSchedule) {
                return specialSchedule;
            }
        }

        // Check for minimum days
        if (this.isMinimumDay(targetDate)) {
            return {
                type: 'minimum_day',
                name: 'Minimum Day',
                periods: this.currentSchool.bell_schedules?.minimum_day || [],
                isSchoolDay: true
            };
        }

        // Check for back-to-school nights
        if (this.isBackToSchoolNight(targetDate)) {
            return {
                type: 'minimum_day',
                name: 'Back-to-School Night',
                periods: this.currentSchool.bell_schedules?.minimum_day || [],
                isSchoolDay: true
            };
        }

        // Check for activity days
        if (this.isActivityDay(targetDate)) {
            return {
                type: 'minimum_day',
                name: 'Activity Day',
                periods: this.currentSchool.bell_schedules?.minimum_day || [],
                isSchoolDay: true
            };
        }

        // Determine regular schedule based on school type
        if (this.currentSchool.school_code === 'SOAR') {
            return this.getSOARScheduleForDay(dayOfWeek);
        } else {
            // Check for flex days
            if (this.isFlexDay(targetDate)) {
                return {
                    type: 'flex_day',
                    name: 'Flex Day',
                    periods: this.currentSchool.bell_schedules?.flex_day || [],
                    isSchoolDay: true
                };
            }
            
            // Default to regular day
            return {
                type: 'regular_day',
                name: 'Regular Day',
                periods: this.currentSchool.bell_schedules?.regular_day || [],
                isSchoolDay: true
            };
        }
    }

    /**
     * Get schedule by type
     */
    getScheduleByType(scheduleType) {
        const schedule = this.currentSchool.bell_schedules?.[scheduleType];
        if (schedule) {
            return {
                type: scheduleType,
                name: this.getScheduleTypeName(scheduleType),
                periods: schedule, // schedule is already an array
                isSchoolDay: true,
                isOverride: true
            };
        }
        return null;
    }

    /**
     * Get SOAR High School schedule based on day of week
     */
    getSOARScheduleForDay(dayOfWeek) {
        switch (dayOfWeek) {
            case 1: // Monday
            case 3: // Wednesday
                return {
                    type: 'monday_wednesday_schedule',
                    name: 'Monday / Wednesday Schedule',
                    periods: this.currentSchool.bell_schedules?.monday_wednesday_schedule || [],
                    isSchoolDay: true
                };
            case 2: // Tuesday
            case 4: // Thursday
                return {
                    type: 'tuesday_thursday_schedule',
                    name: 'Tuesday / Thursday Schedule',
                    periods: this.currentSchool.bell_schedules?.tuesday_thursday_schedule || [],
                    isSchoolDay: true
                };
            case 5: // Friday
                return {
                    type: 'friday_schedule',
                    name: 'Friday Schedule',
                    periods: this.currentSchool.bell_schedules?.friday_schedule || [],
                    isSchoolDay: true
                };
            default:
                return {
                    type: 'weekend',
                    name: 'Weekend',
                    periods: [],
                    isSchoolDay: false
                };
        }
    }

    /**
     * Get KPI data for the dashboard
     */
    getKPIData() {
        const now = this.dateOverride || new Date();
        const realTime = new Date(); // Always use real current time for display
        const todaySchedule = this.getScheduleForDate(now);
        this.currentSchedule = todaySchedule;

        const kpiData = {
            // Current time (always real time)
            currentTime: realTime.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),

            // Current date
            currentDate: now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            }),

            // Schedule type
            scheduleType: todaySchedule.name,
            scheduleTypeCode: todaySchedule.type,

            // Current period
            currentPeriod: this.getCurrentPeriod(todaySchedule),

            // Next bell
            nextBell: this.getNextBell(todaySchedule),

            // Special events count
            specialEvents: this.getSpecialEventsCount(now),

            // School day status
            isSchoolDay: todaySchedule.isSchoolDay,

            // Additional info
            schoolName: this.currentSchool.school_name,
            academicYear: this.currentSchool.general_academic_info.academic_year
        };

        return kpiData;
    }

    /**
     * Get current period information
     */
    getCurrentPeriod(schedule) {
        if (!schedule || !schedule.periods || schedule.periods.length === 0) {
            return {
                name: 'No Active Period',
                status: 'outside_hours',
                timeRemaining: 0
            };
        }

        const now = this.dateOverride || new Date();
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

    /**
     * Get next bell information
     */
    getNextBell(schedule) {
        if (!schedule || !schedule.periods || schedule.periods.length === 0) {
            return {
                time: 'No More Bells',
                countdown: '<span class="sleeping-emoji">(ᴗ˳ᴗ)<span class="z1">ᶻ</span><span class="z2">𝗓</span><span class="z3">𐰁</span></span>',
                period: 'School Day Complete'
            };
        }

        const now = this.dateOverride || new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        for (let i = 0; i < schedule.periods.length; i++) {
            const period = schedule.periods[i];
            const startTime = this.timeToMinutes(period.start_time);

            if (startTime > currentTime) {
                const timeUntil = startTime - currentTime;
                const minutes = Math.floor(timeUntil / 60);
                const seconds = timeUntil % 60;
                
                return {
                    time: period.start_time,
                    countdown: `${minutes}:${seconds.toString().padStart(2, '0')}`,
                    period: period.period_name,
                    timeUntil: timeUntil
                };
            }
        }

        return {
            time: 'After Hours',
            countdown: '<span class="sleeping-emoji">(ᴗ˳ᴗ)<span class="z1">ᶻ</span><span class="z2">𝗓</span><span class="z3">𐰁</span></span>',
            period: 'School Day Complete'
        };
    }

    /**
     * Get special events count for today
     */
    getSpecialEventsCount(date) {
        if (this.specialEventsOverride !== null) {
            return this.specialEventsOverride;
        }

        const dateString = date.toISOString().split('T')[0];
        let count = 0;

        // Count back-to-school nights
        if (this.isBackToSchoolNight(date)) count++;

        // Count activity days
        if (this.isActivityDay(date)) count++;

        // Count minimum days
        if (this.isMinimumDay(date)) count++;

        // Count flex days
        if (this.isFlexDay(date)) count++;

        return count;
    }

    /**
     * Update page titles and headers with school-specific content
     */
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
                    weekday: 'long', 
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

    /**
     * Update the dashboard with current KPI data
     */
    updateDashboard() {
        const kpiData = this.getKPIData();

        // Update current time
        this.updateElement('current-time', kpiData.currentTime);

        // Update schedule type
        this.updateElement('schedule-type-display', kpiData.scheduleType);


        // Update next bell
        this.updateElement('next-bell', `${kpiData.nextBell.time} / ${kpiData.nextBell.countdown}`);

        // Update current period KPI (new panel) - extract just the number
        const periodNumber = kpiData.currentPeriod.name.replace(/[^\d]/g, '') || '0';
        this.updateElement('current-period', periodNumber);

        // Update date header
        const dateHeaderElement = document.getElementById('schedule-date');
        if (dateHeaderElement) {
            this.updateElement('schedule-date', kpiData.currentDate);
        }

        // Update the schedule table
        this.updateScheduleTable(this.currentSchedule);
    }

    /**
     * Update element with View Transitions API support
     */
    updateElement(elementId, newContent) {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Check if content contains HTML tags
        const isHTML = /<[^>]*>/g.test(newContent);

        // Special handling for sleeping emoji to prevent animation restart
        if (elementId === 'next-bell' && newContent.includes('sleeping-emoji')) {
            // Only update if the content is different (to avoid restarting animation)
            if (element.innerHTML !== newContent) {
                if ('startViewTransition' in document) {
                    document.startViewTransition(() => {
                        element.innerHTML = newContent;
                    });
                } else {
                    element.innerHTML = newContent;
                }
            }
            return;
        }

        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                if (isHTML) {
                    element.innerHTML = newContent;
                } else {
                    element.textContent = newContent;
                }
            });
        } else {
            if (isHTML) {
                element.innerHTML = newContent;
            } else {
                element.textContent = newContent;
            }
        }
    }

    /**
     * Update the schedule table with current schedule
     */
    updateScheduleTable(schedule) {
        const tbody = document.getElementById('schedule-table-body');
        if (!tbody || !schedule || !schedule.periods) {
            if (tbody) tbody.innerHTML = '<tr><td colspan="3" class="text-center p-4">No schedule available</td></tr>';
            return;
        }

        // Use View Transitions for smooth updates
        if ('startViewTransition' in document) {
            document.startViewTransition(() => {
                this.updateScheduleTableContent(tbody, schedule);
            });
        } else {
            this.updateScheduleTableContent(tbody, schedule);
        }
    }

    /**
     * Update the schedule table content (helper method)
     */
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

    /**
     * Get period status for table display - handles overlapping periods
     */
    getPeriodStatus(period, index) {
        const now = this.dateOverride || new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const startTime = this.timeToMinutes(period.start_time);
        const endTime = this.timeToMinutes(period.end_time);


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

    /**
     * Generate modal content for full schedule view
     */
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

    /**
     * Get schedule type name
     */
    getScheduleTypeName(scheduleType) {
        const names = {
            'monday_wednesday_schedule': 'Monday / Wednesday Schedule',
            'tuesday_thursday_schedule': 'Tuesday / Thursday Schedule',
            'friday_schedule': 'Friday Schedule',
            'regular_day': 'Regular Day',
            'flex_day': 'Flex Day',
            'minimum_day': 'Minimum Day',
            'mtss_day': 'MTSS Day'
        };
        return names[scheduleType] || scheduleType;
    }

    /**
     * Get schedule description
     */
    getScheduleDescription(scheduleType) {
        const descriptions = {
            'monday_wednesday_schedule': 'Extended periods for Monday and Wednesday classes.',
            'tuesday_thursday_schedule': 'Extended periods for Tuesday and Thursday classes with STAR Hour.',
            'friday_schedule': 'Shorter periods covering all classes on Friday.',
            'regular_day': 'Standard daily schedule with all periods and normal timing.',
            'flex_day': 'Modified schedule with extended periods and flexible time blocks.',
            'minimum_day': 'Shortened schedule with reduced class times and early dismissal.',
            'mtss_day': 'Schedule with Multi-Tiered System of Supports (MTSS) periods.'
        };
        return descriptions[scheduleType] || 'Standard schedule format.';
    }

    /**
     * Get period notes
     */
    getPeriodNotes(periodName) {
        if (periodName.includes('Period')) {
            return periodName;
        } else if (periodName === 'Break') {
            return 'Break Period';
        } else if (periodName === 'Lunch') {
            return 'Lunch Break';
        } else if (periodName === 'STAR Hour') {
            return 'Student Time and Resources';
        } else if (periodName === 'MTSS') {
            return 'Multi-Tiered System of Supports';
        }
        return periodName;
    }

    /**
     * Start auto-updating the dashboard
     */
    startAutoUpdate(interval = 1000) {
        this.updateInterval = setInterval(() => {
            this.updateDashboard();
        }, interval);
        
        // Initial update
        this.updateDashboard();
    }

    /**
     * Stop auto-updating
     */
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * Add minimum day
     */
    addMinimumDay(date, reason = '') {
        this.dynamicMinimumDays.push({ date, reason });
    }

    /**
     * Add flex day
     */
    addFlexDay(date, reason = '') {
        this.dynamicFlexDays.push({ date, reason });
    }

    /**
     * Add holiday
     */
    addHoliday(date, name) {
        this.dynamicHolidays.push({ date, name });
    }

    /**
     * Export schedule data
     */
    exportScheduleData() {
        return {
            currentSchool: this.currentSchool,
            currentSchedule: this.currentSchedule,
            kpiData: this.getKPIData(),
            overrides: {
                dateOverride: this.dateOverride,
                scheduleTypeOverride: this.scheduleTypeOverride,
                specialEventsOverride: this.specialEventsOverride
            },
            dynamicDates: {
                minimumDays: this.dynamicMinimumDays,
                flexDays: this.dynamicFlexDays,
                holidays: this.dynamicHolidays
            }
        };
    }

    // Helper methods
    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    isHoliday(date) {
        const dateString = date.toISOString().split('T')[0];
        
        // Check dynamic holidays first
        if (this.dynamicHolidays.some(holiday => holiday.date === dateString)) {
            return true;
        }
        
        // Check static holidays
        return this.currentSchool.holidays_and_important_dates.holidays.some(holiday => {
            if (holiday.end_date) {
                return dateString >= holiday.start_date && dateString <= holiday.end_date;
            }
            return dateString === holiday.start_date;
        });
    }

    getHolidayName(date) {
        const dateString = date.toISOString().split('T')[0];
        
        // Check dynamic holidays first
        const dynamicHoliday = this.dynamicHolidays.find(holiday => holiday.date === dateString);
        if (dynamicHoliday) {
            return dynamicHoliday.name;
        }
        
        // Check static holidays
        const holiday = this.currentSchool.holidays_and_important_dates.holidays.find(holiday => {
            if (holiday.end_date) {
                return dateString >= holiday.start_date && dateString <= holiday.end_date;
            }
            return dateString === holiday.start_date;
        });
        return holiday ? holiday.name : '';
    }

    isNonStudentDay(date) {
        const dateString = date.toISOString().split('T')[0];
        return this.currentSchool.holidays_and_important_dates.non_student_days.some(day => 
            day.date === dateString
        );
    }

    getNonStudentDayDescription(date) {
        const dateString = date.toISOString().split('T')[0];
        const day = this.currentSchool.holidays_and_important_dates.non_student_days.find(day => 
            day.date === dateString
        );
        return day ? day.description : '';
    }

    isMinimumDay(date) {
        const dateString = date.toISOString().split('T')[0];
        
        // Check dynamic minimum days first
        if (this.dynamicMinimumDays.some(day => day.date === dateString)) {
            return true;
        }
        
        // Add your static minimum day logic here
        return false;
    }

    isBackToSchoolNight(date) {
        const dateString = date.toISOString().split('T')[0];
        return this.currentSchool.holidays_and_important_dates.back_to_school_nights.some(event => 
            event.date === dateString
        );
    }

    isActivityDay(date) {
        const dateString = date.toISOString().split('T')[0];
        return this.currentSchool.holidays_and_important_dates.other_minimum_days_with_activities?.some(event => 
            event.date === dateString
        ) || false;
    }

    isFlexDay(date) {
        const dateString = date.toISOString().split('T')[0];
        
        // Check dynamic flex days first
        if (this.dynamicFlexDays.some(day => day.date === dateString)) {
            return true;
        }
        
        // Add your static flex day logic here
        return false;
    }

    getSpecialScheduleForDate(date) {
        // Add SOAR special schedule logic here
        return null;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnhancedBellScheduleManager };
} else {
    // Browser environment
    window.EnhancedBellScheduleManager = EnhancedBellScheduleManager;
}
