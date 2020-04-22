using Akka.Actor;
using Akka.Routing;
using Calculator.AkkaDemo.Actors;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Calculator.AkkaDemo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddControllers();

            services.AddSingleton(ctx =>
            {
                return ActorSystem.Create("ActorSystem");
            });

            services.AddSingleton(ctx =>
            {
                ActorSystem actorSystem = ctx.GetRequiredService<ActorSystem>();

                Props actorRouter = Props.Create<CalculatorActor>().WithRouter(new RoundRobinPool(10));

                IActorRef actorPool = actorSystem.ActorOf(actorRouter, "Calculator");

                return actorPool;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.WithOrigins("http://localhost:3000"));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}