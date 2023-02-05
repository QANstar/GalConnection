using System.Text.Encodings.Web;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace GalConnection.Server.Utils
{
    public static class JsonUtils
    {
        public static string ToJson(this object obj)
        {
            var json = JsonSerializer.Serialize(obj, new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true,
                ReferenceHandler = ReferenceHandler.IgnoreCycles
            });

            return json;
        }
    }
}
