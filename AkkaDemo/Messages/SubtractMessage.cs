namespace Calculator.AkkaDemo.Messages
{
    public class SubtractMessage
    {
        public SubtractMessage(float term1, float term2)
        {
            Term1 = term1;
            Term2 = term2;
        }

        public float Term1;

        public float Term2;
    }
}