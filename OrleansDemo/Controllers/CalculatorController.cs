using Calculator.OrleansDemo.Grains;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Orleans;
using System;
using System.Threading.Tasks;

namespace Calculator.OrleansDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly IClusterClient _clusterClient;

        public ILogger<CalculatorController> Logger { get; }

        public CalculatorController(ILogger<CalculatorController> logger, IClusterClient clusterClient)
        {
            Logger = logger;
            _clusterClient = clusterClient;
        }

        [HttpGet("add")]
        public async Task<ActionResult<float>> Add(float x, float y)
        {
            var calculator = _clusterClient.GetGrain<ICalculatorGrain>(Guid.Empty);
            var result = await calculator.Add(x, y);
            return result;
        }

        [HttpGet("subtract")]
        public async Task<ActionResult<float>> Subtract(float x, float y)
        {
            var calculator = _clusterClient.GetGrain<ICalculatorGrain>(Guid.Empty);
            var result = await calculator.Subtract(x, y);
            return result;
        }

        [HttpGet("multiply")]
        public async Task<ActionResult<float>> Multiply(float x, float y)
        {
            var calculator = _clusterClient.GetGrain<ICalculatorGrain>(Guid.Empty);
            var result = await calculator.Multiply(x, y);
            return result;
        }

        [HttpGet("divide")]
        public async Task<ActionResult<float>> Divide(float x, float y)
        {
            var calculator = _clusterClient.GetGrain<ICalculatorGrain>(Guid.Empty);
            var result = await calculator.Divide(x, y);
            return result;
        }
    }
}