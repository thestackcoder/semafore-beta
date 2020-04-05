
function clearCookie() {
    return "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": clearCookie(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Logged out successfully" }),
  }
}