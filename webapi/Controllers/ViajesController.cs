using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.NETCore;
using webapi.DB;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViajesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        string reportName = "comprobante";

        public ViajesController(IWebHostEnvironment env)
        {
            _env = env;
            // Report file path
        }

        [HttpPost]
        public IActionResult Post(NewViaje newViaje)
        {
            // Save to database

            using var db = new ViajesContext();
            var viaje = new Viaje
            {
                Nombres = newViaje.Nombres,
                Apellidos = newViaje.Apellidos,
                Cedula = newViaje.Cedula,
                Concepto = newViaje.Concepto,
                Monto = newViaje.Monto,
                Fecha = newViaje.Fecha
            };

            db.Viajes.Add(viaje);
            db.SaveChanges();


            var reportPath = Path.Combine(this._env.ContentRootPath, "Reports", "comprobante.rdl");

            Stream reportDefinition; // your RDLC from file or resource
            var dataSource = new ReportDataSource();
            dataSource.Name = "dtViajes";
            dataSource.Value = new List<Viaje> { viaje };
            using var fs = new FileStream(reportPath, FileMode.Open);
            reportDefinition = fs;
            LocalReport report = new LocalReport();
            report.LoadReportDefinition(reportDefinition);
            report.DataSources.Add(dataSource);
            report.SetParameters(new[] { new ReportParameter("Id", "2") });
            byte[] pdf = report.Render("PDF");
            fs.Dispose();

            return File(pdf, "application/pdf", reportName + ".pdf");
        }
    }
}
