import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameSettings } from "../../features/word/types";

const languages = ["한국어", "English", "日本語", "中文"];

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<GameSettings>({
    sound: true,
    music: true,
    difficulty: "medium",
    language: "한국어",
  });

  const handleSettingChange = (key: keyof GameSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Paper elevation={3} className="p-8">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          설정
        </Typography>

        <Grid container spacing={3} className="mt-4">
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.sound}
                  onChange={(e) =>
                    handleSettingChange("sound", e.target.checked)
                  }
                />
              }
              label="효과음"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.music}
                  onChange={(e) =>
                    handleSettingChange("music", e.target.checked)
                  }
                />
              }
              label="배경음악"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>난이도</InputLabel>
              <Select
                value={settings.difficulty}
                onChange={(e) =>
                  handleSettingChange("difficulty", e.target.value)
                }
                label="난이도"
              >
                <MenuItem value="easy">쉬움</MenuItem>
                <MenuItem value="medium">보통</MenuItem>
                <MenuItem value="hard">어려움</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>언어</InputLabel>
              <Select
                value={settings.language}
                onChange={(e) =>
                  handleSettingChange("language", e.target.value)
                }
                label="언어"
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/word/home")}
            >
              저장하고 돌아가기
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Settings;
