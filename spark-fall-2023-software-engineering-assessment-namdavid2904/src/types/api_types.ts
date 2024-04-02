import { Assignment } from './../../node_modules/@mui/icons-material/index.d';
/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */
// update types and interfaces for data received from API
export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: string;
  semester: string;
}

export interface IUniversityStudent {
  universityId: string;
  name: string;
  dateEnrolled: string;
  status: string;
}

export interface IUniversityStudentGrades {
  classId: string;
  grades: { [key:string]: number };
  name: string;
  studentId: string;
}

export interface IUniversityClassAssignments {
  assignmentId: string;
  classId: string;
  date: string;
  weight: number;
}
