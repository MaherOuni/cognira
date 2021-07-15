import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';

function App() {

  const [js, setJs] = useState('')
  const [regex, setRegex] = useState('')
  const [replace, setReplace] = useState('')
  const [instance, setInstance] = useState('')

  function Exists(){
    instance.markText({line:0,ch:0},{line:instance.lastLine(),ch:instance.getLine(instance.lastLine()).length}, {
      css:"background-color:transparent",
  });
  let re = new RegExp(regex, "g");
  const cursor = instance.getSearchCursor(re,{line:0,ch:0})
  while (cursor.findNext()) {
    instance.markText(cursor.from(), cursor.to(), {
        css:"background-color: rgba(82, 98, 172, 0.644)",
    });
}
  }

  function Replace(){
    let findRe = new RegExp(regex, "g");
    let code = instance.getValue()
    instance.setValue(code.replace(findRe,replace))
  }

  function imports(){
    let imports = []
    let findRe = new RegExp(regex, "g");
    let replaceRe = new RegExp(replace, "g");
    let code = instance.getValue()
    let matches = code.matchAll(findRe)
    let matchAll = Array.from(matches);
    matchAll.forEach((m)=> {
        imports.push(m[2])
    })
    console.log(imports)
    instance.setValue(code.replace(replaceRe,()=> {
      return `import React , { ${Object.keys(imports).map((i)=>(
        imports[i]
      ))} } from 'react'`  
    }))



    // const cursor = instance.getSearchCursor(findRe,{line:0,ch:0})
    //let matches = findRe.exec(code)
    // while (matches) {
      //  let match = matches[0]
       // console.log(code.replace(findRe,replace))
        
       // console.log(match.replace(findRe,replace))
    //   console.log(str)
    //   cursor.findNext()
    //   cursor.replace(str)
    //  matches = findRe.exec(code)
    // }
  }
  return (
    <React.Fragment>
      <div>
      <Editor 
          language="javascript"
          displayName="Find Regex"
          value={regex}
          onChange={setRegex}
          instance={instance}
          onSetInstance={setInstance}
          height={100}
          width={'auto'}
           >

        </Editor>
        <Editor 
          language="javascript"
          displayName="Replace Regex"
          value={replace}
          onChange={setReplace}
          instance={instance}
          onSetInstance={setInstance}
          height={100}
          width={'auto'}
           >

        </Editor>
        <Editor 
          language="javascript"
          displayName="Code"
          value={js}
          onChange={setJs}
          instance={instance}
          onSetInstance={setInstance}
          height={500}
          width={'auto'}
         
           >

        </Editor>

        <button onClick={Exists}>Find</button>
        <button onClick={Replace}>Replace</button>
        <button onClick={imports}>Imports</button>
       
      </div>

    </React.Fragment>
  );
}

export default App;
