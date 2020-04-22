using Akka.Actor;
using Calculator.AkkaDemo.Messages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Calculator.AkkaDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly IActorRef _actorPool;

        public ILogger<CalculatorController> Logger { get; }

        public CalculatorController(ILogger<CalculatorController> logger, IActorRef actorPool)
        {
            Logger = logger;
            _actorPool = actorPool;
        }

        [HttpGet("add")]
        public async Task<ActionResult<AnswerMessage>> Add(float x, float y)
        {
            var result = await _actorPool.Ask<AnswerMessage>(new AddMessage(x, y)).ConfigureAwait(false);
            return result switch
            {
                AnswerMessage response => Ok(response.Value),
                _ => NotFound(),
            };
        }

        [HttpGet("subtract")]
        public async Task<ActionResult<AnswerMessage>> Subtract(float x, float y)
        {
            var result = await _actorPool.Ask<AnswerMessage>(new SubtractMessage(x, y)).ConfigureAwait(false);
            return result switch
            {
                AnswerMessage response => Ok(response.Value),
                _ => NotFound(),
            };
        }

        [HttpGet("multiply")]
        public async Task<ActionResult<AnswerMessage>> Multiply(float x, float y)
        {
            var result = await _actorPool.Ask<AnswerMessage>(new MultiplyMessage(x, y)).ConfigureAwait(false);
            return result switch
            {
                AnswerMessage response => Ok(response.Value),
                _ => NotFound(),
            };
        }

        [HttpGet("divide")]
        public async Task<ActionResult<AnswerMessage>> Divide(float x, float y)
        {
            var result = await _actorPool.Ask<AnswerMessage>(new DivideMessage(x, y)).ConfigureAwait(false);
            return result switch
            {
                AnswerMessage response => Ok(response.Value),
                _ => NotFound(),
            };
        }
    }
}