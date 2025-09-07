/**
 * Bell Schedule Utility Functions
 * Provides logic for calculating current period, next bell, and schedule status
 */

class BellScheduleManager {
    constructor(scheduleData) {
        this.schedule = scheduleData;
        this.currentTime = new Date();
        this.updateInterval = null;
    }

    /**
     * Get the current period based on current time
     * @returns {Object} Current period information
     */
    getCurrentPeriod() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

        for (let i = 0; i < this.schedule.length; i++) {
            const period = this.schedule[i];
            const startTime = this.timeToMinutes(period.startTime);
            const endTime = this.timeToMinutes(period.endTime);

            if (currentTime >= startTime && currentTime < endTime) {
                return {
                    ...period,
                    index: i,
                    status: 'active',
                    timeRemaining: endTime - currentTime
                };
            }
        }

        return null; // No active period
    }

    /**
     * Get the next period/bell
     * @returns {Object} Next period information
     */
    getNextPeriod() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        for (let i = 0; i < this.schedule.length; i++) {
            const period = this.schedule[i];
            const startTime = this.timeToMinutes(period.startTime);

            if (startTime > currentTime) {
                return {
                    ...period,
                    index: i,
                    status: 'upcoming',
                    timeUntil: startTime - currentTime
                };
            }
        }

        return null; // No more periods today
    }

    /**
     * Calculate time until next bell rings
     * @returns {Object} Countdown information
     */
    getNextBellCountdown() {
        const nextPeriod = this.getNextPeriod();
        if (!nextPeriod) return null;

        const now = new Date();
        const nextBellTime = this.parseTime(nextPeriod.startTime);
        const timeDiff = nextBellTime - now;

        if (timeDiff <= 0) return null;

        const minutes = Math.floor(timeDiff / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return {
            minutes,
            seconds,
            totalSeconds: Math.floor(timeDiff / 1000),
            nextBellTime: nextPeriod.startTime,
            periodName: nextPeriod.name
        };
    }

    /**
     * Get today's schedule type
     * @returns {String} Schedule type (Regular, Flex, Minimum, etc.)
     */
    getScheduleType() {
        // This could be enhanced to check for special events, holidays, etc.
        const today = new Date();
        const dayOfWeek = today.getDay();
        
        // Example logic - you can customize this
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return 'Weekend';
        }
        
        // Check for special events (you can add your own logic here)
        const specialEvents = this.getSpecialEvents();
        if (specialEvents.length > 0) {
            return specialEvents[0].type;
        }

        return 'Regular Schedule';
    }

    /**
     * Get special events for today
     * @returns {Array} Array of special events
     */
    getSpecialEvents() {
        const today = new Date();
        const todayString = today.toDateString();
        
        // Example special events - you can customize this
        const events = [
            {
                date: '2024-03-19',
                type: 'Minimum Day',
                description: 'Early dismissal for staff development'
            },
            {
                date: '2024-03-22',
                type: 'Assembly Schedule',
                description: 'Special assembly in gym'
            }
        ];

        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === todayString;
        });
    }

    /**
     * Update all notification elements
     */
    updateNotifications() {
        this.updateCurrentPeriod();
        this.updateCountdown();
        this.updateCurrentTime();
        this.updateScheduleType();
    }

    /**
     * Update current period display
     */
    updateCurrentPeriod() {
        const currentPeriod = this.getCurrentPeriod();
        const element = document.getElementById('current-period-display');
        
        if (!element) return;

        if (currentPeriod) {
            element.innerHTML = `
                <div class="kpi-title">Current Period</div>
                <div class="kpi-value">${currentPeriod.name}</div>
                <div class="kpi-subtitle">${currentPeriod.startTime} - ${currentPeriod.endTime}</div>
                <div class="mt-2">
                    <span class="status-indicator status-active"></span>
                    <span class="text-sm font-medium text-green-800">Active Now</span>
                </div>
            `;
        } else {
            element.innerHTML = `
                <div class="kpi-title">Current Period</div>
                <div class="kpi-value">No Active Period</div>
                <div class="kpi-subtitle">Outside school hours</div>
            `;
        }
    }

    /**
     * Update countdown display
     */
    updateCountdown() {
        const countdown = this.getNextBellCountdown();
        const element = document.getElementById('countdown-display');
        
        if (!element) return;

        if (countdown) {
            const timeString = `${countdown.minutes}:${countdown.seconds.toString().padStart(2, '0')}`;
            element.innerHTML = `
                <div class="kpi-title">Next Bell In</div>
                <div class="kpi-value" id="countdown">${timeString}</div>
                <div class="kpi-subtitle">${countdown.nextBellTime}</div>
            `;

            // Add pulse animation when less than 5 minutes
            const countdownValue = element.querySelector('#countdown');
            if (countdown.minutes < 5) {
                countdownValue.classList.add('countdown-pulse');
            } else {
                countdownValue.classList.remove('countdown-pulse');
            }
        } else {
            element.innerHTML = `
                <div class="kpi-title">Next Bell In</div>
                <div class="kpi-value">--:--</div>
                <div class="kpi-subtitle">No more bells today</div>
            `;
        }
    }

    /**
     * Update current time display
     */
    updateCurrentTime() {
        const now = new Date();
        const element = document.getElementById('current-time-display');
        
        if (!element) return;

        element.innerHTML = `
            <div class="kpi-title">Current Time</div>
            <div class="kpi-value">${now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })}</div>
            <div class="kpi-subtitle">${now.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            })}</div>
        `;
    }

    /**
     * Update schedule type display
     */
    updateScheduleType() {
        const scheduleType = this.getScheduleType();
        const specialEvents = this.getSpecialEvents();
        const element = document.getElementById('schedule-type-display');
        
        if (!element) return;

        element.innerHTML = `
            <div class="kpi-title">Today's Schedule</div>
            <div class="kpi-value">${scheduleType}</div>
            <div class="kpi-subtitle">${specialEvents.length > 0 ? specialEvents[0].description : 'No Special Events'}</div>
        `;
    }

    /**
     * Start auto-updating notifications
     * @param {number} interval - Update interval in milliseconds (default: 1000ms)
     */
    startAutoUpdate(interval = 1000) {
        this.updateInterval = setInterval(() => {
            this.updateNotifications();
        }, interval);
    }

    /**
     * Stop auto-updating notifications
     */
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * Convert time string (e.g., "9:45") to minutes since midnight
     * @param {string} timeString - Time in "HH:MM" format
     * @returns {number} Minutes since midnight
     */
    timeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    /**
     * Parse time string to Date object
     * @param {string} timeString - Time in "HH:MM" format
     * @returns {Date} Date object for today with specified time
     */
    parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
}

// Example schedule data - customize this for your school
const exampleSchedule = [
    { name: 'Period 0', startTime: '7:45', endTime: '8:39', type: 'period' },
    { name: 'Period 1', startTime: '8:45', endTime: '9:42', type: 'period' },
    { name: 'Break', startTime: '9:42', endTime: '9:52', type: 'break' },
    { name: 'Period 2', startTime: '9:52', endTime: '10:49', type: 'period' },
    { name: 'Period 3', startTime: '10:54', endTime: '11:51', type: 'period' },
    { name: 'Lunch', startTime: '11:51', endTime: '12:21', type: 'lunch' },
    { name: 'Period 4', startTime: '12:26', endTime: '1:23', type: 'period' },
    { name: 'Period 5', startTime: '1:28', endTime: '2:25', type: 'period' },
    { name: 'Period 6', startTime: '2:30', endTime: '3:27', type: 'period' }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BellScheduleManager, exampleSchedule };
} else {
    // Browser environment
    window.BellScheduleManager = BellScheduleManager;
    window.exampleSchedule = exampleSchedule;
}

// Example usage:
/*
// Initialize the bell schedule manager
const bellManager = new BellScheduleManager(exampleSchedule);

// Start auto-updating notifications
bellManager.startAutoUpdate();

// To stop updates
// bellManager.stopAutoUpdate();
*/



