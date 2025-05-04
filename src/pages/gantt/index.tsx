import React, { useState } from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Resources,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper, FormControl, InputLabel, Select, MenuItem, Box, Typography, LinearProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko');

interface ProjectTask {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  team: string;
  member: string;
  progress: number;
}

const GanttChart: React.FC = () => {
  const [currentViewName, setCurrentViewName] = useState<string>('Month');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<string>('all');

  const [tasks] = useState<ProjectTask[]>([
    {
      id: 1,
      title: '프로젝트 기획',
      startDate: new Date(2025, 4, 1),
      endDate: new Date(2025, 4, 7),
      team: '기획팀',
      member: '김철수',
      progress: 100,
    },
    {
      id: 2,
      title: '기획 검토',
      startDate: new Date(2025, 4, 5),
      endDate: new Date(2025, 4, 7),
      team: '기획팀',
      member: '이지은',
      progress: 80,
    },
    {
      id: 3,
      title: 'UI/UX 디자인',
      startDate: new Date(2025, 4, 8),
      endDate: new Date(2025, 4, 15),
      team: '디자인팀',
      member: '이영희',
      progress: 80,
    },
    {
      id: 4,
      title: '디자인 리뷰',
      startDate: new Date(2025, 4, 12),
      endDate: new Date(2025, 4, 15),
      team: '디자인팀',
      member: '박지민',
      progress: 60,
    },
    {
      id: 5,
      title: '프론트엔드 개발',
      startDate: new Date(2025, 4, 8),
      endDate: new Date(2025, 4, 30),
      team: '개발팀',
      member: '박민수',
      progress: 60,
    },
    {
      id: 6,
      title: '백엔드 개발',
      startDate: new Date(2025, 4, 8),
      endDate: new Date(2025, 4, 30),
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

  type TeamColor = {
    [key: string]: string;
  };

  type MemberColor = {
    [key: string]: string;
  };

  const teamColors: TeamColor = {
    '기획팀': '#4CAF50',
    '디자인팀': '#2196F3',
    '개발팀': '#FF9800',
  };

  const memberColors: MemberColor = {
    '김철수': '#4CAF50',
    '이지은': '#8BC34A',
    '이영희': '#2196F3',
    '박지민': '#03A9F4',
    '박민수': '#FF9800',
    '최수진': '#FF5722',
  };

  const resources = [
    {
      fieldName: 'team',
      title: '팀',
      instances: teams.map(team => ({
        id: team,
        text: team,
        color: teamColors[team] || '#808080',
      })),
    },
    {
      fieldName: 'member',
      title: '담당자',
      instances: members.map(member => ({
        id: member,
        text: member,
        color: memberColors[member] || '#808080',
      })),
    },
  ];

  const Appointment = ({ children, style = {}, ...restProps }: any) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: style?.backgroundColor ,
        borderRadius: '4px',
        borderLeft: `4px solid ${style.backgroundColor || '#2196F3'}`,
      }}
    >
      {children}
    </Appointments.Appointment>
  );

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
              onChange={(e) => setSelectedTeam(e.target.value)}
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
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <MenuItem value="all">전체 담당자</MenuItem>
              {members.map(member => (
                <MenuItem key={member} value={member}>{member}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Scheduler data={filteredTasks}>
            <ViewState
              currentViewName={currentViewName}
              onCurrentViewNameChange={setCurrentViewName}
              defaultCurrentDate={new Date(2025, 4, 1)}
            />
            <WeekView startDayHour={0} endDayHour={24} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip
              contentComponent={({ appointmentData }) => {
                if (!appointmentData) return null;
                return (
                  <Box sx={{ p: 2, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                      {appointmentData.title}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        팀: {appointmentData.team}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        담당자: {appointmentData.member}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" gutterBottom>
                        진행률: {appointmentData.progress}%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={appointmentData.progress} 
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
                  </Box>
                );
              }}
            />
            <Resources data={resources} />
          </Scheduler>
        </Paper>
      </div>
    </LocalizationProvider>
  );
};

export default GanttChart; 