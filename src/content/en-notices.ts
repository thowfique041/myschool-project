/**
 * English versions of the notices. Official notices are written in Bangla;
 * the English site shows these translations instead.
 */
const principal = "Principal, Webnion School & College";
const examCommittee = "Examination Committee, Webnion School & College";

export const noticesEn: Record<string, { title?: string; summary: string; body: string[]; issuedBy: string; attachmentLabel?: string }> = {
  "admission-circular-2027": {
    summary: "Applications for vacant seats in Play, Nursery and Class 1 to Class 9 for the 2027 academic year open on 10 November.",
    body: [
      "This is to inform everyone concerned that applications will be accepted for vacant seats in Play, Nursery and Class 1 to Class 9 for the 2027 academic year.",
      "Application forms can be collected from and submitted to the school office from 10 November 2026 to 3 December 2026. Forms are also available from the downloads section of the website.",
      "Students for Play to Class 1 will be selected by lottery and a guardian interview, and students for Class 2 to Class 9 by a written admission test.",
      "For details, see the Admission page or contact the office during office hours.",
    ],
    issuedBy: principal,
    attachmentLabel: "Admission circular (PDF)",
  },
  "annual-exam-routine-2026": {
    summary: "The annual examination for Class 1 to Class 9 begins on 22 November. The detailed routine is attached.",
    body: [
      "The 2026 annual examination for Class 1 to Class 9 will begin on Sunday, 22 November and continue until 7 December.",
      "Examinations start at 10:00 AM every day. Candidates must be in their seats by 9:30 AM.",
      "No candidate will be allowed into the examination hall without an admit card. Outstanding fees must be paid by 18 November to collect the admit card.",
    ],
    issuedBy: examCommittee,
    attachmentLabel: "Examination routine (PDF)",
  },
  "hsc-2027-form-fill-up": {
    summary: "Class 12 students will fill in their board forms according to the board's schedule after the test examination results are published.",
    body: [
      "After the test examination results for Class 12 (HSC 2027) are published, form fill-up will take place according to the schedule set by the education board.",
      "Before filling in the form, students must bring their registration card, a recent photograph and the fee payment receipt.",
      "The schedule will be published on the notice board and the website as soon as it is received from the board.",
    ],
    issuedBy: principal,
  },
  "victory-day-2026-programme": {
    summary: "On 16 December at 7:00 AM: national flag hoisting, wreath laying at the Shaheed Minar and a discussion programme.",
    body: [
      "To mark Victory Day, the national flag will be hoisted on the school grounds at 7:00 AM on 16 December.",
      "This will be followed by wreath laying at the Shaheed Minar, a discussion remembering the Liberation War and a cultural programme by students.",
      "All teachers and students are requested to attend on time in the prescribed uniform.",
    ],
    issuedBy: principal,
  },
  "class-routine-change-november": {
    summary: "To prepare for the annual examination, day shift classes will start at 12:15 PM from 1 November.",
    body: [
      "For annual examination preparation classes, from 1 to 20 November the day shift will start at 12:15 PM and end at 4:30 PM.",
      "The morning shift timetable remains unchanged.",
    ],
    issuedBy: "Assistant Head Teacher (Day Shift)",
  },
  "durga-puja-holiday-2026": {
    summary: "Classes for all sections will be closed from 17 to 22 October for Durga Puja.",
    body: [
      "Following the government holiday list, classes for all sections will be closed from 17 to 22 October 2026 for Durga Puja.",
      "Classes resume as usual on Sunday, 25 October. The office will remain open on a limited basis.",
    ],
    issuedBy: principal,
  },
  "science-fair-2026": {
    title: "Inter-class science fair 2026: project submission deadline",
    summary: "Students from Class 6 to Class 12 can submit project summaries by 15 October.",
    body: [
      "Students from Class 6 to Class 12 who wish to take part in the 2026 inter-class science fair should form teams of up to three and submit a one-page project summary to the science department.",
      "The deadline is 15 October 2026. Selected projects will be displayed at the fair.",
    ],
    issuedBy: "Science Department",
  },
  "guardian-meeting-class-10": {
    summary: "A meeting with Class 10 guardians will be held to discuss preparation for the SSC 2027 examination.",
    body: [
      "A meeting has been arranged with guardians of all Class 10 sections to discuss SSC 2027 preparation, attendance and the model test plan.",
      "Date: Saturday, 3 October 2026, 10:00 AM. Venue: school auditorium.",
    ],
    issuedBy: principal,
  },
  "half-yearly-result-2026": {
    summary: "Half-yearly examination results for Class 1 to Class 9 can be collected from the class teacher.",
    body: [
      "The results of the 2026 half-yearly examination have been published. Students can collect their progress reports from their class teacher.",
      "Guardians are requested to sign the progress report and return it within one week.",
    ],
    issuedBy: examCommittee,
  },
  "winter-uniform-reminder": {
    summary: "From 15 November, students may wear the prescribed navy blue sweater or cardigan.",
    body: [
      "From 15 November, students may wear the prescribed navy blue sweater or cardigan with the school uniform.",
      "Please avoid winter clothes in any other colour. Contact the class teacher if needed.",
    ],
    issuedBy: "Assistant Head Teacher",
  },
};
