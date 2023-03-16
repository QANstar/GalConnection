namespace GalConnection.Server.Utils
{
    public class TimeUtils
    {
        public static long GetNowTime()
        {
            return DateTimeOffset.Now.ToUnixTimeMilliseconds();
        }
    }
}
