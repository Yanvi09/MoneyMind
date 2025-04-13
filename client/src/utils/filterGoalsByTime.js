export const filterGoalsByTime = (goals, range) => {
    const now = new Date();
  
    return goals.filter((goal) => {
      const createdAt = new Date(goal.createdAt);
  
      if (range === "today") {
        return (
          createdAt.toDateString() === now.toDateString()
        );
      }
  
      if (range === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return createdAt >= oneWeekAgo;
      }
  
      if (range === "month") {
        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        );
      }
  
      return true; // default: all
    });
  };
  