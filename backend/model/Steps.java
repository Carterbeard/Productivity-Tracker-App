import java.time.LocalDateTime;

public class Steps extends DataEntry {
    private float calories;
    private float distance;
    private int steps;

    Steps(float calories, float distance, int steps, LocalDateTime time){
        super(time);
        this.calories = calories;
        this.steps = steps;
        this.distance = distance;
    }

    public float getCalories(){ return calories; }
    public float getDistance(){ return distance; }
    public int getSteps(){ return steps; }

    public void setCalories(float calories){
        if(calories < 0) throw new IllegalArgumentException("Calories can't be negative");
        this.calories = calories;
    }

    public void setDistance(float distance){
        if(distance < 0) throw new IllegalArgumentException("Distance can't be negative");
        this.distance = distance;
    }

    public void setSteps(int steps){
        if(steps < 0) throw new IllegalArgumentException("Steps can't be negative");
        this.steps = steps;
    }
}