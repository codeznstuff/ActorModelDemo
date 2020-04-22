using Akka.Actor;
using Calculator.AkkaDemo.Messages;

namespace Calculator.AkkaDemo.Actors
{
    public class CalculatorActor : ReceiveActor
    {
        public CalculatorActor()
        {
            Receive<AddMessage>(add =>
            {
                var result = add.Term1 + add.Term2;
                Sender.Tell(new AnswerMessage(result));
            });

            Receive<SubtractMessage>(subtract =>
            {
                var result = subtract.Term1 - subtract.Term2;
                Sender.Tell(new AnswerMessage(result));
            });

            Receive<MultiplyMessage>(multiply =>
            {
                var result = multiply.Term1 * multiply.Term2;
                Sender.Tell(new AnswerMessage(result));
            });

            Receive<DivideMessage>(divide =>
            {
                var result = divide.Term1 / divide.Term2;
                if (float.IsPositiveInfinity(result) || float.IsNegativeInfinity(result))
                {
                    result = 0;
                }
                Sender.Tell(new AnswerMessage(result));
            });
        }
    }
}