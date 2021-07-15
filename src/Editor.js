import React, { useState, useEffect }from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-palenight.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'

import { Controlled as ControlledEditor} from 'react-codemirror2'

function Editor(props) {
    const {
        language,
        displayName,
        value,
        onChange,
        instance,
        onSetInstance,
        height,
        width       
    }=props

    function mountingEditor(editor){
       
        onSetInstance(editor)
        settingsize(editor)
    }

    function handleChange(editor, data, value){
        onChange(value)
    }

   function settingsize(e){
            e.setSize(width,height)

   }
    function handleSelection(){
        var a1 = {line: 0, ch: 2 };
        var a2 = {line: 0, ch: 5 };
        var b1 = {line: 0, ch: 8 };
        var b2 = {line: 0, ch: 11 };

        var c = [{ 'anchor': a1, 'head': a2},{ 'anchor': b1, 'head': b2} ];
        instance.setSelections(c);

    }
        

    return (
        <div className="editor-container">
            <div className="editor-title">
                <p> {displayName} </p>
      
            </div>
            <ControlledEditor
                editorDidMount={mountingEditor}
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    theme: 'material-palenight',
                    styleSelectedText:true
                }}

            >
                
            </ControlledEditor>
        </div>
    );
}

export default Editor
