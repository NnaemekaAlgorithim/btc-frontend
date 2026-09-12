const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("btc_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Token ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw data;
  return data as T;
}

export const api = {
  register: (body: {
    email: string;
    phone_number: string;
    password: string;
    agreed_to_terms: boolean;
    referral_code?: string;
  }) => request<{ token: string; user: User }>("/api/users/register/", { method: "POST", body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: User }>("/api/users/login/", { method: "POST", body: JSON.stringify(body) }),

  profile: () => request<User>("/api/users/profile/"),

  leaderboard: () => request<LeaderboardEntry[]>("/api/users/leaderboard/"),

  tasks: () => request<Task[]>("/api/tasks/"),

  completeTask: (taskId: string) =>
    request<{ detail: string; btc_earned: string; new_balance: string }>(`/api/tasks/${taskId}/complete/`, { method: "POST" }),

  myCompletions: () => request<Completion[]>("/api/tasks/my-completions/"),
};

export interface User {
  id: string;
  email: string;
  phone_number: string;
  btc_balance: string;
  referral_code: string;
  referral_url: string;
  date_joined: string;
}

export interface LeaderboardEntry {
  email: string;
  btc_balance: string;
  referral_code: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  task_type: "watch_video" | "click_link";
  url: string;
  btc_reward: string;
  is_active: boolean;
  completion_count: number;
  already_completed: boolean;
}

export interface Completion {
  id: string;
  task_title: string;
  task_type: string;
  btc_earned: string;
  completed_at: string;
}
