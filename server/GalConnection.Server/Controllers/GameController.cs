using Microsoft.AspNetCore.Mvc;

namespace GalConnection.Server.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
