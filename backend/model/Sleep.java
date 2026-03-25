import java.time.LocalDateTime;

public class Sleep extends DataEntry{
    
    private float duration;
    Sleep(LocalDateTime time, float duration){
        super(time);
        this.duration  = duration;
        
    }

    public float getDuration(){
        return duration;
    }

    public void setDuration(float duration){
        if(duration<0){
            throw new IllegalArgumentException("Duration cant be negative");
        } else{
            this.duration = duration;
        }
    
    }
}
