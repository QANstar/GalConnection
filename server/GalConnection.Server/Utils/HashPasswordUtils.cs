using System.Security.Cryptography;
using System.Text;

namespace GalConnection.Server.Utils
{
    public static class HashPasswordUtils
    {
        public static byte[] HashPassword(string password, byte[] salt)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                byte[] passwordAndSaltBytes = new byte[passwordBytes.Length + salt.Length];
                Buffer.BlockCopy(passwordBytes, 0, passwordAndSaltBytes, 0, passwordBytes.Length);
                Buffer.BlockCopy(salt, 0, passwordAndSaltBytes, passwordBytes.Length, salt.Length);
                return sha256.ComputeHash(passwordAndSaltBytes);
            }
        }
    }
}
