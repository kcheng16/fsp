import React from "react";

class ListingEditComponent extends React.Component{
  constructor(props){
    super(props)
    const localState = {localState: {pageIndex: 0}}
    const newState = Object.assign({}, this.props.listing, localState)
    this.state = newState

    this.style1 = { display: "block", backgroundImage: `url(https://res.cloudinary.com/de8carnhu/image/upload/c_scale,h_2232/v1638254345/linda-segerfeldt-oEcsvUfCr1c-unsplash_l8e34q.jpg)`}
    this.style2 = { display: "block", backgroundImage: `url(https://res.cloudinary.com/de8carnhu/image/upload/v1638257975/alvan-nee-T-0EW-SEbsE-unsplash_jlyvgo.jpg)`}
    this.style3 = { display: "block", backgroundImage: `url(https://res.cloudinary.com/de8carnhu/image/upload/v1638259085/chris-osmond-v3vQRPbiwL8-unsplash_kp9gzl.jpg)`}
    this.style4 = { display: "block", backgroundImage: `url(https://res.cloudinary.com/de8carnhu/image/upload/v1638258964/hannah-lim-U6nlG0Y5sfs-unsplash_rdz9wu.jpg)`}
    this.style5 = { display: "block", backgroundImage: `url(http://res.cloudinary.com/de8carnhu/image/upload/v1638322488/sarandy-westfall-fLKRaBoa4-E-unsplash_jw2zee.jpg)`}
    this.style6 = { display: "block", backgroundImage: `url(https://res.cloudinary.com/de8carnhu/image/upload/v1638258925/avi-naim-JfpjgnVhpmM-unsplash_g4eovt.jpg)`}
    
    this.num1 = Math.floor(Math.random() * 30) + 1
    this.num2 = Math.floor(Math.random() * 100) + 30
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

  componentDidMount(){
    this.props.requestListing(this.props.match.params.id)
  }

  componentDidUpdate(){
    if (!this.state) this.setState(this.props.listing)
  }

  handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();
          formData.append("listing[host_id]", this.state.host_id);
          formData.append("listing[title]", this.state.title);
          formData.append("listing[description]", this.state.description);
          formData.append("listing[street_address]", this.state.street_address);
          formData.append("listing[city]", this.state.city);
          formData.append("listing[country]", this.state.country);
          formData.append("listing[price]", this.state.price);
          formData.append("listing[num_of_beds]", this.state.num_of_beds);
          formData.append("listing[longitude]", this.state.longitude);
          formData.append("listing[latitude]", this.state.latitude);
          formData.append("listing[postal_code]", this.state.postal_code);
          formData.append("id", this.state.id);
          
          console.log(this.state)
          console.log(this.state.photoFile)
    if (this.state.photoFile && this.state.photoFile.length > 0 && this.state.photoFile.length < 5) {
      for (let i = 0; i < this.state.photoFile.length; i++) {
        formData.append("listing[photos][]", this.state.photoFile[i]);
      }
    }
    // this.props.updateListing(formData)
    this.props.updateListing(formData).then(
      (res) => {this.props.history.push(`/listings/${res.listing.id}`)})
  }

  handleFile(e){
    this.setState({photoFile: e.currentTarget.files})
  }

  update(field){
    return e => this.setState({[field]: e.currentTarget.value})
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  
  addPageIndex(){
    if (this.state.localState.pageIndex < 5) {
      this.setState({
        ...this.state,
        localState: {
          ...this.state.localState,
          pageIndex: (this.state.localState.pageIndex + 1)
      }});
    }
  }

  subPageIndex(){
    if (this.state.localState.pageIndex > 0) {
      this.setState({
        ...this.state,
        localState: {
          ...this.state.localState,
          pageIndex: (this.state.localState.pageIndex - 1)
      }});
    }
  }

  addDogs(){
    if (this.state.num_of_beds < 10) {
      this.setState({num_of_beds: this.state.num_of_beds + 1})
  }}

  subDogs(){
    if (this.state.num_of_beds > 0) {
      this.setState({num_of_beds: this.state.num_of_beds - 1})
  }}

  addPrice(){
    this.setState({price: this.state.price + 1})
  }

  subPrice(){
    if (this.state.price > 0) {
      this.setState({price: this.state.price - 1})
    }
  }

  render(){
    if(!this.state) return "loading";

    return(
      <div className="listings-create">
        <div className="sidebar">
          <div className="sidebar-bg">
            <h1 style={this.state.localState.pageIndex === 0 ? this.style1 : { display: "none" }}>Let's give your place a name</h1>
            <h1 style={this.state.localState.pageIndex === 1 ? this.style2 : { display: "none" }}>Now, let's describe your place</h1>
            <h1 style={this.state.localState.pageIndex === 2 ? this.style3 : { display: "none" }}>Where's your place located?</h1>
            <h1 style={this.state.localState.pageIndex === 3 ? this.style4 : { display: "none" }}>How many dogs would you like to welcome?</h1>
            <h1 style={this.state.localState.pageIndex === 4 ? this.style5 : { display: "none" }}>Next, let's add some photos of your place</h1>
            <h1 style={this.state.localState.pageIndex === 5 ? this.style6 : { display: "none" }}>Now for the fun part - set your price</h1>
          </div>
        </div>

        <form 
          onSubmit={(e)=> e.preventDefault()}
          className="listings-new-form">

          {/* TITLE */}
          <div 
            style={this.state.localState.pageIndex === 0 ? { display: "block" } : { display: "none" }}
            className="listing-title"
          >
              <h1>Create your title</h1>
              <textarea onChange={this.update('title')} name='listing-title' type="text" placeholder="Relax your paws with us!" value={this.state.title}/>
          </div>

          {/* DESCRIPTION */}
          <div 
            style={this.state.localState.pageIndex === 1 ? { display: "block" } : { display: "none" }}
            className="listing-title">
              <h1>Create your description</h1>
              <textarea onChange={this.update('description')} name='listing-description' type="text" placeholder="We provide pacious area for zoomies, and natural delicious treats. " value={this.state.description}/>
          </div>

          {/* LOCATION */}
            <div 
              style={this.state.localState.pageIndex === 2 ? { display: "block" } : { display: "none" }}
              className="listing-address-bg"
            >
              <div className="listing-box">
                <h2>Confirm your address</h2>
                <div className="listing-info">
                  <div className="address">
                    <h5>Street</h5>
                    <input onChange={this.update('street_address')} name='listing-street_address' type="text" value={this.state.street_address}/>
                  </div>
                  <div className="city">
                    <h5>City</h5>
                    <input onChange={this.update('city')} name='listing-city' type="text" value={this.state.city}/>
                  </div>
                  <div className="postal-code">
                    <h5>Zip Code</h5>
                    <input onChange={this.update('postal_code')} name='listing-postal_code' type="text" value={this.state.postal_code}/>
                  </div>
                  <div className="country">
                    <h5>Country/Region</h5>
                    <input onChange={this.update('country')} name='listing-country' type="text" value={this.state.country}/>
                  </div>
                </div>
              </div>
            </div>

          {/* GUESTS */}
            <div 
              style={this.state.localState.pageIndex === 3 ? { display: "grid" } : { display: "none" }}
              className="add-guest"
            >
              <h1>Dogs</h1>
              <div className="dog-count">
                <div id="subtract" onClick={() => this.subDogs()}>&#8722;</div>
                <div>{this.state.num_of_beds}</div>
                <div id="add" onClick={() => this.addDogs()}>&#43;</div>
              </div>
            </div>

            {/* PHOTOS */}
            <div 
              style={this.state.localState.pageIndex === 4 ? { display: "flex" } : { display: "none" }}
              className="photos"
            >
              <div className="inner-photo">
                <h1>Add photos here!</h1>
                <input
                  type="file"
                  onChange={e => this.handleFile(e)}
                  multiple
                />
                <div className="imgs">
                  {this.state.photos.map((photo, idx) => 
                    <img 
                      key={idx}
                      src={photo}
                    >
                    </img>
                    )}
                </div>
                {/* <button 
                  className="delete-img"
                  onClick={() => this.setState({photoFile: []})}
                >
                  Delete images
                </button> */}
              </div>
            </div>
            {/* PRICE */}
            <div
              style={this.state.localState.pageIndex === 5 ? { display: "flex" } : { display: "none" }}
              className="price"
            >
              <div className="price-counter">
                <div id="subtract" onClick={() => this.subPrice()}>&#8722;</div>
                <div>{this.state.price}</div>
                <div id="add" onClick={() => this.addPrice()}>&#43;</div>
              </div>
              
              <div className="price-range"> 
                <h5>per night</h5>
                <h3>Places like yours usually range from</h3>
                <h3>{this.num1} to {this.num2} Doge Coins.</h3>
              </div>
            </div>
        
          <div className="buttons-container">
            <div className="buttons">
              <button onClick={() => this.subPageIndex()}>Back</button>
              <div></div>
              <button 
                onClick={(e) => {
                  if (this.state.localState.pageIndex !== 5 ) {
                    this.addPageIndex();
                  } else {
                    this.handleSubmit(e);
                  }
                }}
              >
                {this.state.localState.pageIndex !== 5 ? "Next" : "Submit"}
              </button> 
            </div>
          </div>
        </form>

        <ul className="listing-create-errors"> 
          {Array.isArray(this.props.errors) ? this.props.errors.map((error, idx) => <li key={idx}>{error}</li>) : "" } 
        </ul>

      </div>
    )
  }
}
  
export default ListingEditComponent