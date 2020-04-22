using Orleans;
using System.Threading.Tasks;

namespace Calculator.OrleansDemo.Grains
{
    interface ICalculatorGrain : IGrainWithGuidKey
    {
        Task<float> Add(float term1, float term2);

        Task<float> Subtract(float term1, float term2);

        Task<float> Multiply(float term1, float term2);

        Task<float> Divide(float term1, float term2);
    }
}