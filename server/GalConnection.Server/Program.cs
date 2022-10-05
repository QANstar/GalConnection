using GalConnection.Entity;
using GalConnection.Server.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton(new AppSettings(builder.Configuration));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    //Bearer 的scheme定义
    var securityScheme = new OpenApiSecurityScheme()
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        //参数添加在头部
        In = ParameterLocation.Header,
        //使用Authorize头部
        Type = SecuritySchemeType.Http,
        //内容为以 bearer开头
        Scheme = "bearer",
        BearerFormat = "JWT"
    };

    //把所有方法配置为增加bearer头部信息
    var securityRequirement = new OpenApiSecurityRequirement
                {
                    {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "bearerAuth"
                                }
                            },
                            new string[] {}
                    }
                };

    //注册到swagger中
    c.AddSecurityDefinition("bearerAuth", securityScheme);
    c.AddSecurityRequirement(securityRequirement);
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("any", builder =>
    {
        builder.WithMethods("GET", "POST", "HEAD", "PUT", "DELETE", "OPTIONS")
                //.AllowCredentials()//指定处理cookie
                .AllowAnyOrigin().AllowAnyHeader(); //允许任何来源的主机访问
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,//是否验证Issuer
        ValidateAudience = true,//是否验证Audience
        ValidateLifetime = true,//是否验证失效时间
        ClockSkew = TimeSpan.FromSeconds(60 * 60 * 24 * 7),
        ValidateIssuerSigningKey = true,//是否验证SecurityKey
        ValidAudience = "QANstar",//Audience
        ValidIssuer = "QANstar",//Issuer，这两项和前面签发jwt的设置一致
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("QANstarAndSuoMi1931"))//拿到SecurityKey
    };
});
builder.Services.AddDbContext<GalConnectionContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("any");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

// 处理异常
app.Use(async (context, next) =>
{
    try
    {
        await next.Invoke();
    }
    catch(Exception ex)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync(ex.Message);
    }
});


app.MapControllers();

app.Run();
