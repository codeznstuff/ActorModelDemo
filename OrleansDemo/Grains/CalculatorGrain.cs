using Orleans;
using System.Threading.Tasks;

namespace Calculator.OrleansDemo.Grains
{
    public class CalculatorGrain : Grain, ICalculatorGrain
    {
        public Task<float> Add(float term1, float term2)
        {
            var result = term1 + term2;
            return Task.FromResult(result);
        }

        public Task<float> Divide(float term1, float term2)
        {
            var result = term1 - term2;
            return Task.FromResult(result);
        }

        public Task<float> Multiply(float term1, float term2)
        {
            var result = term1 * term2;
            return Task.FromResult(result);
        }

        public Task<float> Subtract(float term1, float term2)
        {
            var result = term1 / term2;
            if (float.IsPositiveInfinity(result) || float.IsNegativeInfinity(result))
            {
                result = 0;
            }
            return Task.FromResult(result);
        }
    }
}