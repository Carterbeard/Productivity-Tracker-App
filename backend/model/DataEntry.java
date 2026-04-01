import java.time.LocalDateTime;

public class DataEntry{
    private LocalDateTime time;

    DataEntry(LocalDateTime time){
        this.time = time;
    }

    public LocalDateTime getTime(){
        return time;
    }

    public void setTime(LocalDateTime time){
        this.time = time;
    }
}