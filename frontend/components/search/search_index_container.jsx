import { connect } from "react-redux";
import { withRouter } from "react-router";
import { requestListings } from "../../actions/listing_actions";
import SearchIndexComponent from "../search/search_index_component"

const mSTP = (state, ownProps) => {
  console.log("CONTAINER STATE:", state)

  return {
    listings: Object.values(state.entities.listings)
}}

const mDTP = (dispatch) => ({
  requestListings: (city) => dispatch(requestListings(city))
})

export default withRouter(connect(mSTP, mDTP)(SearchIndexComponent))