import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
/**
 * You will find globals from this file useful!
 */
import { GradeTable } from "./components/GradeTable";
import { MY_BU_ID, BASE_API_URL, TOKEN, GET_DEFAULT_HEADERS } from "./globals";
import { IUniversityClass, IUniversityStudentGrades, IUniversityClassAssignments } from "./types/api_types";

function App() {
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [studentGrades, setStudentGrades] = useState<IUniversityStudentGrades[]>([]);
  const [classAssignments, setClassAssignments] = useState<IUniversityClassAssignments[]>([]);

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/classes`, {
          method: "GET",
          headers: {
            ...GET_DEFAULT_HEADERS(),
            "x-bu-id": MY_BU_ID,
            "x-functions-key": TOKEN,
          },
        });
        const data = await response.json();
        setClassList(data);
        if (data.length > 0) {
          setCurrClassId(data[0].classId);
        }
      } catch (error) {
        console.error("Error fetching class list:", error);
      }
    };

    const fetchStudentGrades = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/student-grades`, {
          method: "GET",
          headers: {
            ...GET_DEFAULT_HEADERS(),
            "x-bu-id": MY_BU_ID,
            "x-functions-key": TOKEN,
          },
        });
        const data = await response.json();
        setStudentGrades(data);
      } catch (error) {
        console.error("Error fetching student grades:", error);
      }
    };

    const fetchClassAssignments = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/class-assignments`, {
          method: "GET",
          headers: {
            ...GET_DEFAULT_HEADERS(),
            "x-bu-id": MY_BU_ID,
            "x-functions-key": TOKEN,
          },
        });
        const data = await response.json();
        setClassAssignments(data);
      } catch (error) {
        console.error("Error fetching class assignments:", error);
      }
    };

    fetchClassList();
    fetchStudentGrades();
    fetchClassAssignments();
  }, []);

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setCurrClassId(event.target.value);
  };
     


  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */
  /**const fetchSomeData = async () => {
    const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
      method: "GET",
    });
    const json = await res.json();
    console.log(json);
  };*/


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Select fullWidth={true} label="Class" value={currClassId} onChange={handleClassChange}>
              {classList.map((classItem) => (
                <option key={classItem.classId} value={classItem.classId}>
                  {classItem.title}
                </option>
              ))}
            </Select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <div>Place the grade table here</div>
          <GradeTable
            studentGrades={studentGrades}
            classes={classList}
            classAssignments={classAssignments}
            currClassId={currClassId}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
