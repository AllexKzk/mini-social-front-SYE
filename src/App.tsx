import React, { useEffect, useState } from 'react';

function App() {
  const [messageFromServer, setMessage] = useState<String>('');

  useEffect(() => {
    fetch("https://rich-teal-leopard-gown.cyclic.app/api/")
      .then(data => data.json())
      .then(json => {
        console.log(json.message.message)
        setMessage(json.message.message)
      })
  }, []);

  return (
    <div>
      It's test message!
      {messageFromServer.length ? <p>{messageFromServer}</p> : <></>}
    </div>
  );
}

export default App;
