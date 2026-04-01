import java.time.LocalDateTime;

public class Goals {
    private DataType dataType;
    private float targetValue;
    private Priority priority;
    private LocalDateTime deadline;
    private int streak;
    private Boolean completed ;

    Goals( float targetValue, Priority priority, LocalDateTime deadline ,  DataType dataType){
        this.streak = 0;
        this.dataType = dataType;
        this.priority = priority;
        this.completed = false;
        this.deadline = deadline;
        this.targetValue = targetValue;
    }
    
    public int getStreak(){ return streak; }
    public LocalDateTime getDeadline(){ return deadline; }
    public float getTargetValue(){ return targetValue; }
    public Priority getPriority(){ return priority; }
    public DataType getDataType(){ return dataType; }
    public boolean getCompleted(){ return completed; }

    public void setStreak(int streak){
    if(streak < 0) throw new IllegalArgumentException("Streak can't be negative");
    this.streak = streak;
}

public void setDeadline(LocalDateTime deadline){
    if(deadline == null) throw new IllegalArgumentException("Deadline can't be null");
    this.deadline = deadline;
}

public void setTargetValue(float targetValue){
    if(targetValue < 0) throw new IllegalArgumentException("Target value can't be negative");
    this.targetValue = targetValue;
}

public void setPriority(Priority priority){
    if(priority == null) throw new IllegalArgumentException("Priority can't be null");
    this.priority = priority;
}

public void setDataType(DataType dataType){
    if(dataType == null) throw new IllegalArgumentException("Datatype can't be null");
    this.dataType = dataType;
}

public void setCompleted(boolean completed){
    this.completed = completed;
}
}
