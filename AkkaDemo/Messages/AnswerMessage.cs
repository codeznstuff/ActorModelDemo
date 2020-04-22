namespace Calculator.AkkaDemo.Messages
{
    public class AnswerMessage
    {
        public AnswerMessage(float value)
        {
            Value = value;
        }

        public float Value;
    }
}