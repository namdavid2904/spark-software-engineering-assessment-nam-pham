/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass, IUniversityClassAssignments } from "../types/api_types";

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
// function to calculate student's final grade
export async function calculateStudentFinalGrade(
  studentID: string,
  studentGrades: {[key:string]:number},
  classAssignments: IUniversityClassAssignments[],
  classes: IUniversityClass[]
): Promise<number | undefined> {
  if (!studentGrades) return undefined;
  let totalWeightedGrade = 0;
  let totalWeight = 0;

  for (const assignmentId in studentGrades) {
    const assignmentGrade = studentGrades[assignmentId];
    const assignment = classAssignments.find(a => a.assignmentId === assignmentId);

    if (assignment && assignmentGrade !== undefined) {
      const classId = assignment.classId;
      const klass = classes.find(c => c.classId === classId);

      if (klass) {
        totalWeightedGrade += assignmentGrade * assignment.weight;
        totalWeight += assignment.weight;
      }
    }
  }
  if (totalWeight === 0) return undefined; // Return undefined if total weight is 0 to avoid division by zero
  return totalWeightedGrade / totalWeight;
}

/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns Some data structure that has a list of each student and their final grade.
 */
export async function calcAllFinalGrade(classID: string): Promise<undefined> {
  return undefined;
}
