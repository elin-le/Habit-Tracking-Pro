export type RiskLevel = "SAFE" | "WARNING" | "AT_RISK";

export type HabitStat = {
  id: string;
  name: string;
  category: string;        // chỉ là dữ liệu hiển thị, không cần dịch
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number;  // %
  riskLevel: RiskLevel;
  last7Days: number[];     // 7 số, % mỗi ngày (0–100)
};

export const mockStats: HabitStat[] = [
{ 
    id: "h1", 
    name: "Drink Water",     
    category: "Health",      
    currentStreak: 12, 
    longestStreak: 21, 
    totalCompletions: 84, 
    completionRate: 86, 
    riskLevel: "SAFE",    
    last7Days: [100, 100, 80, 100, 100, 60, 100] 
    },
    { 
    id: "h2", 
    name: "Morning Workout", 
    category: "Health",      
    currentStreak: 4,  
    longestStreak: 15, 
    totalCompletions: 52, 
    completionRate: 64, 
    riskLevel: "WARNING", 
    last7Days: [100, 0, 100, 100, 0, 100, 50] 
    },
    { 
    id: "h3", 
    name: "Read Book",       
    category: "Study",       
    currentStreak: 0,  
    longestStreak: 9,  
    totalCompletions: 30, 
    completionRate: 38, 
    riskLevel: "AT_RISK", 
    last7Days: [50, 0, 0, 100, 0, 0, 50] 
    },
    { 
    id: "h4", 
    name: "Meditate",        
    category: "Mindfulness", 
    currentStreak: 7,  
    longestStreak: 7,  
    totalCompletions: 41, 
    completionRate: 92, 
    riskLevel: "SAFE",    
    last7Days: [100, 100, 100, 100, 100, 80, 100] 
    },
];