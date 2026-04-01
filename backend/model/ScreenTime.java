import java.time.LocalDateTime;

public class ScreenTime extends DataEntry{
    private float duration;
    ScreenTime(float duration, LocalDateTime time){
        super(time);
        this.duration = duration;
    }
    public float getDuration(){
        return duration;
    }

    public void setDuration(float duration){
        if(duration<0){
            throw new IllegalArgumentException("Duration cant be negative");
        }else{
            this.duration = duration;
        }
    }
    
}
