import {
  Box,
  Button,
  Grid,
  Grid2,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CustomizedDataGrid from "../home/CustomizedDataGrid";
import { DatePickerDemo, TimePickerComponent } from "./DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import SnackBar from "../questions/Snackbar";
import { Contest, Question } from "../models";
import { addContest, addOneQuestion } from "@/lib/utils";
import Questions from "./Questions";

export default function AddContest() {
  const [selectedRows, setSelectedRows] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [addStatus, setaddStatus] = React.useState(200);
  const [snakOpen, setSnakOpen] = React.useState(false);

  const [contest, setContest] = React.useState<Contest>({
    contest_id: "string",
    title: "string",
    description: "string",
    questions: [],
    start_time: "string",
    end_time: "string",
    grade: "string",
    subject: "string",
  });
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnakOpen(false);
  };
  function timeChangeHandler(newValue: any, pos: string) {
    setContest({
      ...contest,
      [pos === "start" ? "start_time" : "end_time"]:
        newValue!.format("hh:mm A"),
    });
  }

  const handleSelectionChange = (newSelection: Question) => {
    setSelectedRows((prevSelectedRows: any) => {
      const isAlreadySelected = prevSelectedRows.some(
        (row: Question) => row.id === newSelection.id
      );
      console.log(newSelection);

      if (isAlreadySelected) {
        return prevSelectedRows.filter(
          (row: Question) => row.id !== newSelection.id
        );
      } else {
        return [...prevSelectedRows, newSelection];
      }
    });
  };

  async function handleSubmitContest() {
    const contestData: Contest = {
      ...contest,
      questions: selectedRows,
      contest_id: "something is not missing",
    };
    setIsLoading(true);
    const res = await addContest(contestData);
    setaddStatus(res);
    setSnakOpen(true);
    setIsLoading(false);
  }

  return (
    <Box sx={{ p: 2 }}>
      <SnackBar
        snakOpen={snakOpen}
        handleClose={handleClose}
        addStatus={addStatus}
      />
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Add Contest
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", mb: 3, width: "50%" }}
        >
          <input
            type="text"
            id="company"
            className="bg-gray-50 h-12 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00AB55] focus:border-[#00AB55] block w-full p-2.5 focus:outline-none"
            placeholder="Contest Title"
            onChange={(e) => setContest({ ...contest, title: e.target.value })}
            required
          />

          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#00AB55] focus:border-[#00AB55]  focus:outline-none"
            placeholder="Write descrition..."
            onChange={(e) =>
              setContest({ ...contest, description: e.target.value })
            }
          ></textarea>
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 15,
            mb: 3,
            color: "rgb(99, 115, 129)",
          }}
        >
          Choose Questions
        </Typography>
        <Questions handleSelectionChange={handleSelectionChange} />
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 17,
          fontFamily: "'Public Sans',sans-serif",
          mb: 3,
          color: "rgb(99, 115, 129)",
        }}
      >
        Schedule Date
      </Typography>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} md={3}>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            Date
          </Typography>
          <DatePickerDemo contest={contest} setContest={setContest} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            Start Time
          </Typography>
          <TimePickerComponent
            timeChangeHandler={(newValue: any) =>
              timeChangeHandler(newValue, "start")
            }
          />
        </Grid>
        <Grid xs={12} md={3}>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            End Time
          </Typography>
          <TimePickerComponent
            timeChangeHandler={(newValue: any) =>
              timeChangeHandler(newValue, "end")
            }
          />
        </Grid>
      </Grid>

      <Box>
        <LoadingButton
          loading={isLoading}
          loadingIndicator="Submiting..."
          variant="contained"
          sx={{ bgcolor: "#00AB55", textTransform: "none", fontWeight: 600 }}
          onClick={handleSubmitContest}
        >
          Add Contest
        </LoadingButton>
      </Box>
    </Box>
  );
}
