using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool? RememberMe { get; set;}
    }

    public class ExternalAuthDto
    {
        public string Provider { get; set; }
        public string IdToken { get; set; }
    }
}
