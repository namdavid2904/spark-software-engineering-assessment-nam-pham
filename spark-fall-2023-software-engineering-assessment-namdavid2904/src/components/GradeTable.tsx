/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
import React, {useState, useEffect} from "react";
import { IUniversityClass, IUniversityStudentGrades, IUniversityClassAssignments } from "../types/api_types";
import { calculateStudentFinalGrade, calcAllFinalGrade } from "../utils/calculate_grade";
interface gradeTable {
  studentGrades:  IUniversityStudentGrades[];
  classes: IUniversityClass[];
  classAssignments: IUniversityClassAssignments[];
  currClassId: string;
}
export function dummyData() {
  return [];
}

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
// gradeTable
export const GradeTable: React.FC<gradeTable> = ({ studentGrades, classes, classAssignments }) => {
  const [finalGrades, setFinalGrades] = useState<{ studentId: string; finalGrade?: number }[]>([]);

  useEffect(() => {
    const calculateFinalGrades = async () => {
      const grades: { studentId: string; finalGrade?: number }[] = [];
      for (const student of studentGrades) {
        const finalGrade = await calculateStudentFinalGrade(student.studentId, student.grades, classAssignments, classes);
        grades.push({ studentId: student.studentId, finalGrade });
      }
      setFinalGrades(grades);
    };

    calculateFinalGrades();
  }, [studentGrades, classes, classAssignments]);

  return (
    <div>
      <h2>Final Grades</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Semester</th>
            <th>Final Grade</th>
          </tr>
        </thead>
        <tbody>
          {finalGrades.map(({ studentId, finalGrade }) => (
            <tr key={studentId}>
              <td>{studentId}</td>
              <td>{getStudentName(studentId, studentGrades)}</td>
              <td>{getClassId(studentId, studentGrades)}</td>
              <td>{getClassName(studentId, studentGrades, classes)}</td>
              <td>{getSemester(studentId, studentGrades, classes)}</td>
              <td>{finalGrade !== undefined ? finalGrade : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function getStudentName(studentId: string, studentGrades: IUniversityStudentGrades[]): string {
    const student = studentGrades.find(student => student.studentId === studentId);
    return student ? student.name : 'N/A';
  }

  function getClassId(studentId: string, studentGrades: IUniversityStudentGrades[]): string {
    const student = studentGrades.find(student => student.studentId === studentId);
    return student ? student.classId : 'N/A';
  }

  function getClassName(studentId: string, studentGrades: IUniversityStudentGrades[], classes: IUniversityClass[]): string {
    const classId = getClassId(studentId, studentGrades);
    const targetClass = classes.find(c => c.classId === classId);
    return targetClass ? targetClass.title : 'N/A';
  }

  function getSemester(studentId: string, studentGrades: IUniversityStudentGrades[], classes: IUniversityClass[]): string {
    const classId = getClassId(studentId, studentGrades);
    const targetClass = classes.find(c => c.classId === classId);
    return targetClass ? targetClass.semester : 'N/A';
  }
};
