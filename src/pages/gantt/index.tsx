import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import { Paper, FormControl, InputLabel, Select, MenuItem, Box, Typography, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko');
const localizer = momentLocalizer(moment);

interface ProjectTask {
  id: number;
  title: string;
  start: Date;
  end: Date;
  team: string;
  member: string;
  progress: number;
}

const GanttChart: React.FC = () => {
  const [view, setView] = useState<View>(Views.MONTH);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<ProjectTask | null>(null);

  const [tasks] = useState<ProjectTask[]>([
    {
      id: 1,
      title: '프로젝트 기획',
      start: new Date(2025, 4, 1),
      end: new Date(2025, 4, 7),
      team: '기획팀',
      member: '김철수',
      progress: 100,
    },
    {
      id: 2,
      title: '기획 검토',
      start: new Date(2025, 4, 5),
      end: new Date(2025, 4, 7),
      team: '기획팀',
      member: '이지은',
      progress: 80,
    },
    {
      id: 3,
      title: 'UI/UX 디자인',
      start: new Date(2025, 4, 8),
      end: new Date(2025, 4, 15),
      team: '디자인팀',
      member: '이영희',
      progress: 80,
    },
    {
      id: 4,
      title: '디자인 리뷰',
      start: new Date(2025, 4, 12),
      end: new Date(2025, 4, 15),
      team: '디자인팀',
      member: '박지민',
      progress: 60,
    },
    {
      id: 5,
      title: '프론트엔드 개발',
      start: new Date(2025, 4, 8),
      end: new Date(2025, 4, 30),
      team: '개발팀',
      member: '박민수',
      progress: 60,
    },
    {
      id: 6,
      title: '백엔드 개발',
      start: new Date(2025, 4, 8),
      end: new Date(2025, 4, 30),
      team: '개발팀',
      member: '최수진',
      progress: 40,
    },
  ]);

  const filteredTasks = tasks.filter(task => {
    if (selectedTeam !== 'all' && task.team !== selectedTeam) return false;
    if (selectedMember !== 'all' && task.member !== selectedMember) return false;
    return true;
  });

  const teams = [...new Set(tasks.map(task => task.team))];
  const members = [...new Set(tasks.map(task => task.member))];

  const teamColors: { [key: string]: string } = {
    '기획팀': '#4CAF50',
    '디자인팀': '#2196F3',
    '개발팀': '#FF9800',
  };

  const memberColors: { [key: string]: string } = {
    '김철수': '#4CAF50',
    '이지은': '#8BC34A',
    '이영희': '#2196F3',
    '박지민': '#03A9F4',
    '박민수': '#FF9800',
    '최수진': '#FF5722',
  };

  const eventStyleGetter = (event: ProjectTask) => {
    const backgroundColor = teamColors[event.team] || '#808080';
    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style
    };
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">프로젝트 진행 상황</h1>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>팀 선택</InputLabel>
            <Select
              value={selectedTeam}
              label="팀 선택"
              onChange={(e: React.ChangeEvent<{ value: string }>) => setSelectedTeam(e.target.value)}
            >
              <MenuItem value="all">전체 팀</MenuItem>
              {teams.map(team => (
                <MenuItem key={team} value={team}>{team}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>담당자 선택</InputLabel>
            <Select
              value={selectedMember}
              label="담당자 선택"
              onChange={(e: React.ChangeEvent<{ value: string }>) => setSelectedMember(e.target.value)}
            >
              <MenuItem value="all">전체 담당자</MenuItem>
              {members.map(member => (
                <MenuItem key={member} value={member}>{member}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Paper sx={{ p: 2 }}>
          <Calendar
            localizer={localizer}
            events={filteredTasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={view}
            onView={setView}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => setSelectedEvent(event as ProjectTask)}
            messages={{
              next: '다음',
              previous: '이전',
              today: '오늘',
              month: '월',
              week: '주',
              day: '일',
              agenda: '일정',
              date: '날짜',
              time: '시간',
              event: '일정',
            }}
          />
        </Paper>

        <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          {selectedEvent && (
            <>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    팀: {selectedEvent.team}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    담당자: {selectedEvent.member}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    진행률: {selectedEvent.progress}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedEvent.progress} 
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedEvent(null)}>닫기</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default GanttChart; 