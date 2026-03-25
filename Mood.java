import java.time.LocalDateTime;

public class Mood extends DataEntry{
    private String mood;
    Mood(LocalDateTime time, String mood){
        super(time);
        this.mood = mood;
    }
    public String getMood(){
        return mood;
    }

    public void setMood(String mood){
        if(mood==null || mood.isEmpty()){
            throw new IllegalArgumentException("Mood cant be empty");
        } else{
            this.mood = mood;
        }
    }
    
}
