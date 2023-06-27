namespace webapi.DB
{
    public class NewViaje
    {
        public string Nombres { get; set; } = null!;

        public string Apellidos { get; set; } = null!;

        public string Cedula { get; set; } = null!;

        public string Concepto { get; set; } = null!;

        public double Monto { get; set; }

        public DateTime Fecha { get; set; }
    }
}
