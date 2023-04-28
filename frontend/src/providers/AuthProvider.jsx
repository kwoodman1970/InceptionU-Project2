import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = function(props)
{
  const { children } = props;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = async function(username, password)
  {
    const userResponse = await fetch("/api/user/login",
      {
        method:  "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password }),
      });

    if (userResponse.ok)
    {
      setUser(await userResponse.json());

      return true;
    }
    else
    {
      setUser(null);

      return false;
    }
  };

  const logout = async function()
  {
    const logoutResponse = await fetch("/api/user/logout", {method: "POST"});

    if (logoutResponse.ok)
      setUser(null);
  };

  useEffect(function()
    {
      const getUser = async function()
      {
        try
        {
          const userResponse = await fetch("/login");

          console.log(`Fetch succeeded -- response is ${JSON.stringify(userResponse)}`);

          setUser(userResponse.ok ? await userResponse.json() : null);
          console.log("Or did it?");
          setLoading(false);
        }
        catch (error)
        {
          console.log(`Fetch failed -- error is ${JSON.stringify(error)}`);
        }
      };

      getUser();
    }, []);

  const contextValue =
    {
      logout,
      login,
      user,
      loading,
    };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
