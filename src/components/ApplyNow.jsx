function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const divStyle = {
    width:"100%",
    height:"100vh"
}

export default function ApplyNow() {
    loadScript("//embed.typeform.com/next/embed.js")
    return (
        <div data-tf-widget="yZzqc7Av" data-tf-iframe-props="title=Bigbuddy T and P" data-tf-medium="snippet" style={divStyle}></div>
    )
}
