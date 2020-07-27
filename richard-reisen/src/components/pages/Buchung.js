import React from "react"
import Strapi from "strapi-sdk-javascript/build/main"
import ReactMarkdown from "react-markdown"

const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);
//console.log("URL", apiUrl)
//console.log("strapi", strapi+'/graphql')


class Buchung extends React.Component {
    constructor() {
        super()
        this.state = {
            content: []
        }
    }

    async componentDidMount() {
        try{
            var request = new XMLHttpRequest()
            const response = await fetch('https://strapi.luis-backt-und-kocht.de/pages')
             .then ((response) => response.json())
            console.log("response", response)
                this.setState({ 
                  content: response,
                  loading: false,
                })
              
            } catch(err) {
              console.error(err) };
        
            }

    render() {
        console.log("Pages-State", this.state.content) 
    let content
    let contentPic
    let headline
    let subheadline
    this.state.content.map(item => (
        console.log("ITEMMAP", item.Block),
        
        item.Block.map(block =>(
        console.log("BlockMAP", block),
        content = <div className="column is-two-thirds">{block.Content}<ReactMarkdown source={ block.RichText } escapeHtml={ false } /></div>,
        headline = <div className="title">{block.contentTitle}</div>,
        block.contentImages.map(pic => (
            contentPic = <img src={`${apiUrl}${pic.url}`} />,
            console.log("ContentPic", contentPic)
        ))
       ))
    ))  
    return (
    <div className="container" style={{marginTop:"1em"}}>
        <div className="box">
            {headline}
        
        <div className="columns">
            {content}
            <div className="column">{contentPic}</div>
        </div>
        
        </div>
    </div>
    )
    }
}

export default Buchung