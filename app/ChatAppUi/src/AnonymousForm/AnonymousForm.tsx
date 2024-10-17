import React, { useState } from "react";

function AnonymousForm() {
  const [username,setUsername] = useState<string>("");
  return (
    <>
        <div>
            <label>Username: </label>
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
        </div>
      
    </>
  );
}

export {AnonymousForm};
