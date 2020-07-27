import React from "react";
import Strapi from "strapi-sdk-javascript/build/main"


const apiUrl= 'https://strapi.luis-backt-und-kocht.de';
//const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`
const strapi = new Strapi(apiUrl);

class Hero extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  console.log("HeroProps", this.props.pics.length)
  let myCount = 0
  let bgImage = 'https://picsum.photos/1280/960'
  for (let i = 0; i < this.props.pics.length; i++) {
  if (myCount > this.props.pics.length) {myIndex = 0}
  bgImage = `"url('${apiUrl}${this.props.pics[i].url}')`
  document.getElementById("hero-pic").style.backgroundImage = `"url('${apiUrl}${this.props.pics[i].url}')`
  console.log("NewHEro", document.getElementById("hero-pic").style.backgroundImage = `"url('${apiUrl}${this.props.pics[i].url}')` )
 // if (i === this.props.pic.length) {i = 0}
 setTimeout(10000)  
}
  
}
render() {
 
  return (
    <div className="home hero is-large is-bold">
      <div className="hero-body" id="hero-pic" style={{backgroundImage:"url('https://picsum.photos/1280/960')"}}>
        <div className="container">
          <h1 className="title textshadow has-text-white is-size-1">HERO</h1>
          <h2 className="subtitle has-text-white"> Hero SubTitle</h2>
        </div>
      </div>
    </div>
  );
}
}

export default Hero;
//style={{backgroundImage: uri('https://picsum.photos/1280/960'}}>
