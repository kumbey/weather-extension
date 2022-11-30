import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto";
import "./options.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";

const Option: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  const isFieldsDisabled = formState === "saving";

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleSaveBtnClick = () => {
    setFormState("saving");
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  if (!options) {
    return null;
  }

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction={"column"} spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                value={options.homeCity}
                onChange={(e) => handleHomeCityChange(e.target.value)}
                fullWidth
                placeholder="Enter a home city name"
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSaveBtnClick}
                variant="contained"
                color="primary"
                disabled={isFieldsDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<Option />);
