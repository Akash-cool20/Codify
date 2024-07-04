import React from 'react';
import { useSelector } from 'react-redux';

function RenderCode() {
    // Fetches the fullCode object from the Redux store using useSelector
    const fullCode = useSelector((state) => state.compilerSlice.fullCode);

    // Combines HTML, CSS, and JavaScript code into a single string
    const combineCode = `
        <!doctype html>
        <html>
            <style>
                ${fullCode.css}
            </style>
            <body>
                ${fullCode.html}
            </body>
            <script>
                ${fullCode.javascript}
            </script>
        </html>
    `;

    // Encodes the combined code into a data URL for the iframe src attribute
    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(combineCode)}`;

    return (
        <div className='bg-gray-300 h-[calc(100vh-60px)]'>
            {/* Renders an iframe to display the combined code */}
            <iframe className='w-full h-full' src={iframeCode}></iframe>
        </div>
    );
}

export default RenderCode;
