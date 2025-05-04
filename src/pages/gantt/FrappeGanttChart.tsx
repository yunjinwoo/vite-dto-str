import { Button } from "@mui/material";
import Gantt from "frappe-gantt";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gantt.css";
import { fetchTasks, Task, updateTask } from "./tasksApi";

const FrappeGanttChart = () => {
  const navigate = useNavigate();

  const ganttRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dependencySelection, setDependencySelection] = useState<string[]>([]);
  const [editTitle, setEditTitle] = useState<string>("");

  useEffect(() => {
    // tasks를 supabase에서 불러오기
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error("tasks 불러오기 에러:", err));
  }, []);

  useEffect(() => {
    if (ganttRef.current && tasks.length > 0) {
      ganttRef.current.innerHTML = ""; // 기존 차트 비우기
      const gantt = new Gantt(ganttRef.current, tasks, {
        view_mode: "Week",
        language: "ko",
        on_click: (task: Task) => {
          console.log("on_click: (task: Task) => {", task);
          setSelectedTask(task);
          setEditTitle(task.name || "");
          setDependencySelection(
            typeof task.dependencies === "string" &&
              task.dependencies.length > 0
              ? task.dependencies.split(",")
              : []
          );
          setModalOpen(true);
        },
        on_date_change: (task: Task, start: string, end: string) => {
          // 날짜 변경 시 업데이트
          updateTask({ ...task, start, end })
            .then(() => console.log("날짜 업데이트 완료!"))
            .catch((err) => console.error("날짜 업데이트 에러:", err));
        },
        on_progress_change: (task: Task, progress: number) => {
          // 진행률 변경 시 업데이트
          updateTask({ ...task, progress })
            .then(() => console.log("진행률 업데이트 완료!"))
            .catch((err) => console.error("진행률 업데이트 에러:", err));
        },
      });
    }
  }, [tasks]);

  // 의존성 체크박스 변경
  const handleDependencyChange = (id: string) => {
    setDependencySelection((prev) =>
      prev.includes(id) ? prev.filter((dep) => dep !== id) : [...prev, id]
    );
  };

  // 저장 버튼 클릭
  const handleSaveDependencies = async () => {
    if (!selectedTask) return;
    const updatedTask = {
      ...selectedTask,
      name: editTitle,
      dependencies: dependencySelection.join(","),
    };
    await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Frappe Gantt 차트</h2>
      <Button onClick={() => navigate("/")}>home</Button>
      <div
        ref={ganttRef}
        style={{
          width: "100%",
          height: "auto",
          margin: "0 auto",
          background: "#fff",
        }}
      />
      <style>
        {`
          .bar-green { fill: #4CAF50; }
          .bar-blue { fill: #2196F3; }
          .bar-orange { fill: #FF9800; }
          .modal-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;
            z-index: 1000;
          }
          .modal {
            background: #fff; padding: 24px; border-radius: 8px; min-width: 320px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.2);
          }
        `}
      </style>
      {/* 모달 */}
      {modalOpen && selectedTask && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>의존성(Task 연결) 및 타이틀 수정: {selectedTask.id}</h3>
            <div style={{ marginBottom: 12 }}>
              <label>
                타이틀:
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ marginLeft: 8, width: 200 }}
                />
              </label>
            </div>
            <div>
              {tasks
                .filter((t) => t.id !== selectedTask.id)
                .sort((a, b) => {
                  const numA = parseInt(a.id.replace(/[^0-9]/g, ""), 10);
                  const numB = parseInt(b.id.replace(/[^0-9]/g, ""), 10);
                  return numA - numB;
                })
                .map((t) => (
                  <label key={t.id} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={dependencySelection.includes(t.id)}
                      onChange={() => handleDependencyChange(t.id)}
                    />
                    {t.id} - {t.name}
                  </label>
                ))}
            </div>
            <button onClick={handleSaveDependencies}>저장</button>
            <button onClick={() => setModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrappeGanttChart;
