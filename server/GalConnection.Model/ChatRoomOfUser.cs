using GalConnection.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Model
{
    public class ChatRoomOfUser : ChatRoom
    {
        public ChatRoomOfUser(ChatRoom parent)
        {
            var parentProperties = parent.GetType().GetProperties();
            foreach (var parentProperty in parentProperties)
            {
                var thisProperty = this.GetType().GetProperty(parentProperty.Name, parentProperty.PropertyType);
                var value = parentProperty.GetValue(parent);
                if (thisProperty != null && value != null && thisProperty.CanWrite)
                {
                    thisProperty.SetValue(this, value);
                }
            }
        }
        public int unReadNum { get; set; }
    }
}
