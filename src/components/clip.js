import React, { useState } from 'react'

export default function Clip() {
    const [success,setCopySuccess] = useState()
    const [textArea,setTextArea] = useState();
    const [text,setText] = useState();

    const copyToClipboard =(e) => {
        textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setCopySuccess('Copied!' );
      };
     return (
      <div>
        {
         /* Logical shortcut for only displaying the 
            button if the copy command exists */
         document.queryCommandSupported('copy') &&
          <div>
            <button onClick={copyToClipboard}>Copy</button> 
            {success}
          </div>
        }
        <form>
          <textarea
            ref={(textarea) => setTextArea(textarea)}
            value={text}
            onChange={(e)=>{setText(e.target.value)}}

          />
        </form>
      </div>
    );

    ;
}
