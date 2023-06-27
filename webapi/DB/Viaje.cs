using System;
using System.Collections.Generic;

namespace webapi.DB;

public partial class Viaje
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Cedula { get; set; } = null!;

    public string Concepto { get; set; } = null!;

    public double Monto { get; set; }

    public DateTime Fecha { get; set; }
}
