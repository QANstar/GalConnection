namespace GalConnection.Server.Utils
{
    public class TimeUtils
    {
        public static long GetNowTime()
        {
            return (DateTime.Now.Ticks - new DateTime(1970, 1, 1, 0, 0, 0, 0).Ticks) / 10000;
        }
    }
}
