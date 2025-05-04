import { supabase } from '../../features/supabase';

export interface Task {
  id: string;
  name: string;
  start: string; // ISO 날짜 문자열 (예: '2025-05-01')
  end: string;   // ISO 날짜 문자열 (예: '2025-05-07')
  progress: number;
  custom_class: string;
  dependencies?: string | string[];
}
/***
 * 
const tasks = [
  {
    id: "Task 1",
    name: "기획 회의",
    start: "2025-05-01",
    end: "2025-05-04",
    progress: 100,
    custom_class: "bar-green",
  },
  {
    id: "Task 2",
    name: "요구사항 분석",
    start: "2025-05-03",
    end: "2025-05-08",
    progress: 80,
    custom_class: "bar-blue",
  },
  {
    id: "Task 3",
    name: "디자인 시안",
    start: "2025-05-06",
    end: "2025-05-10",
    progress: 60,
    custom_class: "bar-orange",
  },
  {
    id: "Task 4",
    name: "디자인 확정",
    start: "2025-05-09",
    end: "2025-05-13",
    progress: 40,
    custom_class: "bar-green",
  },
  {
    id: "Task 5",
    name: "프론트엔드 설계",
    start: "2025-05-11",
    end: "2025-05-15",
    progress: 30,
    custom_class: "bar-blue",
  },
  {
    id: "Task 6",
    name: "백엔드 설계",
    start: "2025-05-13",
    end: "2025-05-18",
    progress: 20,
    custom_class: "bar-orange",
  },
  {
    id: "Task 7",
    name: "DB 설계",
    start: "2025-05-16",
    end: "2025-05-20",
    progress: 10,
    custom_class: "bar-green",
  },
  {
    id: "Task 8",
    name: "API 명세",
    start: "2025-05-18",
    end: "2025-05-22",
    progress: 0,
    custom_class: "bar-blue",
  },
  {
    id: "Task 9",
    name: "프론트엔드 개발 1",
    start: "2025-05-20",
    end: "2025-05-25",
    progress: 0,
    custom_class: "bar-orange",
  },
  {
    id: "Task 10",
    name: "백엔드 개발 1",
    start: "2025-05-22",
    end: "2025-05-27",
    progress: 0,
    custom_class: "bar-green",
  },
  {
    id: "Task 11",
    name: "프론트엔드 개발 2",
    start: "2025-05-25",
    end: "2025-05-30",
    progress: 0,
    custom_class: "bar-blue",
  },
  {
    id: "Task 12",
    name: "백엔드 개발 2",
    start: "2025-05-28",
    end: "2025-06-02",
    progress: 0,
    custom_class: "bar-orange",
  },
  {
    id: "Task 13",
    name: "통합 테스트 준비",
    start: "2025-06-01",
    end: "2025-06-05",
    progress: 0,
    custom_class: "bar-green",
  },
  {
    id: "Task 14",
    name: "통합 테스트",
    start: "2025-06-04",
    end: "2025-06-09",
    progress: 0,
    custom_class: "bar-blue",
  },
  {
    id: "Task 15",
    name: "버그 수정",
    start: "2025-06-07",
    end: "2025-06-12",
    progress: 0,
    custom_class: "bar-orange",
  },
  {
    id: "Task 16",
    name: "최종 점검",
    start: "2025-06-10",
    end: "2025-06-14",
    progress: 0,
    custom_class: "bar-green",
  },
  {
    id: "Task 17",
    name: "배포 준비",
    start: "2025-06-13",
    end: "2025-06-16",
    progress: 0,
    custom_class: "bar-blue",
  },
  {
    id: "Task 18",
    name: "배포",
    start: "2025-06-15",
    end: "2025-06-17",
    progress: 0,
    custom_class: "bar-orange",
  },
  {
    id: "Task 19",
    name: "배포 후 점검",
    start: "2025-06-17",
    end: "2025-06-20",
    progress: 0,
    custom_class: "bar-green",
  },
  {
    id: "Task 20",
    name: "프로젝트 마무리",
    start: "2025-06-20",
    end: "2025-06-25",
    progress: 0,
    custom_class: "bar-blue",
  },
];


    insertTasks(tasks)
      .then((data) => console.log(data))
      .catch((err) => console.error("tasks 불러오기 에러:", err));
 */

function toDateString(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

export async function insertTasks(tasks: Task[]): Promise<void> {
  const tasksForInsert = tasks.map(task => ({
    ...task,
    start: toDateString(task.start),
    end: toDateString(task.end),
  }));
  const { data, error } = await supabase
    .from('gantt_tasks')
    .insert(tasksForInsert);
  
  if (error) {
    console.error('에러:', error.message);
    throw error;
  } else {
    console.log('저장 성공:', data);
  }
}

// tasks 전체를 가져오는 함수
export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('gantt_tasks')
    .select('*');

  if (error) {
    console.error('가져오기 에러:', error.message);
    throw error;
  }
  // data가 null일 수 있으니 빈 배열 처리
  return data ?? [];
}

// 단일 task를 id 기준으로 업데이트하는 함수
export async function updateTask(task: Task): Promise<void> {
  const { error } = await supabase
    .from('gantt_tasks')
    .update({
      name: task.name,
      start: toDateString(task.start),
      end: toDateString(task.end),
      progress: task.progress,
      custom_class: task.custom_class,
    })
    .eq('id', task.id);

  if (error) {
    console.error('업데이트 에러:', error.message);
    throw error;
  }
}
  