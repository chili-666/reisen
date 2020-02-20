import React from "react"
import Strapi from "strapi-sdk-javascript/build/main"
import Standard from "./layouts/Standard"

    const apiUrl= 'http://home.luis-backt-und-kocht.de:1337';
    //const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
    const strapi = new Strapi(apiUrl)



class Offers extends React.Component {
    constructor() {
        super()
        this.state = {
            block: [],
            loading: true
        }
    }

     async componentDidMount() {
    try{
        const response = await strapi.request('POST', '/graphql', {
          data: {
            query:  `query {page (id: 1) {
                                    id
                                    pageName
                                    Block {
                                    Content
                                    contentTitle
                                    subtitle
                                    contentImages {
                                        url
                                    }
                                    }
                                }
                }`
        }
    });
    console.log("Antwort", response.data.page.Block)
    this.setState({ 
          block: response.data.page.Block,
          //images: response.data.page.Block.contentImages.url
          loading:false
          })
          console.log("offer", this.state)
    } catch(err) {
      console.error(err) };
    }
 render()
    {
    var pageContent = this.state.loading ? "TEST" : this.state.block.map((item, index) =>(
        <h1 key={index}>{item.id} :: {item.contentTitle}</h1>
       // console.log("Map", item.contentTitle)
    ));
    
    return <div>{pageContent}</div>
 }
}

export default Offers