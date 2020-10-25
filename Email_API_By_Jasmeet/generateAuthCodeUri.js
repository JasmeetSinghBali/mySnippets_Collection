require('./creds.env');

//Generate AuthCode URI
exports.generate=()=>{
  var authURI="https://accounts.google.com/o/oauth2/v2/auth?"+
  "client_id="+client_id+
  "&redirect_uri="+redirect_uri+
  "&response_type=code"+
  "&scope="+scope+
  "&access_type=offline"+
  "&login_hint="+user+
  "&prompt=consent"

  return authURI;
}
