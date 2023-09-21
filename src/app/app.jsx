function App(props) {
    const {
        title = ",,Ծ‸Ծ,,",
        scripts = [],
        links = [],
        styles = [],
        children
    } = props

    return <html>
        <head>
            <title>{title}</title>
            <meta charSet="UTF-8"/>
            {scripts.map((script, index) => {
                return <script key={index} defer type="text/javascript" src={script}/>
            })}
            {links.map(({ href, rel = "stylesheet" }, index) => {
                return <link key={index} href={href} rel={rel}/>
            })}
            {styles.map((style, index) => {
                return <style key={index} type="text/css">
                    {style}
                </style>
            })}
        </head>
        <body>
            <div className="root" id="root">{children}</div>
        </body>
    </html>
}

export default App