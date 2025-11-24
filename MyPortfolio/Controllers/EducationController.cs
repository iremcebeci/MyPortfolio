using Microsoft.AspNetCore.Mvc;

namespace MyPortfolio.Controllers
{
    public class EducationController : Controller
    {
        public IActionResult EducationList()
        {
            return View();
        }
    }
}
