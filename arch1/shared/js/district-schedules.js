/**
 * AV Union High School District - Comprehensive Bell Schedule Data
 * This file contains all school schedules, dates, and configurations
 */

const districtSchedules = {
  "district_information": {
    "name": "AV Union High School District",
    "address": "176 Holston Drive, Lancaster, CA 93535",
    "phone": "(661) 948-7655",
    "copyright": "© Copyright 2019 Antelope Valley Union High School District. All Rights Reserved."
  },
  "schools": [
    {
      "school_name": "Antelope Valley High School",
      "school_code": "AVHS",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD",
        "sb328_compliance_note": "California's SB328 went into effect July 1, 2022. The law requires public high schools to start no earlier than 8:30 am."
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "44900 N. 30th Street East, Lancaster, CA 93535",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {
            "period_name": "Period 0",
            "start_time": "7:45",
            "end_time": "8:39",
            "duration_minutes": 54
          },
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:42",
            "duration_minutes": 57
          },
          {
            "period_name": "Break",
            "start_time": "9:42",
            "end_time": "9:52",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "9:52",
            "end_time": "10:49",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 3",
            "start_time": "10:54",
            "end_time": "11:51",
            "duration_minutes": 57
          },
          {
            "period_name": "Lunch",
            "start_time": "11:51",
            "end_time": "12:21",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4",
            "start_time": "12:26",
            "end_time": "1:23",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 5",
            "start_time": "1:28",
            "end_time": "2:25",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 6",
            "start_time": "2:30",
            "end_time": "3:27",
            "duration_minutes": 57
          }
        ],
        "flex_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "10:15",
            "duration_minutes": 90
          },
          {
            "period_name": "Break",
            "start_time": "10:15",
            "end_time": "10:25",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "10:25",
            "end_time": "11:55",
            "duration_minutes": 90
          },
          {
            "period_name": "Lunch",
            "start_time": "11:55",
            "end_time": "12:25",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 3",
            "start_time": "12:30",
            "end_time": "2:00",
            "duration_minutes": 90
          },
          {
            "period_name": "Period 4",
            "start_time": "2:05",
            "end_time": "3:35",
            "duration_minutes": 90
          }
        ],
        "minimum_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:15",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 2",
            "start_time": "9:20",
            "end_time": "9:50",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 3",
            "start_time": "9:55",
            "end_time": "10:25",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4",
            "start_time": "10:30",
            "end_time": "11:00",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "11:05",
            "end_time": "11:35",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 6",
            "start_time": "11:40",
            "end_time": "12:10",
            "duration_minutes": 30
          }
        ]
      },
      "lunch_formats": {
        "has_split_lunches": false,
        "split_lunch_types": [],
        "split_lunch_criteria": null,
        "a_lunch_departments": [],
        "b_lunch_departments": [],
        "has_area_based_lunches": false,
        "area_based_lunch_names": []
      },
      "holidays_and_important_dates": {
        "holidays": [
          {
            "name": "Labor Day",
            "start_date": "2024-09-02",
            "end_date": null
          },
          {
            "name": "Veterans Day",
            "start_date": "2024-11-11",
            "end_date": null
          },
          {
            "name": "Thanksgiving Break",
            "start_date": "2024-11-25",
            "end_date": "2024-11-29"
          },
          {
            "name": "Winter Break",
            "start_date": "2024-12-23",
            "end_date": "2025-01-06"
          },
          {
            "name": "Martin Luther King Jr. Day",
            "start_date": "2025-01-20",
            "end_date": null
          },
          {
            "name": "Presidents' Day",
            "start_date": "2025-02-17",
            "end_date": null
          },
          {
            "name": "Spring Break",
            "start_date": "2025-04-07",
            "end_date": "2025-04-11"
          },
          {
            "name": "Memorial Day",
            "start_date": "2025-05-26",
            "end_date": null
          }
        ],
        "non_student_days": [
          {
            "date": "2024-10-24",
            "description": "Non-student Day (PD Day)"
          },
          {
            "date": "2025-03-27",
            "description": "Professional Development"
          },
          {
            "date": "2025-06-04",
            "description": "Student Free Day"
          }
        ],
        "back_to_school_nights": [
          {
            "date": "2024-09-12",
            "description": "Back-to-School Night"
          }
        ],
        "end_of_quarter_semester_dates": [
          {
            "name": "End of Quarter 1",
            "date": "2024-10-11"
          },
          {
            "name": "End of Semester 1",
            "date": "2024-12-20"
          },
          {
            "name": "End of Quarter 3",
            "date": "2025-03-14"
          },
          {
            "name": "End of Semester 2",
            "date": "2025-06-05"
          }
        ]
      },
      "disclaimer": "All dates and times are subject to change."
    },
    {
      "school_name": "SOAR High School",
      "school_code": "SOAR",
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
            "period_name": "Period 5T",
            "start_time": "8:30",
            "end_time": "10:05",
            "duration_minutes": 95
          },
          {
            "period_name": "STAR Hour",
            "start_time": "10:05",
            "end_time": "11:05",
            "duration_minutes": 60
          },
          {
            "period_name": "Lunch",
            "start_time": "11:05",
            "end_time": "11:45",
            "duration_minutes": 40
          },
          {
            "period_name": "Period 6T",
            "start_time": "11:55",
            "end_time": "1:30",
            "duration_minutes": 95
          },
          {
            "period_name": "Period 7T",
            "start_time": "1:40",
            "end_time": "3:25",
            "duration_minutes": 105
          }
        ],
        "friday_schedule": [
          {
            "period_name": "Period 1M",
            "start_time": "8:30",
            "end_time": "9:20",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 2M",
            "start_time": "9:25",
            "end_time": "10:15",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 3M",
            "start_time": "10:20",
            "end_time": "11:10",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 4M",
            "start_time": "11:15",
            "end_time": "12:05",
            "duration_minutes": 50
          },
          {
            "period_name": "Lunch",
            "start_time": "12:05",
            "end_time": "12:40",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 5T",
            "start_time": "12:45",
            "end_time": "1:35",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 6T",
            "start_time": "1:40",
            "end_time": "2:30",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 7T",
            "start_time": "2:35",
            "end_time": "3:25",
            "duration_minutes": 50
          }
        ],
        "minimum_day": [
          {
            "period_name": "Period 1M",
            "start_time": "8:30",
            "end_time": "9:05",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 2M",
            "start_time": "9:10",
            "end_time": "9:45",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 3M",
            "start_time": "9:50",
            "end_time": "10:25",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 4M",
            "start_time": "10:30",
            "end_time": "11:05",
            "duration_minutes": 35
          },
          {
            "period_name": "Lunch",
            "start_time": "11:05",
            "end_time": "11:40",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 5T",
            "start_time": "11:45",
            "end_time": "12:20",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 6T",
            "start_time": "12:25",
            "end_time": "1:00",
            "duration_minutes": 35
          },
          {
            "period_name": "Period 7T",
            "start_time": "1:05",
            "end_time": "1:40",
            "duration_minutes": 35
          }
        ]
      },
      "lunch_formats": {
        "has_split_lunches": false,
        "split_lunch_types": [],
        "split_lunch_criteria": null,
        "a_lunch_departments": [],
        "b_lunch_departments": [],
        "has_area_based_lunches": false,
        "area_based_lunch_names": []
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
    },
    {
      "school_name": "Desert Winds High School",
      "school_code": "DWHS",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD"
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "44740 20th Street East, Lancaster, CA 93535",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:30",
            "end_time": "9:15",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 2",
            "start_time": "9:17",
            "end_time": "10:02",
            "duration_minutes": 45
          },
          {
            "period_name": "Break",
            "start_time": "10:02",
            "end_time": "10:12",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 3",
            "start_time": "10:14",
            "end_time": "10:59",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 4",
            "start_time": "11:01",
            "end_time": "11:46",
            "duration_minutes": 45
          },
          {
            "period_name": "Lunch",
            "start_time": "11:46",
            "end_time": "12:16",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "12:16",
            "end_time": "1:01",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 6",
            "start_time": "1:03",
            "end_time": "1:48",
            "duration_minutes": 45
          },
          {
            "period_name": "Break",
            "start_time": "1:48",
            "end_time": "1:58",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 7",
            "start_time": "2:00",
            "end_time": "2:45",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 8",
            "start_time": "2:47",
            "end_time": "3:32",
            "duration_minutes": 45
          }
        ],
        "flex_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:30",
            "end_time": "9:14",
            "duration_minutes": 44
          },
          {
            "period_name": "Period 2",
            "start_time": "9:16",
            "end_time": "10:00",
            "duration_minutes": 44
          },
          {
            "period_name": "Break",
            "start_time": "10:00",
            "end_time": "10:05",
            "duration_minutes": 5
          },
          {
            "period_name": "Period 3",
            "start_time": "10:07",
            "end_time": "10:51",
            "duration_minutes": 44
          },
          {
            "period_name": "Period 4",
            "start_time": "10:53",
            "end_time": "11:37",
            "duration_minutes": 44
          },
          {
            "period_name": "Lunch",
            "start_time": "11:37",
            "end_time": "12:07",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "12:07",
            "end_time": "12:51",
            "duration_minutes": 44
          },
          {
            "period_name": "Period 6",
            "start_time": "12:53",
            "end_time": "1:37",
            "duration_minutes": 44
          },
          {
            "period_name": "Break",
            "start_time": "1:37",
            "end_time": "1:42",
            "duration_minutes": 5
          },
          {
            "period_name": "Period 7",
            "start_time": "1:44",
            "end_time": "2:28",
            "duration_minutes": 44
          },
          {
            "period_name": "Period 8",
            "start_time": "2:30",
            "end_time": "3:14",
            "duration_minutes": 44
          }
        ],
        "mtss_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:30",
            "end_time": "9:11",
            "duration_minutes": 41
          },
          {
            "period_name": "Period 2",
            "start_time": "9:13",
            "end_time": "9:54",
            "duration_minutes": 41
          },
          {
            "period_name": "Break",
            "start_time": "9:54",
            "end_time": "10:04",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 3",
            "start_time": "10:06",
            "end_time": "10:47",
            "duration_minutes": 41
          },
          {
            "period_name": "MTSS",
            "start_time": "10:47",
            "end_time": "11:03",
            "duration_minutes": 16
          },
          {
            "period_name": "Period 4",
            "start_time": "11:05",
            "end_time": "11:46",
            "duration_minutes": 41
          },
          {
            "period_name": "Lunch",
            "start_time": "11:46",
            "end_time": "12:16",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "12:16",
            "end_time": "12:57",
            "duration_minutes": 41
          },
          {
            "period_name": "Period 6",
            "start_time": "12:59",
            "end_time": "1:40",
            "duration_minutes": 41
          },
          {
            "period_name": "Break",
            "start_time": "1:40",
            "end_time": "1:50",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 7",
            "start_time": "1:52",
            "end_time": "2:33",
            "duration_minutes": 41
          },
          {
            "period_name": "MTSS",
            "start_time": "2:33",
            "end_time": "2:49",
            "duration_minutes": 16
          },
          {
            "period_name": "Period 8",
            "start_time": "2:51",
            "end_time": "3:32",
            "duration_minutes": 41
          }
        ]
      },
      "lunch_formats": {
        "has_split_lunches": false,
        "split_lunch_types": [],
        "split_lunch_criteria": null,
        "a_lunch_departments": [],
        "b_lunch_departments": [],
        "has_area_based_lunches": false,
        "area_based_lunch_names": []
      },
      "holidays_and_important_dates": {
        "holidays": [
          {
            "name": "Labor Day",
            "start_date": "2024-09-02",
            "end_date": null
          },
          {
            "name": "Veterans Day",
            "start_date": "2024-11-11",
            "end_date": null
          },
          {
            "name": "Thanksgiving Break",
            "start_date": "2024-11-25",
            "end_date": "2024-11-29"
          },
          {
            "name": "Winter Break",
            "start_date": "2024-12-23",
            "end_date": "2025-01-06"
          },
          {
            "name": "Martin Luther King Jr. Day",
            "start_date": "2025-01-20",
            "end_date": null
          },
          {
            "name": "Presidents' Day",
            "start_date": "2025-02-17",
            "end_date": null
          },
          {
            "name": "Spring Break",
            "start_date": "2025-04-07",
            "end_date": "2025-04-11"
          },
          {
            "name": "Memorial Day",
            "start_date": "2025-05-26",
            "end_date": null
          }
        ],
        "non_student_days": [
          {
            "date": "2024-10-24",
            "description": "Non-student Day (PD Day)"
          },
          {
            "date": "2025-03-27",
            "description": "Professional Development"
          },
          {
            "date": "2025-06-04",
            "description": "Student Free Day"
          }
        ],
        "back_to_school_nights": [
          {
            "date": "2024-09-12",
            "description": "Back-to-School Night"
          }
        ]
      },
      "disclaimer": "All dates and times are subject to change."
    },
    {
      "school_name": "Lancaster High School",
      "school_code": "LHS",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD"
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "44701 N. 30th Street East, Lancaster, CA 93535",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:30",
            "end_time": "9:20",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 2",
            "start_time": "9:25",
            "end_time": "10:15",
            "duration_minutes": 50
          },
          {
            "period_name": "Break",
            "start_time": "10:15",
            "end_time": "10:25",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 3",
            "start_time": "10:30",
            "end_time": "11:20",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 4A",
            "start_time": "11:25",
            "end_time": "12:15",
            "duration_minutes": 50
          },
          {
            "period_name": "4A Lunch",
            "start_time": "12:15",
            "end_time": "12:45",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4B",
            "start_time": "12:20",
            "end_time": "1:10",
            "duration_minutes": 50
          },
          {
            "period_name": "4B Lunch",
            "start_time": "12:50",
            "end_time": "1:20",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "1:25",
            "end_time": "2:15",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 6",
            "start_time": "2:20",
            "end_time": "3:10",
            "duration_minutes": 50
          }
        ],
        "flex_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:30",
            "end_time": "9:15",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 2",
            "start_time": "9:20",
            "end_time": "10:05",
            "duration_minutes": 45
          },
          {
            "period_name": "Break",
            "start_time": "10:05",
            "end_time": "10:10",
            "duration_minutes": 5
          },
          {
            "period_name": "Period 3",
            "start_time": "10:15",
            "end_time": "11:00",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 4A",
            "start_time": "11:05",
            "end_time": "11:50",
            "duration_minutes": 45
          },
          {
            "period_name": "4A Lunch",
            "start_time": "11:50",
            "end_time": "12:20",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4B",
            "start_time": "11:55",
            "end_time": "12:40",
            "duration_minutes": 45
          },
          {
            "period_name": "4B Lunch",
            "start_time": "12:25",
            "end_time": "12:55",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "1:00",
            "end_time": "1:45",
            "duration_minutes": 45
          },
          {
            "period_name": "Period 6",
            "start_time": "1:50",
            "end_time": "2:35",
            "duration_minutes": 45
          }
        ],
        "minimum_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:30",
            "end_time": "9:00",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 2",
            "start_time": "9:05",
            "end_time": "9:35",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 3",
            "start_time": "9:40",
            "end_time": "10:10",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4A",
            "start_time": "10:15",
            "end_time": "10:45",
            "duration_minutes": 30
          },
          {
            "period_name": "4A Lunch",
            "start_time": "10:45",
            "end_time": "11:15",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4B",
            "start_time": "10:50",
            "end_time": "11:20",
            "duration_minutes": 30
          },
          {
            "period_name": "4B Lunch",
            "start_time": "11:20",
            "end_time": "11:50",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "11:55",
            "end_time": "12:25",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 6",
            "start_time": "12:30",
            "end_time": "1:00",
            "duration_minutes": 30
          }
        ]
      },
      "lunch_formats": {
        "has_split_lunches": true,
        "split_lunch_types": ["A/B Lunch"],
        "split_lunch_criteria": "by_department",
        "a_lunch_departments": ["English", "Math", "Science"],
        "b_lunch_departments": ["Social Studies", "PE", "Electives"],
        "has_area_based_lunches": false,
        "area_based_lunch_names": []
      },
      "holidays_and_important_dates": {
        "holidays": [
          {
            "name": "Labor Day",
            "start_date": "2024-09-02",
            "end_date": null
          },
          {
            "name": "Veterans Day",
            "start_date": "2024-11-11",
            "end_date": null
          },
          {
            "name": "Thanksgiving Break",
            "start_date": "2024-11-25",
            "end_date": "2024-11-29"
          },
          {
            "name": "Winter Break",
            "start_date": "2024-12-23",
            "end_date": "2025-01-06"
          },
          {
            "name": "Martin Luther King Jr. Day",
            "start_date": "2025-01-20",
            "end_date": null
          },
          {
            "name": "Presidents' Day",
            "start_date": "2025-02-17",
            "end_date": null
          },
          {
            "name": "Spring Break",
            "start_date": "2025-04-07",
            "end_date": "2025-04-11"
          },
          {
            "name": "Memorial Day",
            "start_date": "2025-05-26",
            "end_date": null
          }
        ],
        "non_student_days": [
          {
            "date": "2024-10-24",
            "description": "Non-student Day (PD Day)"
          },
          {
            "date": "2025-03-27",
            "description": "Professional Development"
          },
          {
            "date": "2025-06-04",
            "description": "Student Free Day"
          }
        ],
        "back_to_school_nights": [
          {
            "date": "2024-09-12",
            "description": "Back-to-School Night"
          }
        ]
      },
      "disclaimer": "All dates and times are subject to change."
    },
    {
      "school_name": "Eastside High School",
      "school_code": "EHS",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD",
        "sb328_compliance_note": "California's SB328 went into effect July 1, 2022. The law requires public high schools to start no earlier than 8:30 am."
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "TBD",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {
            "period_name": "Period 0",
            "start_time": "7:45",
            "end_time": "8:39",
            "duration_minutes": 54
          },
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:42",
            "duration_minutes": 57
          },
          {
            "period_name": "Snack",
            "start_time": "9:42",
            "end_time": "9:52",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "9:58",
            "end_time": "10:58",
            "duration_minutes": 60
          },
          {
            "period_name": "Period 3",
            "start_time": "11:04",
            "end_time": "12:01",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 4A Lunch",
            "start_time": "12:01",
            "end_time": "12:31",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4A",
            "start_time": "12:37",
            "end_time": "1:34",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 4B",
            "start_time": "12:07",
            "end_time": "1:04",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 4B Lunch",
            "start_time": "1:04",
            "end_time": "1:34",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "1:40",
            "end_time": "2:37",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 6",
            "start_time": "2:43",
            "end_time": "3:40",
            "duration_minutes": 57
          }
        ],
        "flex_day": [
          {
            "period_name": "Period 0",
            "start_time": "7:45",
            "end_time": "8:39",
            "duration_minutes": 54
          },
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:34",
            "duration_minutes": 49
          },
          {
            "period_name": "Snack",
            "start_time": "9:34",
            "end_time": "9:44",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "9:50",
            "end_time": "10:39",
            "duration_minutes": 49
          },
          {
            "period_name": "Period 3",
            "start_time": "10:45",
            "end_time": "11:35",
            "duration_minutes": 50
          },
          {
            "period_name": "Period 4A Lunch",
            "start_time": "11:35",
            "end_time": "12:05",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4A",
            "start_time": "12:11",
            "end_time": "1:00",
            "duration_minutes": 49
          },
          {
            "period_name": "Period 4B",
            "start_time": "11:41",
            "end_time": "12:30",
            "duration_minutes": 49
          },
          {
            "period_name": "Period 4B Lunch",
            "start_time": "12:30",
            "end_time": "1:00",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "1:06",
            "end_time": "1:55",
            "duration_minutes": 49
          },
          {
            "period_name": "Period 6",
            "start_time": "2:01",
            "end_time": "2:50",
            "duration_minutes": 49
          }
        ],
        "minimum_day": [
          {
            "period_name": "Period 0",
            "start_time": "7:45",
            "end_time": "8:39",
            "duration_minutes": 54
          },
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:22",
            "duration_minutes": 37
          },
          {
            "period_name": "Snack",
            "start_time": "9:22",
            "end_time": "9:32",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "9:38",
            "end_time": "10:15",
            "duration_minutes": 37
          },
          {
            "period_name": "Period 3",
            "start_time": "10:21",
            "end_time": "10:58",
            "duration_minutes": 37
          },
          {
            "period_name": "Period 4A Lunch",
            "start_time": "10:58",
            "end_time": "11:28",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4A",
            "start_time": "11:34",
            "end_time": "12:11",
            "duration_minutes": 37
          },
          {
            "period_name": "Period 4B",
            "start_time": "11:04",
            "end_time": "11:41",
            "duration_minutes": 37
          },
          {
            "period_name": "Period 4B Lunch",
            "start_time": "11:41",
            "end_time": "12:11",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "12:17",
            "end_time": "12:54",
            "duration_minutes": 37
          },
          {
            "period_name": "Period 6",
            "start_time": "1:00",
            "end_time": "1:37",
            "duration_minutes": 37
          }
        ],
        "OSC Schedule": [
          {
            "period_name": "Session 1A",
            "start_time": "8:30",
            "end_time": "10:38",
            "duration_minutes": 128
          },
          {
            "period_name": "Lunch",
            "start_time": "10:38",
            "end_time": "11:08",
            "duration_minutes": 30
          },
          {
            "period_name": "Session 1B",
            "start_time": "11:08",
            "end_time": "11:46",
            "duration_minutes": 38
          },
          {
            "period_name": "Session 2",
            "start_time": "12:16",
            "end_time": "3:32",
            "duration_minutes": 196
          }
        ]
      },
      "lunch_formats": {
        "has_split_lunches": true,
        "split_lunch_types": ["4A/4B Lunch"],
        "split_lunch_criteria": "by_class_period",
        "a_lunch_departments": [],
        "b_lunch_departments": [],
        "has_area_based_lunches": false,
        "area_based_lunch_names": []
      },
      "holidays_and_important_dates": {
        "holidays": [
          {
            "name": "Independence Day",
            "start_date": "2024-07-04",
            "end_date": null
          },
          {
            "name": "Labor Day",
            "start_date": "2024-09-02",
            "end_date": null
          },
          {
            "name": "Veteran's Day",
            "start_date": "2024-11-11",
            "end_date": null
          },
          {
            "name": "Thanksgiving Break",
            "start_date": "2024-11-25",
            "end_date": "2024-11-29"
          },
          {
            "name": "Winter Break",
            "start_date": "2024-12-23",
            "end_date": "2025-01-10"
          },
          {
            "name": "Martin Luther King Jr. Day",
            "start_date": "2025-01-20",
            "end_date": null
          },
          {
            "name": "Lincoln's Birthday",
            "start_date": "2025-02-10",
            "end_date": null
          },
          {
            "name": "President's Day",
            "start_date": "2025-02-17",
            "end_date": null
          },
          {
            "name": "Spring Break",
            "start_date": "2025-03-24",
            "end_date": "2025-03-28"
          },
          {
            "name": "Memorial Day",
            "start_date": "2025-05-26",
            "end_date": null
          }
        ],
        "non_student_days": [
          {
            "date": "2024-10-23",
            "description": "Student Free Day"
          },
          {
            "date": "2025-02-05",
            "description": "Student Free Day"
          },
          {
            "date": "2025-04-09",
            "description": "Student Free Day"
          }
        ],
        "back_to_school_nights": [
          {
            "date": "2024-09-04",
            "description": "Back to School Night"
          },
          {
            "date": "2025-01-29",
            "description": "Back to School Night"
          }
        ]
      },
      "disclaimer": "All dates and times are subject to change."
    },
    {
      "school_name": "Highland High School",
      "school_code": "HHS",
      "general_academic_info": {
        "academic_year": "2025-2026",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD",
        "sb328_compliance_note": "California's SB328 went into effect July 1, 2022. The law requires public high schools to start no earlier than 8:30 am."
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "39055 25th Street West, Palmdale, CA 93551",
          "phone": "(661) 274-4619"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {
            "period_name": "Period 0",
            "start_time": "7:45",
            "end_time": "8:39",
            "duration_minutes": 54
          },
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:42",
            "duration_minutes": 57
          },
          {
            "period_name": "Break",
            "start_time": "9:42",
            "end_time": "9:52",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "9:58",
            "end_time": "10:58",
            "duration_minutes": 60
          },
          {
            "period_name": "Period 3",
            "start_time": "11:04",
            "end_time": "12:01",
            "duration_minutes": 57
          },
          {
            "period_name": "4A Lunch",
            "start_time": "12:01",
            "end_time": "12:31",
            "duration_minutes": 30
          },
          {
            "period_name": "4A Class",
            "start_time": "12:37",
            "end_time": "1:34",
            "duration_minutes": 57
          },
          {
            "period_name": "4B Class",
            "start_time": "12:07",
            "end_time": "1:04",
            "duration_minutes": 57
          },
          {
            "period_name": "4B Lunch",
            "start_time": "1:04",
            "end_time": "1:34",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "1:40",
            "end_time": "2:37",
            "duration_minutes": 57
          },
          {
            "period_name": "Period 6",
            "start_time": "2:43",
            "end_time": "3:40",
            "duration_minutes": 57
          }
        ],
        "flex_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "10:15",
            "duration_minutes": 90
          },
          {
            "period_name": "Break",
            "start_time": "10:15",
            "end_time": "10:25",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 2",
            "start_time": "10:25",
            "end_time": "11:55",
            "duration_minutes": 90
          },
          {
            "period_name": "Lunch",
            "start_time": "11:55",
            "end_time": "12:25",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 3",
            "start_time": "12:30",
            "end_time": "2:00",
            "duration_minutes": 90
          },
          {
            "period_name": "Break",
            "start_time": "2:00",
            "end_time": "2:10",
            "duration_minutes": 10
          },
          {
            "period_name": "Period 4",
            "start_time": "2:15",
            "end_time": "3:35",
            "duration_minutes": 80
          }
        ],
        "minimum_day": [
          {
            "period_name": "Period 1",
            "start_time": "8:45",
            "end_time": "9:15",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 2",
            "start_time": "9:20",
            "end_time": "9:50",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 3",
            "start_time": "9:55",
            "end_time": "10:25",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 4",
            "start_time": "10:30",
            "end_time": "11:00",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 5",
            "start_time": "11:05",
            "end_time": "11:35",
            "duration_minutes": 30
          },
          {
            "period_name": "Period 6",
            "start_time": "11:40",
            "end_time": "12:10",
            "duration_minutes": 30
          }
        ]
      },
      "lunch_formats": {
        "has_split_lunches": false,
        "split_lunch_types": [],
        "split_lunch_criteria": null,
        "a_lunch_departments": [],
        "b_lunch_departments": [],
        "has_area_based_lunches": false,
        "area_based_lunch_names": []
      },
      "holidays_and_important_dates": {
        "holidays": [
          {
            "name": "Labor Day",
            "start_date": "2024-09-02",
            "end_date": null
          },
          {
            "name": "Veteran's Day",
            "start_date": "2024-11-11",
            "end_date": null
          },
          {
            "name": "Thanksgiving Break",
            "start_date": "2024-11-25",
            "end_date": "2024-11-29"
          },
          {
            "name": "Winter Break",
            "start_date": "2024-12-23",
            "end_date": "2025-01-10"
          },
          {
            "name": "Martin Luther King Jr. Day",
            "start_date": "2025-01-20",
            "end_date": null
          },
          {
            "name": "Lincoln's Birthday",
            "start_date": "2025-02-10",
            "end_date": null
          },
          {
            "name": "President's Day",
            "start_date": "2025-02-17",
            "end_date": null
          },
          {
            "name": "Spring Break",
            "start_date": "2025-03-24",
            "end_date": "2025-03-28"
          },
          {
            "name": "Memorial Day",
            "start_date": "2025-05-26",
            "end_date": null
          }
        ],
        "non_student_days": [
          {
            "date": "2024-10-23",
            "description": "Student Free Day"
          },
          {
            "date": "2025-02-05",
            "description": "Student Free Day"
          },
          {
            "date": "2025-06-04",
            "description": "Student Free Day"
          }
        ],
        "back_to_school_nights": [
          {
            "date": "2024-09-12",
            "description": "Back-to-School Night"
          }
        ],
        "end_of_quarter_semester_dates": [
          {
            "name": "End of Quarter 1",
            "date": "2024-10-18"
          },
          {
            "name": "End of Quarter 2",
            "date": "2024-12-20"
          },
          {
            "name": "End of Semester 1",
            "date": "2024-12-20"
          },
          {
            "name": "End of Quarter 3",
            "date": "2025-03-14"
          },
          {
            "name": "End of Quarter 4",
            "date": "2025-06-05"
          },
          {
            "name": "End of Semester 2",
            "date": "2025-06-05"
          }
        ]
      },
      "disclaimer": "All dates and times are subject to change."
    },

    // Knight High School
    {
      "school_name": "Knight High School",
      "school_code": "KHS",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD",
        "sb328_compliance_note": "California's SB328 went into effect July 1, 2022. The law requires public high schools to start no earlier than 8:30 am."
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "176 Holston Drive Lancaster, CA 93535",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
            {"period_name": "Period 1", "start_time": "08:30", "end_time": "09:15", "duration_minutes": 45},
            {"period_name": "Period 2", "start_time": "09:17", "end_time": "10:02", "duration_minutes": 45},
            {"period_name": "Break", "start_time": "10:02", "end_time": "10:12", "duration_minutes": 10},
            {"period_name": "Period 3", "start_time": "10:14", "end_time": "10:59", "duration_minutes": 45},
            {"period_name": "Period 4", "start_time": "11:01", "end_time": "11:46", "duration_minutes": 45},
            {"period_name": "Lunch", "start_time": "11:46", "end_time": "12:16", "duration_minutes": 30},
            {"period_name": "Period 5", "start_time": "12:16", "end_time": "13:01", "duration_minutes": 45},
            {"period_name": "Period 6", "start_time": "13:03", "end_time": "13:48", "duration_minutes": 45},
            {"period_name": "Period 7", "start_time": "14:00", "end_time": "14:45", "duration_minutes": 45},
            {"period_name": "Period 8", "start_time": "14:47", "end_time": "15:32", "duration_minutes": 45}
        ],
        "flex_day": [
            {"period_name": "Period 1", "start_time": "08:30", "end_time": "09:14", "duration_minutes": 44},
            {"period_name": "Period 2", "start_time": "09:16", "end_time": "10:00", "duration_minutes": 44},
            {"period_name": "Break", "start_time": "10:00", "end_time": "10:05", "duration_minutes": 5},
            {"period_name": "Period 3", "start_time": "10:07", "end_time": "10:51", "duration_minutes": 44},
            {"period_name": "Period 4", "start_time": "10:53", "end_time": "11:37", "duration_minutes": 44},
            {"period_name": "Lunch", "start_time": "11:37", "end_time": "12:07", "duration_minutes": 30},
            {"period_name": "Period 5", "start_time": "12:07", "end_time": "12:51", "duration_minutes": 44},
            {"period_name": "Period 6", "start_time": "12:53", "end_time": "13:37", "duration_minutes": 44},
            {"period_name": "Break", "start_time": "13:37", "end_time": "13:42", "duration_minutes": 5},
            {"period_name": "Period 7", "start_time": "13:44", "end_time": "14:28", "duration_minutes": 44},
            {"period_name": "Period 8", "start_time": "14:30", "end_time": "15:14", "duration_minutes": 44}
        ]
      },
      "holidays_and_important_dates": {
        "holidays": [],
        "non_student_days": [],
        "back_to_school_nights": [],
        "end_of_quarter_semester_dates": [],
        "semester_final_dates": [],
        "testing_dates": [],
        "other_minimum_days_with_activities": []
      }
    },

    // Knight Academy of Antelope Valley (KAAV)
    {
      "school_name": "Knight Academy of Antelope Valley",
      "school_code": "KAAV",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD",
        "sb328_compliance_note": "California's SB328 went into effect July 1, 2022. The law requires public high schools to start no earlier than 8:30 am."
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "176 Holston Drive Lancaster, CA 93535",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {"period_name": "Period 1", "start_time": "08:00", "end_time": "08:49", "duration_minutes": 49},
          {"period_name": "Period 2", "start_time": "08:52", "end_time": "09:38", "duration_minutes": 46},
          {"period_name": "Break", "start_time": "09:38", "end_time": "09:53", "duration_minutes": 15},
          {"period_name": "Period 3", "start_time": "09:56", "end_time": "10:42", "duration_minutes": 46},
          {"period_name": "Period 4", "start_time": "10:45", "end_time": "11:31", "duration_minutes": 46},
          {"period_name": "Period 5", "start_time": "11:34", "end_time": "12:20", "duration_minutes": 46},
          {"period_name": "Lunch", "start_time": "12:20", "end_time": "12:50", "duration_minutes": 30},
          {"period_name": "Period 6", "start_time": "12:53", "end_time": "13:39", "duration_minutes": 46},
          {"period_name": "Period 7", "start_time": "13:42", "end_time": "14:28", "duration_minutes": 46}
        ],
        "flex_day": [
          {"period_name": "Period 1", "start_time": "08:00", "end_time": "08:36", "duration_minutes": 36},
          {"period_name": "Period 2", "start_time": "08:39", "end_time": "09:15", "duration_minutes": 36},
          {"period_name": "Break", "start_time": "09:15", "end_time": "09:30", "duration_minutes": 15},
          {"period_name": "Period 3", "start_time": "09:33", "end_time": "10:09", "duration_minutes": 36},
          {"period_name": "Period 4", "start_time": "10:12", "end_time": "10:48", "duration_minutes": 36},
          {"period_name": "Period 5", "start_time": "10:51", "end_time": "11:27", "duration_minutes": 36},
          {"period_name": "Lunch", "start_time": "11:27", "end_time": "11:57", "duration_minutes": 30},
          {"period_name": "Period 6", "start_time": "12:00", "end_time": "12:36", "duration_minutes": 36},
          {"period_name": "Period 7", "start_time": "12:39", "end_time": "13:15", "duration_minutes": 36}
        ],
        "minimum_day": [
          {"period_name": "Period 1", "start_time": "08:00", "end_time": "08:30", "duration_minutes": 30},
          {"period_name": "Period 2", "start_time": "08:33", "end_time": "09:03", "duration_minutes": 30},
          {"period_name": "Period 3", "start_time": "09:06", "end_time": "09:36", "duration_minutes": 30},
          {"period_name": "Period 4", "start_time": "09:39", "end_time": "10:09", "duration_minutes": 30},
          {"period_name": "Lunch", "start_time": "10:09", "end_time": "10:39", "duration_minutes": 30},
          {"period_name": "Period 5", "start_time": "10:42", "end_time": "11:12", "duration_minutes": 30},
          {"period_name": "Period 6", "start_time": "11:15", "end_time": "11:45", "duration_minutes": 30},
          {"period_name": "Period 7", "start_time": "11:48", "end_time": "12:18", "duration_minutes": 30}
        ]
      },
      "holidays_and_important_dates": {
        "holidays": [],
        "non_student_days": [],
        "back_to_school_nights": [
          {"date": "2025-09-03", "description": "Back to School Night"},
          {"date": "2026-01-28", "description": "Back to School Night"}
        ],
        "end_of_quarter_semester_dates": [],
        "semester_final_dates": [],
        "testing_dates": [],
        "other_minimum_days_with_activities": []
      },
      "special_bell_schedule_notes": "The last two Tuesdays of the year (May 26, and June 2, 2026) follow the Regular Day schedule, dismissing at 2:28 PM."
    },

    // Knight Prep Academy
    {
      "school_name": "Knight Prep Academy",
      "school_code": "KPA",
      "general_academic_info": {
        "academic_year": "2024-2025",
        "first_day_of_school": "2024-08-12",
        "last_day_of_school": "2025-06-05",
        "graduation_date": "TBD",
        "sb328_compliance_note": "California's SB328 went into effect July 1, 2022. The law requires public high schools to start no earlier than 8:30 am."
      },
      "campus_details": [
        {
          "campus_name": "Main Campus",
          "address": "176 Holston Drive Lancaster, CA 93535",
          "phone": "(661) 948-7655"
        }
      ],
      "bell_schedules": {
        "regular_day": [
          {"period_name": "Schedule Not Available", "start_time": "00:00", "end_time": "00:00", "duration_minutes": 0}
        ]
      },
      "holidays_and_important_dates": {
        "holidays": [],
        "non_student_days": [],
        "back_to_school_nights": [],
        "end_of_quarter_semester_dates": [],
        "semester_final_dates": [],
        "testing_dates": [],
        "other_minimum_days_with_activities": []
      },
      "special_bell_schedule_notes": "Detailed bell schedule information for Knight Prep Academy is not available in the provided sources."
    }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { districtSchedules };
} else {
    // Browser environment
    window.districtSchedules = districtSchedules;
}
